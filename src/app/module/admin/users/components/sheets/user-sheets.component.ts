// sheets.component.ts
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserRecord } from '../../user.interface';

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  template: `
    <div class="flex justify-center items-center min-h-screen">
      <!-- Sheet Content -->
      <div
        *ngIf="isSheetOpen"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end items-center"
      >
        <div
          #sheetContainer
          class="bg-white p-6 shadow-lg w-120 h-full transform transition-transform duration-500 ease-in-out translate-x-0"
        >
          <div class="mb-4">
            <h1 class="font-semibold text-gray-900">User Profile</h1>
            <p class="text-gray-600">View profile details of an employee</p>
          </div>

          <!-- User Profile Details -->
          <div *ngIf="user" class=" divide-y divide-gray-100 space-y-4">
            <div class="flex items-center justify-center">
              <!-- Center the image -->
              <img
                class="w-32 h-32 rounded-full"
                src="https://placehold.co/160x160"
                alt="Profile Picture"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-2">
              <label class="text-right text-black-700 center">Name</label>
              <span class="font-bold col-span-5">{{ user.name }}</span>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-gray-700">Email</label>
              <span class="text-sm text-gray-500 col-span-3">{{
                user.email
              }}</span>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-gray-700">Position</label>
              <span class="text-sm text-gray-500 col-span-3">{{
                user.position
              }}</span>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-gray-700">Status</label>
              <span
                class="px-2 py-1 rounded-full text-white"
                [class.bg-green-500]="user.isActive"
                [class.bg-gray-500]="!user.isActive"
              >
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-gray-700">Role</label>
              <span
                class="px-2 py-1 rounded-full text-white"
                [class.bg-violet-500]="user.isSupervisor"
                [class.bg-gray-500]="!user.isSupervisor"
                [class.text-black]="!user.isSupervisor"
              >
                {{ user.isSupervisor ? 'Supervisor' : 'Non-Supervisor' }}
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-4 text-right">
            <button
              (click)="closeSheetHandler()"
              class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SheetsComponent implements OnInit {
  @Input() user: UserRecord | null = null;
  @Input() isSheetOpen = false;
  @Output() closeSheet = new EventEmitter<void>();
  @ViewChild('sheetContainer') sheetContainer!: ElementRef;

  isLoading = false;
  users: UserRecord[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    // Check if the click is outside the sheet container
    if (
      this.isSheetOpen &&
      !this.sheetContainer.nativeElement.contains(event.target)
    ) {
      this.closeSheetHandler();
    }
  }

  openSheet(): void {
    if (this.users.length > 0) {
      this.isSheetOpen = true;
      this.user = this.users[0];
    }
  }

  closeSheetHandler(): void {
    this.closeSheet.emit();
  }

  fetchUsers(): void {
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

            // Ensure sheet can open after users are loaded
            if (this.users.length > 0) {
              this.openSheet();
            }

            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          }
        },
        error: (err) => {
          console.error('Error Fetching Users:', err);
          this.isLoading = false;
        },
      });
  }
}
