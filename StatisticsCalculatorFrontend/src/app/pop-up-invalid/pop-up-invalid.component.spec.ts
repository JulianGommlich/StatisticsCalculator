import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpInvalidComponent } from './pop-up-invalid.component';

describe('PopUpInvalidComponent', () => {
  let component: PopUpInvalidComponent;
  let fixture: ComponentFixture<PopUpInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpInvalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
