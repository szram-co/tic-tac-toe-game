import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { StorageService } from '../services/storage.service';
import { KEY_PLAYER_1, KEY_PLAYER_2 } from '../constants';
import { GameSymbolCircleComponent } from '../game-symbol-circle/game-symbol-circle.component';
import { GameSymbolCrossComponent } from '../game-symbol-cross/game-symbol-cross.component';

export interface GameBoardCell {
  id: string;
  value: string;
  isMatch: boolean;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    NgForOf,
    MatRipple,
    MatButton,
    NgClass,
    NgIf,
    GameSymbolCircleComponent,
    GameSymbolCrossComponent,
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  board: GameBoardCell[] = [];

  symbols: string[] = ['O', 'X'];
  winner: string = '';
  winnerPattern: string | null = null;

  currentPlayer: string = '';
  currentSymbol: string = '';

  player1: string = this.storageService.get(KEY_PLAYER_1);
  player1Symbol: string = '';

  player2: string = this.storageService.get(KEY_PLAYER_2);
  player2Symbol: string = '';

  private readonly WIN_PATTERN_CLASS = {
    // Rows
    'row-1': [0, 1, 2],
    'row-2': [3, 4, 5],
    'row-3': [6, 7, 8],
    // Cols
    'col-1': [0, 3, 6],
    'col-2': [1, 4, 7],
    'col-3': [2, 5, 8],
    // Diagonals
    'left-top-right-bot': [0, 4, 8],
    'right-top-left-bot': [2, 4, 6],
  };

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.initializeBoard();
    this.randomizeFirstPlayer();
  }

  initializeBoard() {
    this.winnerPattern = null;

    let id = 0;
    this.board = Array.from({ length: 9 }, () => ({
      id: `cell-${id++}`,
      value: '',
      isMatch: false,
    }));
  }

  randomizeFirstPlayer() {
    const randomIndex = Math.floor(Math.random() * 2);
    this.currentPlayer = randomIndex === 0 ? this.player1 : this.player2;
    this.currentSymbol = 'X'; // First player always starts with cross

    this.player1Symbol = this.currentPlayer === this.player1 ? 'X' : 'O';
    this.player2Symbol = this.currentPlayer === this.player2 ? 'X' : 'O';
  }

  trackByCell(index: number, cell: GameBoardCell): string {
    return cell.id;
  }

  makeMove(cell: GameBoardCell) {
    if (cell.value !== '') {
      return;
    }

    cell.value = this.currentSymbol;

    this.winnerPattern = this.hasWinPattern();

    if (this.winnerPattern !== null) {
      this.winner = this.currentPlayer;
      setTimeout(() => {
        this.router.navigate(['/result', { winner: this.currentPlayer }]);
      }, 3000);
    } else if (this.isDraw()) {
      this.router.navigate(['/result', { draw: true }]);
    } else {
      this.switchPlayer();
    }
  }

  switchPlayer() {
    this.currentSymbol = this.currentSymbol === 'O' ? 'X' : 'O';
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  hasWinPattern() {
    for (const [patternName, pattern] of Object.entries(
      this.WIN_PATTERN_CLASS
    )) {
      if (
        pattern.every((index) => this.board[index].value === this.currentSymbol)
      ) {
        pattern.forEach((cell) => {
          this.board[cell] = { ...this.board[cell], isMatch: true };
        });
        return patternName;
      }
    }

    return null;
  }

  isDraw(): boolean {
    return this.board.every((cell) => cell.value !== '');
  }

  resetGame() {
    this.winner = '';
    this.winnerPattern = null;
    this.board = Array.from({ length: 9 });
    this.randomizeFirstPlayer();
  }

  get gameBoardClassName() {
    return {
      'game-board': true,
      ...(this.winnerPattern !== null
        ? {
            'game-board--finished': true,
            [`game-board--${this.winnerPattern}`]: true,
          }
        : {}),
    };
  }
}
