import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router , RouterLink } from '@angular/router';
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
    
    Email: new FormControl('' , [Validators.email, Validators.required]),
    Password: new FormControl('', [Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/), Validators.required]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('Email', this.loginForm.value.Email);
      formData.append('Password', this.loginForm.value.Password);

      this.authService.sendLoginForm(formData).subscribe({
        next: (res) => {
          console.log(res);
           // Navigate to login page or show success message
          if (res.token) {
            setTimeout(() => {
               //1- save token in local storage
              localStorage.setItem('userToken', res.token);
              // 2- decode token to get user info
              this.authService.saveUserData();
               // 3- navigate to home page
              this.router.navigate(['/home']);
            }, 1000);
            
            this.isSuccess = 'Login successful! Redirecting...';
          }
          this.isLoading = false;
        },
        error: (err:HttpErrorResponse) => {
          console.error('Error:', err);

         this.msgError= err.error.message
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}
}
