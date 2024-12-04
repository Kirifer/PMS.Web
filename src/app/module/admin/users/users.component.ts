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
    SheetsComponent, // Import SheetsComponent
  ],
  template: `
    <div
      class="h-[calc(100vh-.75rem)] bg-white mt-3 rounded-tl-2xl rounded-bl-2xl sm:px-6 lg:px-8"
    >
      <div class="max-w-full mx-auto py-3">
        <div class="p-2 bg-white rounded-lg mb-2">
          <h1 class="text-3xl font-semibold text-gray-900">User Management</h1>
          <p class="text-sm text-gray-600 mt-2">
            Manage your team members and their account permissions here.
          </p>

          <div class="flex justify-between items-center mt-4">
            <span class="text-lg font-bold">
              All users
              <span class="text-muted-foreground">({{ totalUsers }})</span>
            </span>
            <div class="flex items-center">
              <input
                matInput
                (keyup)="applyFilter($event)"
                placeholder="Search users"
                #input
                class="${TW_INPUT}"
              />
              <select
                [(ngModel)]="positionFilter"
                (change)="applyFilter()"
                class="${TW_INPUT} ml-2 appearance-none pr-8"
              >
                <option value="">All Positions</option>
                <option *ngFor="let position of positions" [value]="position">
                  {{ position }}
                </option>
              </select>

              <select
                [(ngModel)]="supervisorFilter"
                (change)="applyFilter()"
                class="${TW_INPUT} ml-2 appearance-none pr-5"
              >
                <option value="">All Supervisors</option>
                <option value="true">Supervisors</option>
                <option value="false">Non-Supervisors</option>
              </select>

              <button
                class="ml-4 ${TW_BUTTON} ${TW_BUTTON_CUSTOM} flex items-center"
                (click)="openAddUserModal()"
              >
                <i-lucide [img]="Plus" class="w-4 h-4"></i-lucide>
                Add User
              </button>
            </div>
          </div>

          <div *ngIf="isLoading; else dataContent">
            <app-table-skeleton></app-table-skeleton>
          </div>

          <ng-template #dataContent>
            <div class="overflow-x-auto bg-white rounded-lg ${TW_BORDER} mt-4">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-muted text-muted-foreground">
                  <tr class="uppercase">
                    <th class="p-4 text-left">User Name</th>
                    <th class="p-4 text-left">Role</th>
                    <th class="p-4 text-left">Position</th>
                    <th class="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    *ngFor="let user of getPaginatedUsers()"
                    
                    class="${TW_TABLE_ROW}"
                  >
                  <td class="p-4 flex items-center space-x-4" >

                      <input type="checkbox" class="mr-2" />

                      <img
                        *ngIf="user"
                        src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                        alt="avatar"
                        class="cursor-pointer inline-block relative object-cover object-center !rounded-full w-10 h-10 border border-slate-400 p-0"
                        (click)="openSheet(user)"
                      />

                      <div *ngIf="user" class="cursor-pointer">
                        <span class="block font-bold">{{ user.name }}</span>
                        <span class="block text-sm text-muted-foreground">{{
                          user.email
                        }}</span>
                      </div>

                      <div></div>
                    </td>
                    <td class="p-4 space-x-1">
                      <span
                        class="${TW_BADGE}"
                        [class.bg-blue-900]="user.isActive"
                        [class.bg-yellow-500]="!user.isActive"
                      >
                        {{ user.isActive ? 'Active' : 'Inactive' }}
                      </span>

                      <span
                        class="${TW_BADGE_2}"
                        [class.bg-violet-500]="user.isSupervisor"
                        [class.bg-cyan-500]="!user.isSupervisor"
                      >
                        {{ user.isSupervisor ? 'Supervisor' : 'Employee' }}
                      </span>
                    </td>

                    <td class="p-4">{{ user.position }}</td>
                    <!-- <td class="p-4">{{ user.isSupervisor }}</td> -->
                    <td class="p-4">
                      <button
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                        (click)="openEditUserModal(user)"
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
          </ng-template>

          <app-sheets *ngIf="isSheetOpen" [user]="selectedUser" (closeSheet)="closeSheet()"></app-sheets>

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
        <div class="flex justify-between">
          <span class="text-muted-foreground">
            Showing {{ startItem }} to {{ endItem }} of
            {{ filteredUsers.length }} users
          </span>
          <div class="flex space-x-2">
            <button
              class="${TW_BUTTON} ${TW_BUTTON_MUTED}"
              (click)="currentPage = currentPage - 1"
              [disabled]="currentPage === 1"
            >
              <i-lucide
                [img]="ChevronLeft"
                class="w-7 h-7 hover:text-blue-900 hover:bg-gray-200 hover:rounded-md"
              ></i-lucide>
            </button>
            <button
              class="${TW_BUTTON} ${TW_BUTTON_MUTED}"
              (click)="currentPage = currentPage + 1"
              [disabled]="currentPage * itemsPerPage >= filteredUsers.length"
            >
              <i-lucide
                [img]="ChevronRight"
                class="w-7 h-7  hover:text-blue-900 hover:bg-gray-200 hover:rounded-md"
              ></i-lucide>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  isSheetOpen = false;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Edit = Edit;
  readonly Trash = Trash;
  readonly Plus = Plus;

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
    };

    this.users.push(createdUser);
    this.filteredUsers = [...this.users];
    this.isModalVisible = false;
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

  openSheet(user: UserRecord): void {
    this.selectedUser = user;
    this.isSheetOpen = true;
    console.log(`Opening sheet for user with ID: ${user.id}`);
  }
}
