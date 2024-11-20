import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailedComponent } from '../user-detailed/user-detailed.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserDetailedComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  isModalVisible = false;
  selectedUser = { name: '', email: '', position: '' };

  openProfile(name: string, email: string, position: string): void {
    this.selectedUser = { name, email, position };
    this.isModalVisible = true;
  }

  closeProfile(): void {
    this.isModalVisible = false;
  }
}
