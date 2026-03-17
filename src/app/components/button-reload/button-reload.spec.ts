import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReload } from './button-reload';

describe('ButtonReload', () => {
  let component: ButtonReload;
  let fixture: ComponentFixture<ButtonReload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonReload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonReload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
