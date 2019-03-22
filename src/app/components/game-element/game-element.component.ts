import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { RPSGameElement } from 'src/app/models/game-element';

@Component({
  selector: 'rps-game-element',
  styleUrls: ['./game-element.component.scss'],
  templateUrl: './game-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RPSGameElementComponent {
  @Input() gameElement: RPSGameElement;
  @Input() playable = false;

  @Output() onClick? = new EventEmitter<RPSGameElement>();
}
