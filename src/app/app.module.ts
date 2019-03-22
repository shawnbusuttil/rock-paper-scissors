import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RPSGameService } from './services/rps-game.service';
import { RPSGameElementComponent } from './components/game-element/game-element.component';
import { GameContainer } from './components/game/game.container';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { CommonModule } from '@angular/common';
import { GAME_ELEMENTS } from './models/game.const';

@NgModule({
  declarations: [
    GameContainer,
    RPSGameElementComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    RPSGameService,
    { provide: 'gameElements', useValue: GAME_ELEMENTS},
    { provide: "scoreLimit", useValue: 5 }
  ],
  bootstrap: [GameContainer]
})
export class AppModule { }
