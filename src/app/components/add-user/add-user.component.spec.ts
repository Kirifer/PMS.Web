import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() close = new EventEmitter<void>(); // Emit event to close modal
  @Output() addUser = new EventEmitter<any>(); // Emit event to add a new user

  onCancel() {
    this.close.emit(); // Notify parent to close the modal
  }

  onAddUser() {
    // Collect input values for user creation
    const newUser = {
      firstName: '',
      lastName: '',
      email: '',
      position: ''
    };
    this.addUser.emit(newUser); // Notify parent with new user details
  }
}
