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
  loggingUser: User = { email: '', password: ''};

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.authService.login(this.loggingUser)) {
        this.router.navigateByUrl("/birthdays");
      }
      else {
        this.loggingUser.email='';
        this.loggingUser.password='';
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
