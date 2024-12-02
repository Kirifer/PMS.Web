import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Edit, Trash, Table2, Plus } from 'lucide-angular';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HttpClient } from '@angular/common/http';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { TableCompetenciesComponent } from '../perf-review copy/components/add-record/table-competencies.component';
import { TableSkeletonComponent } from '../../shared/components/loading/table-skeleton/table-skeleton.component';

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
    TableSkeletonComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  // Existing properties
  isModalVisible: boolean = false;
  readonly Edit = Edit;
  readonly Trash = Trash;
  readonly Plus = Plus;
  isEditModalVisible: boolean = false;
  isLoading = false;
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
    this.isLoading = true;

    this.http
      .get<{ data: UserRecord[] }>('https://localhost:7012/lookup/users')
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

            this.positions = Array.from(
              new Set(this.users.map((user) => user.position))
            ).sort();

            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          }
        },
        error: (err) => {
          console.error('Error Fetching Users:', err);
          this.isLoading = true;
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
