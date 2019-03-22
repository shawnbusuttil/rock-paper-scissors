import { RPSGameService } from "./rps-game.service";

import { RPSGameElement } from '../models/game-element';
import { GAME_ELEMENTS, RPSOutcomes } from '../models/game.const';

describe("RPSGameServiceSpecs", () => {
  let rpsGameService: RPSGameService;

  beforeEach(() => {
    rpsGameService = new RPSGameService(GAME_ELEMENTS, 5);
  });

  describe("given the computer makes a move", () => {
    it("should return one of the moves in the game elements", () => {
      const move = rpsGameService.comDraw();
      expect(GAME_ELEMENTS.indexOf(move)).toBeLessThan(GAME_ELEMENTS.length);
    });
  });

  describe("given the score is checked for win", () => {
    describe("when score is less than the limit", () => {
      it("should return false", () => {
        const isWin = rpsGameService.checkForWin(4);
        expect(isWin).toBeFalsy();
      });
    });

    describe("when score is more than the limit", () => {
      it("should return true", () => {
        const isWin = rpsGameService.checkForWin(5);
        expect(isWin).toBeTruthy();
      });
    });
  });

  describe("given two hands are compared", () => {
    let playerHand: RPSGameElement;
    let computerHand: RPSGameElement;

    describe("when the player has a better hand", () => {
      beforeEach(() => {
        playerHand = GAME_ELEMENTS[0];
        computerHand = GAME_ELEMENTS[2];
      });

      it("should return a winning outcome", () => {
        const outcome = rpsGameService.compareHand(playerHand, computerHand);
        expect(outcome).toEqual(RPSOutcomes.Win);
      });
    });

    describe("when the computer has a better hand", () => {
      beforeEach(() => {
        playerHand = GAME_ELEMENTS[0];
        computerHand = GAME_ELEMENTS[1];
      });

      it("should return a losing outcome", () => {
        const outcome = rpsGameService.compareHand(playerHand, computerHand);
        expect(outcome).toEqual(RPSOutcomes.Lose);
      });
    });

    describe("when the hands are the same", () => {
      beforeEach(() => {
        playerHand = GAME_ELEMENTS[0];
        computerHand = GAME_ELEMENTS[0];
      });

      it("should return a tied outcome", () => {
        const outcome = rpsGameService.compareHand(playerHand, computerHand);
        expect(outcome).toEqual(RPSOutcomes.Draw);
      });
    });
  });
});
