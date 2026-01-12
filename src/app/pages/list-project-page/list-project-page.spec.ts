import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectPage } from './list-project-page';

describe('ListProjectPage', () => {
  let component: ListProjectPage;
  let fixture: ComponentFixture<ListProjectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProjectPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
