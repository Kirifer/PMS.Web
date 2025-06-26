import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div
      class="h-screen w-screen flex items-center justify-center bg-gray-100"
    >
      <div
        class="bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 h-full w-full"
      >
        <!-- Left side - Login Form -->
        <div class="flex flex-col justify-center h-full w-full max-w-xl px-6 sm:px-10 md:px-20 lg:px-28">
          <h2 class="text-4xl font-extrabold font-sans tracking-tight text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>
          <p class="text-base font-medium text-gray-600 mb-6 text-center">
            Please sign in to your account to continue.
          </p>
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                placeholder="Enter your email"
                type="email"
                id="email"
                formControlName="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                [ngClass]="{
                  'border-red-500': email?.invalid && email?.touched
                }"
                aria-required="true"
              />
              <div
                *ngIf="email?.invalid && email?.touched"
                class="text-red-500 text-sm mt-1"
              >
                Please enter a valid email
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                placeholder="Enter your password"
                [type]="showPassword ? 'text' : 'password' "
                id="password"
                formControlName="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                [ngClass]="{
                  'border-red-500': password?.invalid && password?.touched
                }"
                aria-required="true"
              />
              <div
                *ngIf="password?.invalid && password?.touched"
                class="text-red-500 text-sm mt-1"
              >
                Password must be at least 6 characters
              </div>
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="text-sm text-blue-600 hover:text-blue-500 mt-1"
                [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
              >
                {{ showPassword ? 'Hide Password' : 'Show Password' }}
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              [disabled]="!loginForm.valid"
            >
              Sign in
            </button>
          </form>
        </div>

        <!-- Right side - Image -->
        <div class="bg-blue-900 relative h-full w-full flex items-center justify-center">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 opacity-70"></div>
          <img src="images/its-logo_v1.3-dark.png" alt="ITS Logo" class="relative z-10 mx-auto my-auto max-w-xs max-h-80" />
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
