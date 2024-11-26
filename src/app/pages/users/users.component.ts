import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { HttpClient } from '@angular/common/http';

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  isSupervisor: boolean;
}

interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  // Add a computed 'name' property for convenience
  name?: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, LucideAngularModule, AddUserComponent, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-full mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold text-gray-900">Users List</h1>
        </div>
        <p class="text-sm text-gray-600 mt-[-20px] mb-4">
          A comprehensive list of users showcasing their names, email addresses,
          and positions within the organization.
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
            (click)="openAddUserModal()"
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
              <tr *ngFor="let user of filteredUsers">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.name }}
                  <!-- Display the combined name -->
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
        </div>

        <!-- Add User Modal -->
        <div *ngIf="isModalVisible">
          <app-add-user
            (userAdded)="onUserAdded($event)"
            (closeModal)="closeModalHandler()"
          ></app-add-user>
        </div>
      </div>
    </div>
  `,
})
export class UsersComponent implements OnInit {
  isModalVisible: boolean = false;

  readonly Edit = Edit;
  readonly Trash = Trash;

  users: UserRecord[] = []; // Ensure users is initialized as an empty array
  filteredUsers: UserRecord[] = [];
  headers = ['Name', 'Email Address', 'Position', 'Actions'];
  isModalOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
    // console.log(response)
  }

  // Fetch users directly using HttpClient
  fetchUsers() {
    this.http
      .get<{ data: UserRecord[] }>('https://localhost:7012/users')
      .subscribe((response) => {
        if (response && Array.isArray(response.data)) {
          this.users = response.data.map((user) => ({
            ...user,
            name: `${user.firstName} ${user.lastName}`,
          }));
          this.filteredUsers = [...this.users];
        }
      });
  }

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

  openAddUserModal() {
    this.isModalVisible = true; // Show the modal when the Add User button is clicked
  }

  closeModalHandler() {
    this.isModalVisible = false;
  }

  onUserAdded(newUser: UserCreateDto) {
    // Add the new user to the list and update filtered users
    const createdUser: UserRecord = {
      id: this.users.length + 1, // You might want to adjust the ID generation logic
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      position: newUser.position,
      name: `${newUser.firstName} ${newUser.lastName}`,
    };

    this.users.push(createdUser); // Add the new user to the list
    this.filteredUsers = [...this.users]; // Update the filtered list to include the new user
    this.isModalVisible = false;
  }
}
