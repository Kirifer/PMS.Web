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
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="h-screen flex items-center justify-center bg-gray-100 p-0">
      <div
        class="h-full w-full max-w-4xl bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2"
      >
        <!-- Left side - Login Form -->
        <div class="p-8 flex flex-col justify-center h-full">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
          <p class="text-sm text-gray-600 mb-6 text-center">
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
                type="email"
                id="email"
                formControlName="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                [ngClass]="{
                  'border-red-500':
                    loginForm.get('email')?.invalid &&
                    loginForm.get('email')?.touched
                }"
              />
              <div
                *ngIf="
                  loginForm.get('email')?.invalid &&
                  loginForm.get('email')?.touched
                "
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
                type="password"
                id="password"
                formControlName="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                [ngClass]="{
                  'border-red-500':
                    loginForm.get('password')?.invalid &&
                    loginForm.get('password')?.touched
                }"
              />
              <div
                *ngIf="
                  loginForm.get('password')?.invalid &&
                  loginForm.get('password')?.touched
                "
                class="text-red-500 text-sm mt-1"
              >
                Password must be at least 6 characters
              </div>
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
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              [disabled]="!loginForm.valid"
            >
              Sign in
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </a>
          </p>
        </div>

        <!-- Right side - Image -->
        <div class="hidden lg:block h-full">
          <img
            src="https://unsplash.com/photos/close-up-of-business-people-discussing-a-financial-plan-with-paperwork-and-digital-tablet-6y6DGYcuQNo"
            alt="Business illustration"
            class="w-full h-full object-cover rounded-r-lg"
          />
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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
