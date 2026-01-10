import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadButton } from './reload-button';

describe('ReloadButton', () => {
  let component: ReloadButton;
  let fixture: ComponentFixture<ReloadButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReloadButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReloadButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
