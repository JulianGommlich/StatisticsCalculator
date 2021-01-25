import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View2AnzeigeStichprobenComponent } from './view2-anzeige-stichproben.component';

describe('View2AnzeigeStichprobenComponent', () => {
  let component: View2AnzeigeStichprobenComponent;
  let fixture: ComponentFixture<View2AnzeigeStichprobenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ View2AnzeigeStichprobenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(View2AnzeigeStichprobenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
