import { Component } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!: UntypedFormGroup;
  loggingUser: User = { email: '', password: '' };

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.authService.login(this.loggingUser)) {
        var storeUserData = {
          email: this.loggingUser.email,
          rememberMe: this.loggingUser.rememberMe
        };
        sessionStorage.setItem("loggedInUserEmail", storeUserData.email);
        this.router.navigateByUrl("/birthdays");
      }
      else {
        this.loggingUser.email = '';
        this.loggingUser.password = '';
        this.loggingUser.rememberMe = false;
        this.router.navigateByUrl('/');
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  registerRedirect(): void {
    this.router.navigateByUrl("/register");
  }

  constructor(private fb: UntypedFormBuilder, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    if (sessionStorage.getItem("loggedInUserEmail")) {
      var user = JSON.parse(sessionStorage.getItem("loggedInUserEmail") || '');
      if (user != '' && user.rememberMe == true) {
        var rememberedUser = this.authService.getUserByEmail(user.email);
        if (rememberedUser != undefined) {
          this.loggingUser.email = rememberedUser.email;
          this.loggingUser.password = rememberedUser.password;
          this.loggingUser.rememberMe = true;
        }
      }
    }
    this.validateForm = this.fb.group({
      email: [null, [Validators.required,
      Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$")]],
      password: [null, [Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ]],
      remember: [null]
    });
  }
}
