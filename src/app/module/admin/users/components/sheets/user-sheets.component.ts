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
import { LucideAngularModule, X } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserRecord } from '../../user.interface';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-sheets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    LucideAngularModule,
    MatDialogModule,
  ],
  template: `
    <div
      *ngIf="isSheetOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center backdrop-blur-sm z-50"
    >
      <div
        #sheetContainer
        class="bg-white w-full max-w-md h-full transform transition-transform duration-300 ease-in-out shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">User Profile</h2>
          <button
            (click)="closeSheetHandler()"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <lucide-icon [name]="X" class="w-5 h-5"></lucide-icon>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Profile Picture -->
          <div class="flex justify-center">
            <div class="relative">
              <div class="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100">
                <img
                  class="w-full h-full object-cover"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="Profile Picture"
                />
              </div>
              <div 
                class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white"
                [ngClass]="{
                  'bg-green-500': user?.isActive,
                  'bg-gray-400': !user?.isActive
                }"
              ></div>
            </div>
          </div>

          <!-- User Info -->
          <div class="text-center">
            <h3 class="text-xl font-bold text-gray-900">{{ user?.name }}</h3>
            <p class="text-gray-600 mt-1">{{ user?.email }}</p>
          </div>

          <!-- Status Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Status</span>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  [ngClass]="{
                    'bg-green-100 text-green-800': user?.isActive,
                    'bg-yellow-100 text-yellow-800': !user?.isActive
                  }"
                >
                  {{ user?.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
            
            <div class="bg-gray-50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Role</span>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  [ngClass]="{
                    'bg-purple-100 text-purple-800': user?.isSupervisor,
                    'bg-blue-100 text-blue-800': !user?.isSupervisor
                  }"
                >
                  {{ user?.isSupervisor ? 'Supervisor' : 'Employee' }}
                </span>
              </div>
            </div>
          </div>

          <!-- User Details -->
          <div class="space-y-4">
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Position</span>
                <span class="text-sm text-gray-900 font-medium">{{ user?.position }}</span>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Member Since</span>
                <span class="text-sm text-gray-900">{{ user?.dateCreated || 'N/A' }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-gray-200">
            <button
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
            >
              Edit Profile
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

  readonly X = X;

  isLoading = false;
  users: UserRecord[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.isSheetOpen &&
      !this.sheetContainer.nativeElement.contains(event.target)
    ) {
      this.closeSheetHandler();
    }
  }

  openSheet(user: UserRecord): void {
    this.isSheetOpen = true;
    this.user = user;
  }

  closeSheetHandler(): void {
    this.user = null;
    this.isSheetOpen = false;
    this.closeSheet.emit();
  }

  fetchUsers(): void {
    this.isLoading = true;

    // Assuming you have a user ID to fetch the details
    const userId = 1; // Replace with the actual user ID you want to fetch

    this.http
      .get<{ data: UserRecord[] }>(
        `https://localhost:7012/lookup/users/${userId}`
      )
      .subscribe({
        next: (response) => {
          if (
            response &&
            Array.isArray(response.data) &&
            response.data.length > 0
          ) {
            const user = response.data[0]; // Extract the first user from the array
            console.log('API Response:', user);

            if (user) {
              this.openSheet(user);
            }

            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          } else {
            // If no user is found, close the sheet
            this.closeSheetHandler();
          }
        },
        error: (err) => {
          console.error('Error Fetching User:', err);
          this.isLoading = false;
          // Close the sheet in case of error
          this.closeSheetHandler();
        },
      });
  }
}
