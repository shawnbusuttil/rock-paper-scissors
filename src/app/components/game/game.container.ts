import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { RPSGameElement } from "src/app/models/game-element";
import { RPSGameService } from "src/app/services/rps-game.service";
import { GAME_MESSAGES, TIME_BETWEEN_ROUNDS, RPSOutcomes } from 'src/app/models/game.const';
import { Observable } from 'rxjs';

@Component({
  selector: "rps-game",
  styleUrls: ["./game.container.scss"],
  templateUrl: "./game.container.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameContainer {
  playerScore = 0;
  computerScore = 0;

  isLoading = false;
  isGameFinished = false;
  currentMessage = GAME_MESSAGES.default;
  opponentChooses: RPSGameElement | undefined;

  constructor(private gameService: RPSGameService, private changeDetector: ChangeDetectorRef) {}

  play(playerMove: RPSGameElement) {
    this.opponentChooses = this.gameService.comDraw();

    const outcome = this.gameService.compareHand(playerMove, this.opponentChooses);

    this.isLoading = true;
    this.isGameFinished = this.updateScore(outcome);

    if (!this.isGameFinished) {
      this.nextRound();
    } else {
      this.logOutcome(this.playerScore > this.computerScore ? "Player wins!" : "COM wins!");
    }
  }

  restartGame() {
    this.resetUI();
    this.resetScores();
  }

  private updateScore(result: RPSOutcomes) {
    let score: number;

    if (result === RPSOutcomes.Win) {
      score = ++this.playerScore;
      this.logOutcome("Player wins this round!");
    }
    else if (result === RPSOutcomes.Lose) {
      score = ++this.computerScore;
      this.logOutcome("COM wins this round!");
    }
    else {
      this.logOutcome("It's a draw...");
    }

    return score && this.gameService.checkForWin(score);
  }

  private logOutcome(message: string) {
    this.currentMessage = message;
  }

  private nextRound() {
    setTimeout(() => this.resetUI(), TIME_BETWEEN_ROUNDS);
  }

  private resetScores() {
    this.playerScore = this.computerScore = 0;
    this.isGameFinished = false;

    return Observable
  }

  private resetUI() {
    this.isLoading = false;
    this.opponentChooses = undefined;
    this.currentMessage = GAME_MESSAGES.default;
    this.changeDetector.markForCheck();
  }
}
