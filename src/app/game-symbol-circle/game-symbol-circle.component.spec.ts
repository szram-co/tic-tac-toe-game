import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSymbolCircleComponent } from './game-symbol-circle.component';

describe('GameSymbolCircleComponent', () => {
  let component: GameSymbolCircleComponent;
  let fixture: ComponentFixture<GameSymbolCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSymbolCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSymbolCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
