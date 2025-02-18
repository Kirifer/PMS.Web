import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full" [ngClass]="bgColor">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="icon" />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-500 uppercase">{{ title }}</p>
          <p class="text-2xl font-semibold text-gray-700">{{ count }}</p>
        </div>
      </div>
    </div>
  `,
  
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() count!: number;
  @Input() bgColor!: string;
  @Input() icon!: string;
}