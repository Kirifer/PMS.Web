import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
  
  <div class="animate-pulse">
  <!-- Skeleton Header -->
  <!-- <div class="flex justify-between items-center mb-6">
    <div class="w-40 h-10 bg-gray-300 rounded-lg shadow-sm"></div>
    <div class="flex items-center gap-4">
      <div class="w-32 h-8 bg-gray-300 rounded-lg shadow-sm"></div>
      <div class="w-32 h-8 bg-gray-300 rounded-lg shadow-sm"></div>
      <div class="w-28 h-8 bg-gray-300 rounded-lg shadow-sm"></div>
    </div>
  </div> -->

  <div class="overflow-x-auto bg-[rgba(0,0,0,0)]  rounded-lg ">
    <!-- Table Header Skeleton -->
    <div class=" divide-y divide-gray-200">
      <!-- <div class="flex items-center px-6 py-4"> -->
      <!-- <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div>
      <div class="h-8 bg-gray-300 rounded flex-grow mx-2"></div> -->
      <!-- </div> -->

      <!-- Table Rows Skeleton -->
      <div class="bg-[rgba(0,0,0,0)] divide-y ">
        <div *ngFor="let _ of [1, 2, 3]" class="flex items-center px-6 py-4">
          <div class="w-full h-6 bg-gray-300 rounded mx-2"></div>
        </div>
      </div>
    </div>
  </div>
</div>



  `,
  styles: ``
})
export class TableSkeletonComponent {

}
