import { Injectable, Inject } from "@angular/core";
import { RPSGameElement } from '../models/game-element';
import { RPSOutcomes } from '../models/game.const';

@Injectable({
  providedIn: "root"
})
export class RPSGameService {
  constructor(
    @Inject("gameElements") private gameElements: RPSGameElement[],
    @Inject("scoreLimit") private scoreLimit: number
  ) {
  }

  comDraw(): RPSGameElement {
    return this.calcComputerMove();
  }

  compareHand(playerMove: RPSGameElement, comMove: RPSGameElement): RPSOutcomes {
    if (playerMove.name === comMove.weakTo) {
      return RPSOutcomes.Win;
    }
    else if (playerMove.name === comMove.strongVs) {
      return RPSOutcomes.Lose;
    }
    return RPSOutcomes.Draw;
  }

  checkForWin(score: number): boolean {
    return score === this.scoreLimit;
  }

  private calcComputerMove(): RPSGameElement {
    return this.gameElements[Math.floor(Math.random() * this.gameElements.length)];
  }
}
