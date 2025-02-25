import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { LucideAngularModule, User } from 'lucide-angular';
import { UserService } from '@app/core/services/users.service';
import { CommonModule } from '@angular/common';

// Define UserCreateDto interface with all necessary fields
export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  isSupervisor: boolean;
  is_deleted?: boolean;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule ,LucideAngularModule, CommonModule],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
    >
      <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-xl relative">
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 text-blue-900"
          aria-label="Close"
          (click)="closeAddUserModal()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Add User Header -->
        <div class="mb-6 text-center">
          <h5 class="text-lg font-semibold text-gray-800">Add New User</h5>
        </div>

        <!-- Add User Form -->
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- First Name and Last Name in the same line -->
          <div class="flex space-x-4">
            <div class="flex-1">
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700"
                >First Name</label
              >
              <div class="relative">
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  name="firstName"
                  class="mt-1 block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter first name"
                />
                <i-lucide
                  [img]="User"
                  class="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                ></i-lucide>
              </div>
              <div *ngIf="userForm.controls['firstName'].invalid && userForm.controls['firstName'].touched">
                First Name is required.
              </div>
            </div>
            <div class="flex-1">
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
                >Last Name</label
              >
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                name="lastName"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter last name"
              />
            </div>
            <div *ngIf="userForm.controls['lastName'].invalid && userForm.controls['lastName'].touched">
                Last Name is required.
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              type="email"
              formControlName="email"
              name="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email"
            />
            <div *ngIf="userForm.controls['email'].invalid && userForm.controls['email'].touched">
              Enter a valid email.
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              type="password"
              formControlName="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
            />
            <div *ngIf="userForm.controls['password'].invalid && userForm.controls['password'].touched">
              Password is required.
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              type="password"
              formControlName="confirmPassword"
              name="confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
              required
            />
            <div *ngIf="userForm.get('password')?.value !== userForm.get('confirmPassword')?.value && userForm.get('confirmPassword')?.touched">
              Passwords do not match.
            </div>
          </div>

          <!-- Position -->
          <div>
            <label
              for="position"
              class="block text-sm font-medium text-gray-700"
              >Position</label
            >
            <input
              id="position"
              type="text"
              formControlName="position"

              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position"
            />

            <div *ngIf="userForm.controls['position'].invalid && userForm.controls['position'].touched">
              Position is required.
            </div>
          </div>

          <!-- Is Supervisor -->
          <div>
            <label
              for="isSupervisor"
              class="block text-sm font-medium text-gray-700"
              >Is Supervisor?</label
            >
            <input
              id="isSupervisor"
              type="checkbox"
              formControlName="isSupervisor"
              name="isSupervisor"
              class="mt-1"
            />
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"

              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              [disabled]="userForm.invalid"
              class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  providers: [UserService],
})
export class AddUserComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<UserCreateDto>();
  private userService = inject(UserService);

  userForm: FormGroup;
  readonly User = User;
  isModalVisible = true;

  constructor( private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      position: ['', Validators.required],
      isSupervisor: [false]
    });
  }

  closeAddUserModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      alert('Invalid fields!');
    }

    const{ confirmPassword, ...payload } = this.userForm.value;

    this.userService.addUser(payload).subscribe({
      next: (res) => {
        this.userAdded.emit(payload);
        this.closeAddUserModal();
      },
      error: (err) => {
         console.error('Error adding user:', err);
        if (err.error && err.error.errors) {
          const validationErrors = err.error.errors;
          let errorMessage = 'Validation errors:\n';
          validationErrors.forEach((err: any) => {
            errorMessage += `- ${err.message || 'Unknown error'}\n`;
          });
          alert(errorMessage);
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    });

  }
}
