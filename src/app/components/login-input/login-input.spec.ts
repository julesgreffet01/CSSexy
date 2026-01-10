import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInput } from './login-input';

describe('LoginInput', () => {
  let component: LoginInput;
  let fixture: ComponentFixture<LoginInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
