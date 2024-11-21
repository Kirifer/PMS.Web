import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Route, Router } from '@angular/router';

// Define the PmsUserCreateDto interface
export interface PmsUserCreateDto {
  Email: string;
  FirstName: string;
  LastName: string;
  Position: string;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  template: ` 
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
  <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-xl relative">
    <!-- Close Button -->
    <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
        aria-label="Close"
        (click)="closeAddUserModal()"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>

    <!-- Add User Header -->
    <div class="mb-6 text-center">
        <h5 class="text-lg font-semibold text-gray-800">Add New User</h5>
        <p class="text-gray-500">Fill out the form below to add a new user.</p>
    </div>

    <!-- Name Input -->
    <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <div class="flex space-x-2">
            <input
                type="text"
                name="firstName"
                class="w-1/2 h-10 mt-1 border border-gray-300 rounded-md px-3 focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="First Name"
            />
            <input
                type="text"
                name="lastName"
                class="w-1/2 h-10 mt-1 border border-gray-300 rounded-md px-3 focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="Last Name"
            />
        </div>
    </div>

    <!-- Email Input -->
    <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Email Address</label>
        <input
            type="email"
            name="email"
            class="w-full h-10 mt-1 border border-gray-300 rounded-md px-3 focus:ring focus:ring-pink-300 focus:outline-none"
            placeholder="user@example.com"
        />
    </div>

    <!-- Position Input -->
    <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Position</label>
        <input
            type="text"
            name="position"
            class="w-full h-10 mt-1 border border-gray-300 rounded-md px-3 focus:ring focus:ring-cyan-300 focus:outline-none"
            placeholder="Position (e.g., Manager)"
        />
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between space-x-4">
        <button
            class="w-1/2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
            (click)="cancel()"
        >
            Cancel
        </button>
        <button
            class="w-1/2 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            (click)="navigateToUsers()"
            style="background-color: #1759A1;"
        >
            Add User
        </button>
    </div>
  </div>
</div>

  `
})
export class AddUserComponent {
  user: PmsUserCreateDto = {
    Email: '',
    FirstName: '',
    LastName: '',
    Position: ''
  };

  constructor(private router: Router) {}
  @Output() close = new EventEmitter<void>();
  @Output() addUser = new EventEmitter<any>(); 

  closeAddUserModal() {
    this.close.emit(); 
  }

  // // Submit the form to the backend
  // submit() {
  //   const userPayload = this.user;

  //   this.http.post('https://your-api-endpoint.com/api/users', userPayload)
  //     .subscribe(
  //       (response) => {
  //         console.log('User added successfully:', response);
  //         this.closeAddUserModal(); // Optionally close the modal on success
  //       },
  //       (error) => {
  //         console.error('Error adding user:', error);
  //       }
  //     );
  // }

  cancel() {
    this.closeAddUserModal(); // Handle cancel logic
  }

  navigateToUsers() {
    this.router.navigate(['./users']);
  }
}
