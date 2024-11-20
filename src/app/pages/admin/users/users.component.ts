import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailedComponent } from '../user-detailed/user-detailed.component';
import { AddUserComponent } from '../../../components/add-user/add-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserDetailedComponent, AddUserComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  isModalAddUserVisible = false;  // Flag for Add User Modal visibility
  isModalVisible = false;  // Flag for user profile modal visibility

  // Open Add User modal
  openAddUserModal(): void {
    this.isModalAddUserVisible = true;
  }

  // Close Add User modal
  closeAddUserModal(): void {
    this.isModalAddUserVisible = false;
  }

  // Open user profile modal
  openProfile(name: string, email: string, position: string): void {
    // logic to open profile modal
    this.isModalVisible = true;
  }

  // Close user profile modal
  closeProfile(): void {
    this.isModalVisible = false;
  }
}
