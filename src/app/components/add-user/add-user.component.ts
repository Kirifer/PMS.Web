import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { HttpClient } from '@angular/common/http';


// Define UserCreateDto interface with all necessary fields
export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  isSupervisor: boolean;
  
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Include FormsModule here
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
    >
      <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-xl relative">
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
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
        <form (ngSubmit)="submitUserForm()" class="space-y-4">
          <!-- First Name -->
          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              id="firstName"
              type="text"
              [(ngModel)]="firstName"
              name="firstName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter first name"
              required
            />
          </div>

          <!-- Last Name -->
          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              id="lastName"
              type="text"
              [(ngModel)]="lastName"
              name="lastName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter last name"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              type="email"
              [(ngModel)]="email"
              name="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email"
              required
            />
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
              [(ngModel)]="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
              required
            />
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
              [(ngModel)]="position"
              name="position"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position"
              required
            />
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
              [(ngModel)]="isSupervisor"
              name="isSupervisor"
              class="mt-1"
            />
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              (click)="closeAddUserModal()"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AddUserComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<UserCreateDto>();

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  position: string = '';
  isSupervisor: boolean = false; // Default to false for the checkbox
  isModalVisible: boolean = true;

  constructor(private http: HttpClient) {}

  closeAddUserModal() {
    console.log('Close button clicked');
    this.closeModal.emit();
  }
  
  

  submitUserForm() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.position ||
      this.isSupervisor === undefined
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Create a new user object matching the updated UserCreateDto
    const newUser: UserCreateDto = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      position: this.position,
      isSupervisor: this.isSupervisor,
    };
  
    console.log('Sending user data:', newUser); // Debugging line
  
    // Sending the POST request to the API
    this.http
      .post<UserCreateDto>('https://localhost:7012/users', newUser)
      .subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.userAdded.emit(newUser);
          this.closeAddUserModal();
        },
        (error) => {
          console.error('Error adding user:', error);
          if (error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            let errorMessage = 'Validation errors:\n';
  
            validationErrors.forEach((err: any) => {
              errorMessage += `- ${err.message || 'Unknown error'}\n`;
            });
  
            alert(errorMessage);
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        }
      );
  }
  
}