import { Routes } from '@angular/router';
import { GamePlayerComponent } from './game-player/game-player.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameResultComponent } from './game-result/game-result.component';

export const routes: Routes = [
  { path: '', component: GamePlayerComponent },
  { path: 'game', component: GameBoardComponent },
  { path: 'result', component: GameResultComponent },
  { path: '**', redirectTo: '/' },
];
