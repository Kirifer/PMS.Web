import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular'; // Import Lucide icons

interface UserRecord {
  id: number;
  name: string;
  email: string;
  position: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, LucideAngularModule], // Add LucideAngularModule
  template: `
    <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-full mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold text-gray-900">
            Users List
          </h1>
        </div>
        <p class="text-sm text-gray-600 mt-[-20px] mb-4">
          A comprehensive list of users showcasing their names, email addresses, and positions within the organization.
        </p>
         <!-- Search and Add User -->
         <div class="flex justify-between items-center mb-6">
          <input
            matInput
            (keyup)="applyFilter($event)"
            placeholder="Search users"
            #input
            class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4"
          />
          <button
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            (click)="addUser()"
          >
            Add User
          </button>
        </div>

        <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  *ngFor="let header of headers"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Change users to filteredUsers -->
              <tr *ngFor="let user of filteredUsers">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.position }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                    <i-lucide [img]="Edit" class="w-5 h-5"></i-lucide>
                    <!-- Edit Icon -->
                  </button>
                  <button class="text-red-600 hover:text-red-900">
                    <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
                    <!-- Delete Icon -->
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class UsersComponent {
  readonly Edit = Edit;
  readonly Trash = Trash;

  headers = ['Name', 'Email Address', 'Position', 'Actions'];

  users: UserRecord[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
    },
    {
      id: 2,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      position: 'Marketing Manager',
    },
    {
      id: 3,
      name: 'Michael Smith',
      email: 'michael.smith@example.com',
      position: 'Project Manager',
    },
  ];

  filteredUsers: UserRecord[] = [...this.users];

  // Apply filter when typing in the search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.filteredUsers = this.users.filter((user) =>
        Object.values(user).join(' ').toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  addUser() {
    console.log('Add User button clicked');
    // Logic for adding a new user can go here
  }
}
