import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isVisible"
      class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg transition-all duration-300 transform"
      [ngClass]="{
        'translate-x-4': !isVisible,
        'opacity-100': isVisible,
        'opacity-0': !isVisible
      }"
    >
      <p>{{ message }}</p>
    </div>
  `,
  styles: `
  .toast-enter {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-leave {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
`,
})
export class ToastComponent {
  isVisible: boolean = false;
  message: string = '';

  show(message: string): void {
    this.message = message;
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000); // Toast disappears after 3 seconds
  }
}
