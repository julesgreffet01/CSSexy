import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapTab } from './swap-tab';

describe('SwapTab', () => {
  let component: SwapTab;
  let fixture: ComponentFixture<SwapTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
