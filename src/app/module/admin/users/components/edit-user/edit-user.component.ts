import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserRecord } from '../../user.interface';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Edit User</h2>
        <form (ngSubmit)="saveChanges()">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              [(ngModel)]="editableUser!.firstName"
              name="firstName"
              class="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              [(ngModel)]="editableUser!.lastName"
              name="lastName"
              class="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              [(ngModel)]="editableUser!.email"
              name="email"
              class="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Position</label>
            <input
              type="text"
              [(ngModel)]="editableUser!.position"
              name="position"
              class="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              (click)="cancelEdit()"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              [disabled]="isUpdating"
            >
              Save
            </button>
          </div>
        </form>
        <div *ngIf="errorMessage" class="text-red-500 text-sm mt-4">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
})
export class EditUserComponent implements OnInit {
  @Input() user: UserRecord | null = null;
  @Output() userUpdated = new EventEmitter<UserRecord>();
  @Output() reloadUsers = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  editableUser: UserRecord | null = null;
  isUpdating: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.user) {
      this.editableUser = { ...this.user };
    }
  }

  saveChanges() {
    if (this.editableUser) {
      // Extract only the fields that should be updated
      const updatedUserPayload = {
        firstName: this.editableUser.firstName,
        lastName: this.editableUser.lastName,
        email: this.editableUser.email,
        position: this.editableUser.position,
        isSupervisor: this.editableUser.isSupervisor,
      };
  
      this.isUpdating = true;
      this.http
        .put<UserRecord>(
          `https://localhost:7012/users/${this.editableUser.id}`,
          updatedUserPayload
        )
        .subscribe({
          next: (updatedUser) => {
            this.isUpdating = false;
            this.userUpdated.emit(updatedUser);
            this.reloadUsers.emit();
          },
          error: (err) => {
            this.isUpdating = false;
            this.errorMessage = 'Failed to update the user. Please try again.';
            console.error('Error updating user:', err);
          },
        });
    }
  }
  

  cancelEdit() {
    this.cancel.emit();
  }
}
