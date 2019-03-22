import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rps-scoreboard',
  styleUrls: ['./scoreboard.component.scss'],
  templateUrl: './scoreboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent {
  @Input() playerScore: number;
  @Input() computerScore: number;
}
