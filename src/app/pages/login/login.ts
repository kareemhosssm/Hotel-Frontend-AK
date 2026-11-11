import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authService/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  showPassword = false;

  loginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.email, Validators.required]),
    Password: new FormControl('', [
      Validators.pattern(/^(?=.*[a-z])(?=.*\d)[A-Z].{7,}$/),
      Validators.required,
    ]),
  });

  get passwordValue(): string {
    return String(this.loginForm.get('Password')?.value ?? '');
  }

  get startsWithCapital(): boolean {
    return /^[A-Z]/.test(this.passwordValue);
  }

  get hasMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }

  get hasLowerCase(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.passwordValue);
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('Email', this.loginForm.value.Email);
      formData.append('Password', this.loginForm.value.Password);

      this.authService.sendLoginForm(formData).subscribe({
        next: (res) => {
          console.log(res);

          if (res.token) {
            setTimeout(() => {
              localStorage.setItem('userToken', res.token);
              this.authService.saveUserData();
              this.router.navigate(['/home']);
            }, 1000);

            this.isSuccess = 'Login successful! Redirecting...';
          }

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error:', err);
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
