import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HttpClient } from '@angular/common/http';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  isSupervisor: boolean;
}

export interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  name?: string;
  is_deleted?: boolean;
  isSupervisor: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule,
    AddUserComponent,
    EditUserComponent,
  ],
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

        <div class="flex justify-between items-center mb-6">
          <input
            matInput
            (keyup)="applyFilter($event)"
            placeholder="Search users"
            #input
            class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4"
          />
          <select
            [(ngModel)]="positionFilter"
            (change)="applyFilter()"
            class="px-4 py-2 border rounded-lg shadow-sm mr-4"
          >
          <option value="">All Positions</option>
            <option *ngFor="let position of positions" [value]="position">
              {{ position }}
            </option>
          </select>
          <select
            [(ngModel)]="supervisorFilter"
            (change)="applyFilter()"
            class="px-4 py-2 border rounded-lg shadow-sm mr-4"
          >
            <option value="">All Supervisors</option>
            <option value="true">Supervisors</option>
            <option value="false">Non-Supervisors</option>
          </select>
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
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.position }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                    (click)="openEditUserModal(user)"
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <i-lucide [img]="Edit" class="w-5 h-5"></i-lucide>
                  </button>
                  <button
                    class="text-red-600 hover:text-red-900"
                    (click)="deleteUser(user.id)"
                  >
                    <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="isEditModalVisible">
          <app-edit-user
            [user]="userToEdit"
            (userUpdated)="onUserUpdated($event)"
            (reloadUsers)="fetchUsers()"
            (cancel)="closeEditModal()"
          ></app-edit-user>
        </div>

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
  // Existing properties
  isModalVisible: boolean = false;
  readonly Edit = Edit;
  readonly Trash = Trash;
  isEditModalVisible: boolean = false;
  userToEdit: UserRecord | null = null;

  users: UserRecord[] = [];
  filteredUsers: UserRecord[] = [];
  headers = ['Name', 'Email Address', 'Position', 'Actions'];

  // New properties
  positions: string[] = ['Manager', 'Developer', 'Designer', 'QA', 'HR']; // Add positions here
  positionFilter: string = '';
  supervisorFilter: string = '';

  constructor(private http: HttpClient) {}

  applyFilter(event?: Event) {
    const filterValue = event
      ? (event.target as HTMLInputElement).value.trim().toLowerCase()
      : '';

    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch = filterValue
        ? Object.values(user).join(' ').toLowerCase().includes(filterValue)
        : true;

      const matchesSupervisorFilter =
        this.supervisorFilter !== ''
          ? String(user.isSupervisor) === this.supervisorFilter
          : true;

      const matchesPositionFilter =
        this.positionFilter !== ''
          ? user.position === this.positionFilter
          : true;

      return matchesSearch && matchesSupervisorFilter && matchesPositionFilter;
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get<{ data: UserRecord[] }>('https://localhost:7012/users')
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response.data)) {
            this.users = response.data
              .filter((user) => !user.is_deleted)
              .map((user) => ({
                ...user,
                name: `${user.firstName} ${user.lastName}`,
              }));
            this.filteredUsers = [...this.users];

            // Dynamically populate positions from user data
            this.positions = Array.from(
              new Set(this.users.map((user) => user.position))
            ).sort();
          }
        },
        error: (err) => {
          console.error('Error Fetching Users:', err);
        },
      });
  }

  // ADD USERS
  openAddUserModal() {
    this.isModalVisible = true;
  }

  closeModalHandler() {
    this.isModalVisible = false;
  }

  onUserAdded(newUser: UserCreateDto) {
    const createdUser: UserRecord = {
      id: this.users.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      position: newUser.position,
      name: `${newUser.firstName} ${newUser.lastName}`,
      isSupervisor: newUser.isSupervisor,
    };

    this.users.push(createdUser);
    this.filteredUsers = [...this.users];
    this.isModalVisible = false;
  }

  // DELETE USERS
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete<any>(`https://localhost:7012/users/${id}`).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
          this.filteredUsers = [...this.users];
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete the user. Please try again.');
        },
      });
    }
  }

  // EDIT USERS
  onUserUpdated(updatedUser: UserRecord) {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = {
        ...updatedUser,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      };
      this.filteredUsers = [...this.users];
    }
    this.closeEditModal();
  }

  openEditUserModal(user: UserRecord) {
    this.userToEdit = user;
    this.isEditModalVisible = true;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
    this.userToEdit = null;
  }
}
