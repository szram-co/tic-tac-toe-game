import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { StorageService } from '../services/storage.service';
import { KEY_PLAYER_1, KEY_PLAYER_2 } from '../constants';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [NgForOf, MatRipple, MatButton, NgClass, NgIf],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  winner: string = '';
  currentPlayer: string = '';
  currentSymbol: string = '';
  player1: string = this.storageService.get(KEY_PLAYER_1);
  player2: string = this.storageService.get(KEY_PLAYER_2);
  symbols: string[] = ['O', 'X'];

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.randomizeFirstPlayer();
  }

  randomizeFirstPlayer() {
    const randomIndex = Math.floor(Math.random() * 2);
    this.currentPlayer = randomIndex === 0 ? this.player1 : this.player2;
    this.currentSymbol = 'X'; // First player always starts with cross
  }

  makeMove(row: number, col: number) {
    if (this.board[row][col] !== '') {
      return;
    }

    this.board[row][col] = this.currentSymbol;

    if (this.checkWin()) {
      this.winner = this.currentPlayer;
      // this.router.navigate(['/result', { winner: this.currentPlayer }]);
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

  checkWin(): boolean {
    // Sprawdź wiersze, kolumny i przekątne
    const lines = [
      // Wiersze
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Kolumny
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Przekątne
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[2][0], this.board[1][1], this.board[0][2]],
    ];

    return lines.some((line) =>
      line.every((cell) => cell === this.currentSymbol)
    );
  }

  isDraw(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ''));
  }

  resetGame() {
    this.winner = '';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.randomizeFirstPlayer();
  }

  goToHome() {
    return this.router.navigate(['/']);
  }
}
