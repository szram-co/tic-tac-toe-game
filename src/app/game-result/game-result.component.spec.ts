import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultComponent } from './game-result.component';

describe('GameResultComponent', () => {
  let component: GameResultComponent;
  let fixture: ComponentFixture<GameResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
