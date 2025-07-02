import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserCreateDto, UserRecord } from './user.interface';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { TableSkeletonComponent } from '@app/shared/components/loading/table-skeleton/table-skeleton.component';
import { UserService } from '@app/core/services/users.service';
import { SheetsComponent } from './components/sheets/user-sheets.component';
import {
  TW_BUTTON,
  TW_BUTTON_CUSTOM,
  TW_BUTTON_MUTED,
  TW_BUTTON_SECONDARY,
  TW_INPUT,
  TW_TABLE_ROW,
  TW_BADGE,
  TW_BADGE_2,
  TW_BORDER,
} from '@app/styles/table-styles';

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
    SheetsComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header Section with improved styling -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="mb-6 sm:mb-0">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                User Management
              </h1>
              <p class="text-gray-600 mt-3 text-lg">
                Manage your team members and their account permissions
              </p>
              <div class="flex items-center mt-4 space-x-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {{ totalUsers }} Total Users
                </span>
                <span class="text-sm text-gray-500">
                  {{ filteredUsers.length }} filtered
                </span>
              </div>
            </div>
            
            <!-- Enhanced Search & Filter Section -->
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="relative">
                <input
                  matInput
                  (keyup)="applyFilter($event)"
                  placeholder="Search users..."
                  #input
                  class="w-full sm:w-64 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              
              <div class="flex gap-2">
                <select
                  [(ngModel)]="positionFilter"
                  (change)="applyFilter()"
                  class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">All Positions</option>
                  <option *ngFor="let position of positions" [value]="position">
                    {{ position }}
                  </option>
                </select>

                <select
                  [(ngModel)]="supervisorFilter"
                  (change)="applyFilter()"
                  class="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">All Roles</option>
                  <option value="true">Supervisors</option>
                  <option value="false">Employees</option>
                </select>
              </div>

              <button
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                (click)="openAddUserModal()"
              >
                <i-lucide [img]="Plus" class="w-5 h-5 mr-2"></i-lucide>
                Add User
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Table Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div *ngIf="isLoading; else dataContent" class="p-8">
            <app-table-skeleton></app-table-skeleton>
          </div>

          <ng-template #dataContent>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-4 text-left">
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          (change)="toggleSelectAll($event)"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span class="ml-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          User
                        </span>
                      </div>
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Status & Role
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Position
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr
                    *ngFor="let user of getPaginatedUsers()"
                    class="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    (click)="openUserSheet(user)"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-4">
                        <input 
                          type="checkbox" 
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          (click)="$event.stopPropagation()"
                        />
                        
                        <div class="relative">
                          <img
                            src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                            alt="avatar"
                            class="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                          />
                          <div 
                            class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                            [ngClass]="{
                              'bg-green-500': user.isActive,
                              'bg-gray-400': !user.isActive
                            }"
                          ></div>
                        </div>

                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-semibold text-gray-900 truncate">
                            {{ user.name }}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{ user.email }}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="flex flex-col space-y-2">
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          [ngClass]="{
                            'bg-green-100 text-green-800': user.isActive,
                            'bg-yellow-100 text-yellow-800': !user.isActive
                          }"
                        >
                          <span 
                            class="w-1.5 h-1.5 rounded-full mr-1.5"
                            [ngClass]="{
                              'bg-green-400': user.isActive,
                              'bg-yellow-400': !user.isActive
                            }"
                          ></span>
                          {{ user.isActive ? 'Active' : 'Inactive' }}
                        </span>
                        
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          [ngClass]="{
                            'bg-purple-100 text-purple-800': user.isSupervisor,
                            'bg-blue-100 text-blue-800': !user.isSupervisor
                          }"
                        >
                          {{ user.isSupervisor ? 'Supervisor' : 'Employee' }}
                        </span>
                      </div>
                    </td>

                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-900 font-medium">
                        {{ user.position }}
                      </span>
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          (click)="openEditUserModal(user); $event.stopPropagation()"
                          title="Edit User"
                        >
                          <i-lucide [img]="Edit" class="w-5 h-5"></i-lucide>
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          (click)="deleteUser(user.id); $event.stopPropagation()"
                          title="Delete User"
                        >
                          <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ng-template>
        </div>

        <!-- Enhanced Pagination -->
        <div class="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div class="text-sm text-gray-700 mb-4 sm:mb-0">
            Showing <span class="font-medium">{{ startItem }}</span> to 
            <span class="font-medium">{{ endItem }}</span> of 
            <span class="font-medium">{{ filteredUsers.length }}</span> users
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              (click)="currentPage = currentPage - 1"
              [disabled]="currentPage === 1"
            >
              <i-lucide [img]="ChevronLeft" class="w-4 h-4 mr-1"></i-lucide>
              Previous
            </button>
            
            <div class="flex items-center space-x-1">
              <span class="px-3 py-2 text-sm font-medium text-gray-700">
                Page {{ currentPage }} of {{ Math.ceil(filteredUsers.length / itemsPerPage) }}
              </span>
            </div>
            
            <button
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              (click)="currentPage = currentPage + 1"
              [disabled]="currentPage * itemsPerPage >= filteredUsers.length"
            >
              Next
              <i-lucide [img]="ChevronRight" class="w-4 h-4 ml-1"></i-lucide>
            </button>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div *ngIf="selectedUsers.length > 0" class="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-red-800">
              {{ selectedUsers.length }} user(s) selected
            </span>
            <button
              class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-200"
              (click)="deleteSelectedUsers()"
            >
              <i-lucide [img]="Trash" class="w-4 h-4 mr-2"></i-lucide>
              Delete Selected
            </button>
          </div>
        </div>
      </div>

      <!-- Modals and Sheets -->
      <app-sheets
        [user]="selectedUser"
        [isSheetOpen]="isSheetVisible"
        (closeSheet)="onSheetClose()"
      ></app-sheets>

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
  `,
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  selectedUsers: number[] = [];
  isSheetOpen = false;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Edit = Edit;
  readonly Trash = Trash;
  readonly Plus = Plus;
  readonly Math = Math; // Add Math property for template access

  isEditModalVisible: boolean = false;
  isModalVisible: boolean = false;
  isLoading = false;

  userToEdit: UserRecord | null = null;
  totalUsers: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  startItem: number = 0;
  endItem: number = 0;
  positionFilter: string = '';
  supervisorFilter: string = '';
  selectedUser: UserRecord | null = null;

  users: UserRecord[] = [];
  filteredUsers: UserRecord[] = [];

  headers = ['Name', 'Email Address', 'Position', 'Actions'];
  positions: string[] = ['Manager', 'Developer', 'Designer', 'QA', 'HR'];

  private userService = inject(UserService);

  ngOnInit() {
    this.fetchUsers();
    this.loadScript('https://cdn.tailwindcss.com?plugins=forms,typography');
    this.loadScript(
      'https://unpkg.com/unlazy@0.11.3/dist/unlazy.with-hashing.iife.js'
    );
  }

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

    this.currentPage = 1;
    this.updatePagination();
  }

  loadScript(src: string) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService.fetchUsers().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.users = response.data
            .filter((user: any) => !user.is_deleted)
            .map((user: any) => ({
              ...user,
              name: `${user.firstName} ${user.lastName}`,
              dateCreated: new Date(user.dateCreated).toLocaleDateString(
                'en-US'
              ),
            }));
          console.log(response.data);
          this.filteredUsers = [...this.users];
          this.totalUsers = this.users.length;

          this.positions = Array.from(
            new Set(this.users.map((user) => user.position))
          ).sort();

          this.updatePagination();

          setTimeout(() => {
            this.isLoading = false;
          });
        }
      },
      error: (err) => {
        console.error('Error Fetching Users:', err);
        this.isLoading = false;
      },
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
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

  getPaginatedUsers(): UserRecord[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredUsers.length
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePagination();
  }

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

  onUserAdded(newUser: UserCreateDto) {
    const createdUser: UserRecord = {
      id: this.users.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      position: newUser.position,
      name: `${newUser.firstName} ${newUser.lastName}`,
      isSupervisor: newUser.isSupervisor,
      dateCreated: newUser.dateCreated,
    };

    this.users.push(createdUser);
    this.filteredUsers = [...this.users];
    this.isModalVisible = false;
  }

  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedUsers = this.filteredUsers.map((user) => user.id);
    } else {
      this.selectedUsers = [];
    }
  }

  toggleUserSelection(userId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers = this.selectedUsers.filter((id) => id !== userId);
    }
  }

  deleteSelectedUsers() {
    if (
      confirm(
        `Are you sure you want to delete ${this.selectedUsers.length} users?`
      )
    ) {
      this.selectedUsers.forEach((id) => {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.users = this.users.filter((user) => user.id !== id);
            this.filteredUsers = [...this.users];
          },
          error: (err) => {
            console.error(`Error deleting user with ID ${id}:`, err);
          },
        });
      });
      this.selectedUsers = [];
    }
  }

  openAddUserModal() {
    this.isModalVisible = true;
  }

  closeModalHandler() {
    this.isModalVisible = false;
  }

  openEditUserModal(user: UserRecord) {
    this.userToEdit = user;
    this.isEditModalVisible = true;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
    this.userToEdit = null;
  }

  closeSheet() {
    this.isSheetOpen = false;
  }

  isSheetVisible = false;

  openUserSheet(user: UserRecord): void {
    this.selectedUser = user;
    this.isSheetVisible = true;
  }

  onSheetClose(): void {
    this.isSheetVisible = false;
    this.selectedUser = null;
  }
}
