import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ScoreboardComponent } from './scoreboard.component';
import { By } from '@angular/platform-browser';

describe("ScoreboardComponentSpecs", () => {
  let fixture: ComponentFixture<ScoreboardComponent>;
  let component: ScoreboardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
  });

  describe("given the scoreboard is initialized", () => {
    beforeEach(() => {
      component.playerScore = 5;
      component.computerScore = 3;
      fixture.detectChanges();
    });

    it("should render the player score", () => {
      const val = fixture.debugElement.query(By.css("[test-id=player-score]")).nativeElement.textContent;
      expect(val).toEqual("5");
    });

    it("should render the computer score", () => {
      const val = fixture.debugElement.query(By.css("[test-id=computer-score]")).nativeElement.textContent;
      expect(val).toEqual("3");
    });
  });
});
