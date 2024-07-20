import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass, NgIf } from '@angular/common';
import { KEY_IS_GAME_CREATED, KEY_PLAYER_1, KEY_PLAYER_2 } from '../constants';
import { StorageService } from '../services/storage.service';
import { AutofocusDirective } from '../directives/autofocus.directive';

@Component({
  selector: 'app-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel,
    NgIf,
    NgClass,
    AutofocusDirective,
  ],
})
export class GamePlayerComponent implements OnInit {
  playersForm: FormGroup;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.playersForm = new FormGroup(
      {
        [KEY_PLAYER_1]: new FormControl(
          this.storageService.get(KEY_PLAYER_1),
          Validators.required
        ),
        [KEY_PLAYER_2]: new FormControl(
          this.storageService.get(KEY_PLAYER_2),
          Validators.required
        ),
      },
      { validators: this.playersNameValidator }
    );
  }

  ngOnInit() {}

  playersNameValidator(control: AbstractControl): ValidationErrors | null {
    const player1 = control.get(KEY_PLAYER_1)?.value.toLocaleString();
    const player2 = control.get(KEY_PLAYER_2)?.value.toLocaleString();
    return player1 && player2 && player1 === player2
      ? { samePlayerNames: true }
      : null;
  }

  onSubmit() {
    if (this.playersForm.valid) {
      const player1 = this.playersForm.getRawValue().player1;
      const player2 = this.playersForm.getRawValue().player2;

      localStorage.setItem(KEY_PLAYER_1, player1);
      localStorage.setItem(KEY_PLAYER_2, player2);

      if (!this.isGameCreated) {
        this.storageService.set(KEY_IS_GAME_CREATED, 'yes');
      }

      this.router.navigate(['/game']);
    } else {
      this.playersForm.markAllAsTouched();
    }
  }

  clearStoredData(event: Event) {
    event.preventDefault();
    this.storageService.remove(KEY_IS_GAME_CREATED);
    this.storageService.remove(KEY_PLAYER_1);
    this.storageService.remove(KEY_PLAYER_2);
    this.playersForm.reset();
  }

  get isGameCreated(): boolean {
    return this.storageService.get(KEY_IS_GAME_CREATED) === 'yes';
  }
}
