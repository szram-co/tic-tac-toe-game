import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-game-symbol-cross',
  standalone: true,
  imports: [],
  templateUrl: './game-symbol-cross.component.html',
  styleUrl: './game-symbol-cross.component.scss',
})
export class GameSymbolCrossComponent implements OnInit, OnChanges {
  @Input() size: number = 100;
  @Input() width: number = 8;

  crossStroke: number = 0;
  crossDiagonal: number = 0;

  ngOnInit() {
    this.calculateCrossProperties();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['size'] || changes['width']) {
      this.calculateCrossProperties();
    }
  }

  private calculateCrossProperties() {
    this.crossStroke = (this.width / 100) * this.size;
    this.crossDiagonal = this.size * Math.sqrt(2);
  }
}
