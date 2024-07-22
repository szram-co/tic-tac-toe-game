import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-game-symbol-circle',
  standalone: true,
  imports: [],
  templateUrl: './game-symbol-circle.component.html',
  styleUrl: './game-symbol-circle.component.scss',
})
export class GameSymbolCircleComponent implements OnInit, OnChanges {
  @Input() size: number = 100;
  @Input() width: number = 8;

  circleR: number = 0;
  crossStroke: number = 0;
  circleCircumference: number = 0;

  ngOnInit() {
    this.calculateCircleProperties();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['size'] || changes['width']) {
      this.calculateCircleProperties();
    }
  }

  private calculateCircleProperties() {
    this.crossStroke = (this.width / 100) * this.size;
    this.circleR = this.size / 2 - this.crossStroke / 2;
    this.circleCircumference = 2 * Math.PI * this.circleR;
  }
}
