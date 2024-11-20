import { Component, Input, HostListener, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  constructor(private elementRef: ElementRef, private router: Router) {}

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  showNotif = false;
  showAccount = false;

  @ViewChild('notifContainer') notifContainer!: ElementRef;
  @ViewChild('accountContainer') accountContainer!: ElementRef;

// Toggle the notification pop-up on click
toggleNotif(event: Event) {
  event.stopPropagation(); // Prevent the click event from bubbling up to document
  this.showNotif = !this.showNotif;
  this.showAccount = false; // Close account pop-up if open
}

// Toggle the account pop-up on click
toggleAccount(event: Event) {
  event.stopPropagation(); // Prevent the click event from bubbling up to document
  this.showAccount = !this.showAccount;
  this.showNotif = false; // Close notification pop-up if open
}

// Close pop-ups when clicking outside
@HostListener('document:click', ['$event'])
closePopups(event: Event) {
  const clickedInsideNotif = this.notifContainer.nativeElement.contains(event.target);
  const clickedInsideAccount = this.accountContainer.nativeElement.contains(event.target);

  // Close both pop-ups only if the click is outside both notification and account containers
  if (!clickedInsideNotif && !clickedInsideAccount) {
    this.showNotif = false;
    this.showAccount = false;
  }
}

  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass;

  }

  openAccountSettings(){
    console.log('Open Account Settings');
  }

  logout(){
    console.log('Logout');
    this.router.navigate(['/login']);
  }

}
