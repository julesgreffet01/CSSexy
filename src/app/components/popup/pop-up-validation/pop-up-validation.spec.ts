import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpValidation } from './pop-up-validation';

describe('PopUpValidation', () => {
  let component: PopUpValidation;
  let fixture: ComponentFixture<PopUpValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpValidation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
