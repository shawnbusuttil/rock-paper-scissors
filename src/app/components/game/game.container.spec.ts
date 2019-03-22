import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, async, tick, TestBed, fakeAsync } from '@angular/core/testing';

import { RPSGameService } from 'src/app/services/rps-game.service';
import { GameContainer } from "./game.container";
import { GAME_MESSAGES, TIME_BETWEEN_ROUNDS, RPSOutcomes, GAME_ELEMENTS } from 'src/app/models/game.const';

class MockRPSService {
  scoreLimit = 5;

  comDraw = () => undefined;
  compareHand = () => undefined;
  checkForWin = (score: number) => score === this.scoreLimit;
}

describe("GameContainerSpecs", () => {
  let fixture: ComponentFixture<GameContainer>;
  let component: GameContainer;
  let service: MockRPSService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameContainer],
      providers: [
        {
          provide: RPSGameService,
          useClass: MockRPSService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameContainer);
    service = TestBed.get(RPSGameService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe("given the game container is initialized", () => {
    it("should start with the player score reset", () => {
      expect(component.playerScore).toEqual(0);
    });

    it("should start with the computer score reset", () => {
      expect(component.computerScore).toEqual(0);
    });

    describe("when a round is played", () => {
      describe("and the outcome is in favor of the player", () => {
        beforeEach(() => {
          spyOn(service, "compareHand").and.returnValue(RPSOutcomes.Win);
          component.play(GAME_ELEMENTS[0]);
        });

        it("should update the player's score", () => {
          expect(component.playerScore).toEqual(1);
        });
      });

      describe("and the outcome is in favor of the computer", () => {
        beforeEach(() => {
          spyOn(service, "compareHand").and.returnValue(RPSOutcomes.Lose);
          component.play(GAME_ELEMENTS[0]);
        });

        it("should update the computer's score", () => {
          expect(component.computerScore).toEqual(1);
        });
      });

      describe("and the outcome is a draw", () => {
        beforeEach(() => {
          spyOn(service, "compareHand").and.returnValue(RPSOutcomes.Draw);
          component.play(GAME_ELEMENTS[0]);
        });

        it("should not update the player score", () => {
          expect(component.playerScore).toEqual(0);
        });

        it("should not update the computer score", () => {
          expect(component.computerScore).toEqual(0);
        });
      });

      describe("and nobody wins", () => {
        beforeEach(() => {
          component.playerScore = 3;
          spyOn(service, "compareHand").and.returnValue(RPSOutcomes.Win);
        });

        it("should not mark the game as finished", () => {
          component.play(GAME_ELEMENTS[0]);
          expect(component.isGameFinished).toBeFalsy();
        });

        it("should reset the UI", fakeAsync(() => {
          component.play(GAME_ELEMENTS[0]);
          tick(TIME_BETWEEN_ROUNDS);
          expect(component.isLoading).toBeFalsy();
        }));
      });

      describe("and somebody wins", () => {
        beforeEach(() => {
          component.playerScore = 4;
          spyOn(service, "compareHand").and.returnValue(RPSOutcomes.Win);
        });

        it("should not mark the game as finished", () => {
          component.play(GAME_ELEMENTS[0]);
          expect(component.isGameFinished).toBeTruthy();
        });
      });
    });

    describe("when the game is restarted", () => {
      beforeEach(() => {
        component.opponentChooses = GAME_ELEMENTS[0];
        component.currentMessage = "Some message";

        component.playerScore = 5;
        component.playerScore = 4;

        component.restartGame();
      });

      it("should reset the computer's hand", () => {
        expect(component.opponentChooses).not.toBeDefined();
      });

      it("should reset the game message", () => {
        expect(component.currentMessage).toEqual(GAME_MESSAGES.default);
      });

      it("should reset the player score", () => {
        expect(component.playerScore).toEqual(0);
      });

      it ("should reset the computer's score", () => {
        expect(component.computerScore).toEqual(0);
      });
    });
  });
});
