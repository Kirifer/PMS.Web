import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular'; // Import Lucide icons
import { AddUserComponent } from '../../components/add-user/add-user.component'; // Import AddUserComponent
import { HttpClient, HttpClientModule } from '@angular/common/http';
interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  isSupervisor: boolean;
  isActive: boolean;
  fullName: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    LucideAngularModule,
    AddUserComponent,
    CommonModule,
    HttpClientModule,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-full mx-auto px-4">
        <h1 class="text-3xl font-semibold text-gray-900 mb-6">Users List</h1>
        <div class="flex flex-row justify-between">
          <input
            (keyup)="applyFilter($event)"
            placeholder="Search records"
            #input
            class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4 mb-4"
          />
          <!-- Add Record Button -->
          <button
            (click)="openAddUserModal()"
            class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 mb-4"
          >
            Create a User
          </button>
        </div>
        <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let user of users">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.fullName }}
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
                  </button>
                  <button class="text-red-600 hover:text-red-900">
                    <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <app-add-user
            (close)="closeAddUserModal()"
            (add)="addUser()"
            *ngIf="isModalOpen"
          ></app-add-user>
        </div>
      </div>
    </div>
  `,
})
export class UsersComponent {
  readonly Edit = Edit;
  readonly Trash = Trash;

  headers = ['Name', 'Email Address', 'Position', 'Actions'];

  users: UserRecord[] = [];

  http = inject(HttpClient);

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http
      .get<{ data: UserRecord[] }>('https://localhost:7012/users')
      .subscribe({
        next: (response) => {
          this.users = response.data;
          console.log(response.data)
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
  }

  filteredUsers: UserRecord[] = [...this.users];
  isModalOpen = false;

  // Apply filter when typing in the search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue) {
      this.filteredUsers = this.users.filter((user) =>
        Object.values(user).join(' ').toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  // Open the modal
  openAddUserModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeAddUserModal() {
    this.isModalOpen = false;
  }

  // Placeholder for Add User logic
  addUser() {
    console.log('Add User button clicked');
    // Logic for adding a new user can go here
  }
}
