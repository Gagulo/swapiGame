import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('winner()', () => {
    it('should return "Person" if personMass > starshipCrew', () => {
      const result = component.winner('80', '50');
      expect(result).toBe('Person');
    });

    it('should return "Starship" if personMass < starshipCrew', () => {
      const result = component.winner('50', '80');
      expect(result).toBe('Starship');
    });

    it('should return "It\'s a tie!" if personMass = starshipCrew', () => {
      const result = component.winner('50', '50');
      expect(result).toBe('It\'s a tie!');
    });

    it('should return "Cannot determine the winner" if inputs are not valid numbers', () => {
      const result = component.winner('abc', '50');
      expect(result).toBe('Cannot determine the winner');
    });
  });
});
