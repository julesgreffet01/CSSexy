import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDownButton } from './up-down-button';

describe('UpDownButton', () => {
  let component: UpDownButton;
  let fixture: ComponentFixture<UpDownButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpDownButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpDownButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
