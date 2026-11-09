import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authService/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  form: FormGroup;
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
  if (this.form.invalid) return;

  const data = { email: this.form.value.email };

  this.authService.forgotPassword(data).subscribe({
    next: (res: any) => {
      this.message = res;
      this.error = '';
    },
    error: (err) => {
      this.error = err.error || 'Something went wrong';
      this.message = '';
    }
  });
}

   get email() {
    return this.form.get('email');
  }
}
