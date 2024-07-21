import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSymbolCrossComponent } from './game-symbol-cross.component';

describe('GameSymbolCrossComponent', () => {
  let component: GameSymbolCrossComponent;
  let fixture: ComponentFixture<GameSymbolCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSymbolCrossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSymbolCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
