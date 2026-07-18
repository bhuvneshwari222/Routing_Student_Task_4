import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm !: FormGroup;
  signUpForm !: FormGroup;
  isAllReadyLoggedIn: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _snackBar: SnackBarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
    this.createLoginForm();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      userRole: new FormControl('admin')
    })
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    })
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  get signUpFormControls() {
    return this.signUpForm.controls;
  }

  onSignUp() {
    this.isLoading = true;
    if (this.signUpForm.invalid) {
      this.isLoading = false;
      return this.signUpForm.markAllAsTouched();
    } else {
      let signUpDetails = this.signUpForm.value;
      this._authService.signUp(signUpDetails)
        .subscribe({
          next: resp => {
            this.isLoading = false;
            this.isAllReadyLoggedIn = true;
          },
          error: err => {
            this.isLoading = false;
            this._snackBar.openSnackBar(err.error.message);
          }
        })
    }
  }

  onLogin() {
    this.isLoading = true;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return this.loginForm.markAllAsTouched();
    } else {
      let loginDetails = this.loginForm.value;
      this._authService.login(loginDetails)
        .subscribe({
          next: resp => {
            this.isLoading = false;
            this._snackBar.openSnackBar(resp.message);
            this._authService.saveToken(resp.token);
            this._authService.saveUserRole(resp.userRole);
            this._snackBar.openSnackBar(resp.message);
            this._router.navigate(['home']);
          },
          error: err => {
            this.isLoading = false;
            this._snackBar.openSnackBar(err.error.message);
          }
        })
    }
  }



}
