import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RPSGameElementComponent } from './game-element.component';

import { By } from '@angular/platform-browser';
import { GAME_ELEMENTS } from 'src/app/models/game.const';

describe("RPSGameElementComponentSpecs", () => {
  let fixture: ComponentFixture<RPSGameElementComponent>;
  let component: RPSGameElementComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RPSGameElementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPSGameElementComponent);
    component = fixture.componentInstance;
  });

  describe("given the game element is initialized", () => {
    beforeEach(() => {
      component.gameElement = GAME_ELEMENTS[0];
      spyOn(component.onClick, "emit");
      fixture.detectChanges();
    });

    it("should render the game element", () => {
      const val = fixture.debugElement.query(By.css("[test-id=game-element]"));
      expect(val).not.toBeNull();
    });

    describe("when the element is not playable", () => {
      beforeEach(() => {
        const val = fixture.debugElement.query(By.css("[test-id=game-element]"));
        val.triggerEventHandler("click", null);
      });

      it("should not emit", () => {
        expect(component.onClick.emit).not.toHaveBeenCalledWith(GAME_ELEMENTS[0]);
      });
    });

    describe("when the element is playable", () => {
      beforeEach(() => {
        component.playable = true;

        const val = fixture.debugElement.query(By.css("[test-id=game-element]"));
        val.triggerEventHandler("click", null);
      });

      it("should emit back the game element", () => {
        expect(component.onClick.emit).toHaveBeenCalledWith(GAME_ELEMENTS[0]);
      });
    });
  });
});
