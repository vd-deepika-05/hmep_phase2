import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService   // ✅ use service
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // this.loginService.login(this.loginForm.value).subscribe({
    //   next: (res: any) => {
    //     this.loading = false;
    //     console.log('Login success', res);
    // sessionStorage.setItem('token', res.token);
    //     this.router.navigate(['/admin/users']);
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.errorMsg = err?.error?.message || 'Login failed';
    //   }
    // });
  }
}