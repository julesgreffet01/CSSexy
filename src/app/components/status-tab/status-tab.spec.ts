import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTab } from './status-tab';

describe('StatusTab', () => {
  let component: StatusTab;
  let fixture: ComponentFixture<StatusTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
