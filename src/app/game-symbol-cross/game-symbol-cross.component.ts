import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-symbol-cross',
  standalone: true,
  imports: [],
  templateUrl: './game-symbol-cross.component.html',
  styleUrl: './game-symbol-cross.component.scss',
})
export class GameSymbolCrossComponent implements OnInit {
  @Input() size: number = 100;
  @Input() width: number = 8;

  crossStroke: number = 0;
  crossDiagonal: number = 0;

  ngOnInit() {
    this.crossStroke = (this.width / 100) * this.size;
    this.crossDiagonal = this.size * Math.sqrt(2);
  }
}
