import { Component } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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

  constructor(private fb: UntypedFormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required,
      Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$")]],
      password: [null, [Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    ]],
      remember:[null]
    });
  }
}
