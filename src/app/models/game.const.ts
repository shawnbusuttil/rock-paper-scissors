import { RPSGameElement } from './game-element';

export const GAME_MESSAGES = {
  default: "Rock, paper, scissors..."
}

export const TIME_BETWEEN_ROUNDS = 4000;

export enum RPSElements {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors"
}

export enum RPSOutcomes {
  Win = "Win",
  Lose = "Lose",
  Draw = "Draw"
}

export const GAME_ELEMENTS: RPSGameElement[] = [{
  name: RPSElements.Rock,
  weakTo: RPSElements.Paper,
  strongVs: RPSElements.Scissors
},
{
  name: RPSElements.Paper,
  weakTo: RPSElements.Scissors,
  strongVs: RPSElements.Rock
},
{
  name: RPSElements.Scissors,
  weakTo: RPSElements.Rock,
  strongVs: RPSElements.Paper
}];
