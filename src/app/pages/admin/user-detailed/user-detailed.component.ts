import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-detailed',
  standalone: true,
  imports: [],
  templateUrl: './user-detailed.component.html',
  styleUrl: './user-detailed.component.css'
})
export class UserDetailedComponent {
  @Output() close = new EventEmitter<void>();

  closeProfile() {
    this.close.emit(); 
  }

}
