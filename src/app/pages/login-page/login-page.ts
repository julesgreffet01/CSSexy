import {Component, OnInit, OnDestroy, signal, inject} from '@angular/core';
import {Buttons} from '../../components/buttons/buttons';
import {LoginInput} from '../../components/login-input/login-input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ServiceAuth} from '../../core/services/service-auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginInput,
    Buttons,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit, OnDestroy{

  activeLogin = signal<boolean>(false)
  authService = inject(ServiceAuth)
  router = inject(Router)
  errorLogin = signal<boolean>(false)


  ngOnInit() {
    document.body.classList.add('bg');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg');
  }

  formLogin = new FormGroup({
    login: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  })

  onSubmit(){
    this.activeLogin.set(false)
    this.errorLogin.set(false)
    if(this.formLogin.valid){
      const { login, password } = this.formLogin.getRawValue();
      this.authService.login(login, password).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: err => {
          this.errorLogin.set(true)
        }
      })
    } else {
      this.formLogin.markAllAsTouched();
      this.activeLogin.set(true)
      return;
    }
  }


}
