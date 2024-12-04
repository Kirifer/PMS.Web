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
import { LucideAngularModule, X } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserRecord } from '../../user.interface';
import { EditUserComponent } from "../edit-user/edit-user.component";

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
    <!-- List of users -->
    <div class="user-list">
      <div *ngFor="let user of users" (click)="openSheet(user)" class="user-item cursor-pointer">
        <p>{{ user.name }}</p>
      </div>
    </div>

    <!-- Sheet Profile Card -->
    <div *ngIf="isSheetOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end items-center backdrop-blur-sm">
      <div #sheetContainer class="bg-white p-6 shadow-lg w-2/5 h-full transform transition-transform duration-500 ease-in-out translate-x-0">
        <!-- Sheet content -->
        <div class="mt-4 text-right">
          <button (click)="closeSheetHandler()" class="px-4 py-2  text-white rounded-md hover:bg-blue-600 flex items-center ml-auto">
            <lucide-icon [name]="X" class="w-5 h-5 text-black ml-auto"></lucide-icon>
          </button>
        </div>

        <!-- Profile Picture -->
        <div class="flex justify-center items-center">
          <div class="rounded-full p-[5px] bg-gradient-to-r from-blue-500 to-purple-500">
            <div class="rounded-full border-4 border-white p-1">
              <div class="rounded-full overflow-hidden">
                <img class="w-32 h-32" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="Profile Picture" />
              </div>
            </div>
          </div>
        </div>

        <!-- Name and Email -->
        <div class="text-center">
          <h1 class="text-xl font-bold text-gray-900">{{ user?.name }}</h1>
          <p class="text-sm text-gray-600">{{ user?.email }}</p>
        </div>

        <!-- Edit Button -->
        <div class="flex justify-center mt-4">
          <button class="bg-blue-900 text-white hover:bg-blue-700 py-2 px-6 rounded-full transition duration-200">
            Edit Profile
          </button>
        </div>

        <!-- Position, Status, and Role -->
        <div class="divide-y divide-gray-200 mt-6">
          <div class="flex justify-between py-2">
            <span class="text-gray-500">Position</span>
            <span class="text-gray-900 font-medium">{{ user?.position }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-500">Status</span>
            <span class="px-2 py-1 rounded-full" [class.bg-green-500]="user?.isActive" [class.bg-gray-400]="!user?.isActive">
              {{ user?.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-500">Role</span>
            <span class="px-2 py-1 rounded-full" [class.bg-violet-500]="user?.isSupervisor" [class.bg-gray-500]="!user?.isSupervisor">
              {{ user?.isSupervisor ? 'Supervisor' : 'Non-Supervisor' }}
            </span>
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

    this.http.get<{ data: UserRecord[] }>('https://localhost:7012/lookup/users').subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.users = response.data
            .filter((user) => !user.is_deleted)
            .map((user) => ({
              ...user,
              name: `${user.firstName} ${user.lastName}`,
            }));
          console.log('API Response:', response.data);

          if (this.users.length > 0) {
            this.openSheet(this.users[0]);
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