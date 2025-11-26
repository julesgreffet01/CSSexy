import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpError } from './pop-up-error';

describe('PopUpError', () => {
  let component: PopUpError;
  let fixture: ComponentFixture<PopUpError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
