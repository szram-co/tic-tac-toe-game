import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { KEY_PLAYER_1, KEY_PLAYER_2 } from '../constants';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [NgIf, MatButton],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent implements OnInit {
  winner: string | null = null;
  draw: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.winner = this.route.snapshot.paramMap.get('winner');
    this.draw = this.route.snapshot.paramMap.get('draw') === 'true';
  }

  restartGame() {
    this.router.navigate(['/game']);
  }

  goToHome() {
    return this.router.navigate(['/']);
  }
}
