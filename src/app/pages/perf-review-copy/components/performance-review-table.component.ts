import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddPerformanceReviewComponent } from './add-performance-review.component';

interface PerformanceRecord {
  id: string;
  name: string;
  departmentType: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  employeeId: string;
  supervisorId: string;
  isActive: Boolean;
  isDeleted: Boolean;
  goals: Goal[];
  competencies: Competency[];
}

interface Goal {
  id: string;
  orderNo: number;
  goals: string;
  weight: number;
  date: string;
  measure4: string;
  measure3: string;
  measure2: string;
  measure1: string;
}

interface Competency {
  competencyId: string;
  competency: CompetencyDetails;
  weight: number;
  orderNo: number;
}

interface CompetencyDetails {
  id: string;
  competency: string;
  level: string;
  description: string;
  isActive: boolean;
}



@Component({
  selector: 'app-performance-review-table',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    LucideAngularModule,
    HttpClientModule,
    CommonModule,
    AddPerformanceReviewComponent, 
  ],
  template: `<div class="flex justify-between items-center mb-6">
  <input
    matInput
    (keyup)="applyFilter($event)"
    placeholder="Search records"
    #input
    class="px-4 py-2 border rounded-lg shadow-sm flex-grow mr-4"
  />
  <!-- Add Record Button -->
  <button
    class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    (click)="openAddUserForm()"
  >
    Add Record
  </button>
</div>

<!-- Competencies -->
<!-- <div *ngIf="competencies.length > 0">
  <h2>Competencies</h2>
  <ul>
    <li *ngFor="let competency of competencies">
      {{ competency }}
    </li>
  </ul>
</div>
<div *ngIf="competencies.length === 0">
  <p>No competencies available.</p>
</div> -->

<!-- Performance Reviews -->
<!-- <div *ngFor="let record of performanceReviews">
  <div>
    <h2>{{ record.name }} - {{ record.departmentType }}</h2>
    <p>Start Year: {{ record.startYear }} - End Year: {{ record.endYear }}</p>
    <p>Start Date: {{ record.startDate }} - End Date: {{ record.endDate }}</p>
    <p>Employee ID: {{ record.employeeId }} - Supervisor ID: {{ record.supervisorId }}</p>
    <p>Status: {{ record.isActive ? 'Active' : 'Inactive' }}</p>
  </div>

  <div *ngIf="record.goals.length > 0">
    <h3>Goals</h3>
    <table>
      <thead>
        <tr>
          <th>Order No</th>
          <th>Goal</th>
          <th>Weight</th>
          <th>Date</th>
          <th>Measure 1</th>
          <th>Measure 2</th>
          <th>Measure 3</th>
          <th>Measure 4</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let goal of record.goals">
          <td>{{ goal.orderNo }}</td>
          <td>{{ goal.goals }}</td>
          <td>{{ goal.weight }}</td>
          <td>{{ goal.date }}</td>
          <td>{{ goal.measure1 }}</td>
          <td>{{ goal.measure2 }}</td>
          <td>{{ goal.measure3 }}</td>
          <td>{{ goal.measure4 }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div *ngIf="record.competencies.length > 0">
    <h3>Competencies</h3>
    <table>
      <thead>
        <tr>
          <th>Order No</th>
          <th>Competency</th>
          <th>Level</th>
          <th>Description</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let competency of record.competencies">
          <td>{{ competency.orderNo }}</td>
          <td>{{ competency.competency.competency }}</td>
          <td>{{ competency.competency.level }}</td>
          <td>{{ competency.competency.description }}</td>
          <td>{{ competency.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div> -->

<!-- Add User Form -->
<div *ngIf="isAddFormVisible" class="mb-4">
  <form [formGroup]="addUserForm" (ngSubmit)="addRecord()">
    <div class="mb-2">
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        formControlName="name"
        id="name"
        type="text"
        class="mt-1 p-2 border rounded-lg"
      />
    </div>
    <div class="mb-2">
      <label
        for="departmentType"
        class="block text-sm font-medium text-gray-700"
        >Department Type</label
      >
      <input
        formControlName="departmentType"
        id="departmentType"
        type="text"
        class="mt-1 p-2 border rounded-lg"
      />
    </div>
    <div class="mb-2">
      <label for="startYear" class="block text-sm font-medium text-gray-700"
        >Start Year</label
      >
      <input
        formControlName="startYear"
        id="startYear"
        type="number"
        class="mt-1 p-2 border rounded-lg"
      />
    </div>
    <div class="mb-2">
      <label for="endYear" class="block text-sm font-medium text-gray-700"
        >End Year</label
      >
      <input
        formControlName="endYear"
        id="endYear"
        type="number"
        class="mt-1 p-2 border rounded-lg"
      />
    </div>
    <!-- Add Competencies -->
    <div class="mb-2">
      <label for="competencies" class="block text-sm font-medium text-gray-700"
        >Competencies (ID)</label
      >
      <input
        formControlName="competencies"
        id="competencies"
        type="text"
        class="mt-1 p-2 border rounded-lg"
        placeholder="Enter competency ID"
      />
    </div>
    <!-- Add Goals -->
    <div class="mb-2">
      <label for="goals" class="block text-sm font-medium text-gray-700"
        >Goals</label
      >
      <input
        formControlName="goals"
        id="goals"
        type="text"
        class="mt-1 p-2 border rounded-lg"
        placeholder="Enter goal details"
      />
    </div>

    <button
      type="submit"
      class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
    >
      Add Record
    </button>
  </form>
</div>

<!-- EditForm -->
<div *ngIf="isEditFormVisible" class="mb-4">
  <form [formGroup]="editUserForm" (ngSubmit)="editRecord(record)">
    <div class="mb-2">
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input formControlName="name" id="name" type="text" class="mt-1 p-2 border rounded-lg" />
    </div>
    <div class="mb-2">
      <label for="departmentType" class="block text-sm font-medium text-gray-700">Department Type</label>
      <input formControlName="departmentType" id="departmentType" type="text" class="mt-1 p-2 border rounded-lg" />
    </div>
    <div class="mb-2">
      <label for="startYear" class="block text-sm font-medium text-gray-700">Start Year</label>
      <input formControlName="startYear" id="startYear" type="number" class="mt-1 p-2 border rounded-lg" />
    </div>
    <div class="mb-2">
      <label for="endYear" class="block text-sm font-medium text-gray-700">End Year</label>
      <input formControlName="endYear" id="endYear" type="number" class="mt-1 p-2 border rounded-lg" />
    </div>

    <!-- Competency Section -->
    <div *ngIf="competencies && competencies.length > 0" class="mb-4">
      <h3 class="text-lg font-semibold">Competency</h3>
      <div formArrayName="competencies">
        <div *ngFor="let competency of competencies.controls; let i = index" [formGroupName]="i" class="mb-4">
          <div class="mb-2">
            <label for="competencyName{{i}}" class="block text-sm font-medium text-gray-700">Competency Name</label>
            <input formControlName="competency" id="competencyName{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter competency name" />
          </div>

          <div class="mb-2">
            <label for="competencyLevel{{i}}" class="block text-sm font-medium text-gray-700">Competency Level</label>
            <input formControlName="level" id="competencyLevel{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter competency level" />
          </div>

          <div class="mb-2">
            <label for="competencyDescription{{i}}" class="block text-sm font-medium text-gray-700">Competency Description</label>
            <input formControlName="description" id="competencyDescription{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter competency description" />
          </div>

          <div class="mb-2">
            <label for="competencyWeight{{i}}" class="block text-sm font-medium text-gray-700">Competency Weight</label>
            <input formControlName="weight" id="competencyWeight{{i}}" type="number" class="mt-1 p-2 border rounded-lg" placeholder="Enter competency weight" />
          </div>
        </div>
      </div>
    </div>

    <!-- Goals Section -->
    <div *ngIf="goals && goals.length > 0" class="mb-4">
      <h3 class="text-lg font-semibold">Goals</h3>
      <div formArrayName="goals">
        <div *ngFor="let goal of goals.controls; let i = index" [formGroupName]="i" class="mb-4">
          <div class="mb-2">
            <label for="goalOrderNo{{i}}" class="block text-sm font-medium text-gray-700">Order No</label>
            <input formControlName="orderNo" id="goalOrderNo{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter order number" />
          </div>

          <div class="mb-2">
            <label for="goalDescription{{i}}" class="block text-sm font-medium text-gray-700">Goal Description</label>
            <input formControlName="goals" id="goalDescription{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter goal description" />
          </div>

          <div class="mb-2">
            <label for="goalWeight{{i}}" class="block text-sm font-medium text-gray-700">Goal Weight</label>
            <input formControlName="weight" id="goalWeight{{i}}" type="number" class="mt-1 p-2 border rounded-lg" placeholder="Enter goal weight" />
          </div>

          <div class="mb-2">
            <label for="goalDate{{i}}" class="block text-sm font-medium text-gray-700">Goal Date</label>
            <input formControlName="date" id="goalDate{{i}}" type="date" class="mt-1 p-2 border rounded-lg" />
          </div>

          <div class="mb-2">
            <label for="measure1{{i}}" class="block text-sm font-medium text-gray-700">Measure 1</label>
            <input formControlName="measure1" id="measure1{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter measure 1" />
          </div>

          <div class="mb-2">
            <label for="measure2{{i}}" class="block text-sm font-medium text-gray-700">Measure 2</label>
            <input formControlName="measure2" id="measure2{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter measure 2" />
          </div>

          <div class="mb-2">
            <label for="measure3{{i}}" class="block text-sm font-medium text-gray-700">Measure 3</label>
            <input formControlName="measure3" id="measure3{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter measure 3" />
          </div>

          <div class="mb-2">
            <label for="measure4{{i}}" class="block text-sm font-medium text-gray-700">Measure 4</label>
            <input formControlName="measure4" id="measure4{{i}}" type="text" class="mt-1 p-2 border rounded-lg" placeholder="Enter measure 4" />
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
      Update Record
    </button>
  </form>
</div>

<!-- HEADER -->
<div class="overflow-x-auto bg-white rounded-lg shadow-lg">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          *ngFor="let header of headers"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr *ngFor="let record of performanceReviews">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.id }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.departmentType }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.startYear }} - {{ record.endYear }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.startDate }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.endDate }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {{ record.supervisorId }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button class="text-indigo-600 hover:text-indigo-900 mr-3" (click)="openEditForm(record)">
            <i-lucide [img]="Edit" class="w-5 h-5" ></i-lucide>
          </button>
          <button
            class="text-red-600 hover:text-red-900"
            (click)="deleteRecord(record.id)"
          >
            <i-lucide [img]="Trash" class="w-5 h-5"></i-lucide>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-6">
    <button
      (click)="openDialog()"
      class="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
    >
      Open Dialog
    </button>
  </div>
  <app-add-performance-review
    *ngIf="isDialogOpen"
    (close)="closeDialog()"
  />
</div>
`,
})
export class PerformanceReviewTableComponent implements OnInit {
  
  // VARIABLES
  performanceReviews: PerformanceRecord[] = [];
  allPerformanceReviews: PerformanceRecord[] = [];
  http = inject(HttpClient);
  addUserForm: FormGroup; 
  isAddFormVisible = false; 
  competenciesvariable: any[] = []; 
  editUserForm: FormGroup; 
  isEditFormVisible = false; 
  performanceReviews$ = this.getPerformanceReviews();
  currentRecord: PerformanceRecord | null = null;
  record: PerformanceRecord;

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      competencies: [[], Validators.required],
      goals: ['', Validators.required], 
    });
  
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      departmentType: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
      competencies: this.fb.array([]),
      goals: this.fb.array([])  
    });
    
    this.record = {
      id: '1',
      name: 'John Doe',
      departmentType: 'Engineering',
      startYear: 2020,
      endYear: 2025,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      employeeId: 'some-employee-id',
      supervisorId: 'some-supervisor-id',
      isActive: true,
      isDeleted: false,
      goals: [],  // Populate as needed
      competencies: []  // Populate as needed
    };
  }

  get competencies(): FormArray {
    return this.editUserForm.get('competencies') as FormArray;
  }

  get goals(): FormArray {
    return this.editUserForm.get('goals') as FormArray;
  }

  setCompetencies(): void {
    const competenciesControl = this.editUserForm.get('competencies') as FormArray;
    this.record.competencies.forEach(competency => {
      competenciesControl.push(this.fb.group({
        competency: [competency.competency.competency, Validators.required],
        level: [competency.competency.level, Validators.required],
        description: [competency.competency.description, Validators.required],
        weight: [competency.weight, Validators.required]
      }));
    });
  }

  // SEARCH FUNCTION
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue) {
      this.performanceReviews = this.allPerformanceReviews.filter((record) =>
        Object.values(record).join(' ').toLowerCase().includes(filterValue)
      );
    } else {
      this.performanceReviews = [...this.allPerformanceReviews];
    }
  }

  // INITIALIZERS
  ngOnInit() {
    this.performanceReviews$.subscribe(
      (data: any) => {
        if (data && data.data) {
          this.performanceReviews = data.data;
          this.allPerformanceReviews = [...this.performanceReviews];
          console.log('Performance Review Data:', this.performanceReviews[0].competencies[0].competency.id);
          this.doSomethingWithPerformanceReviews();
        }
      },
      (error) => {
        console.error('Error fetching performance reviews:', error);
      }
    );
  
    this.getCompetencies();
    this.getPerformanceReviews();
    this.setCompetencies();

  }
  doSomethingWithPerformanceReviews() {
    // console.log('Using performance reviews:', this.performanceReviews);
  }

  // GET METHODS
  
  private getCompetencies(): void {
    this.http.get<any>('https://localhost:7012/lookup/competencies').subscribe(
      (competencyData) => {
        if (competencyData && competencyData.data) {
          // Assuming each competency object contains 'id' or 'uuid' as the identifier
          this.competenciesvariable = competencyData.data.map((competency: { id: string }) => competency.id); 
          // console.log('Competency IDs:', this.competenciesvariable);
        }
      },
      (error) => {
        console.error('Error fetching competencies:', error);
      }
    );
  }

  private getPerformanceReviews(): Observable<any> {
    return this.http.get<any>('https://localhost:7012/performance-reviews');
  }
  
  // BUTTON FUNCITONS
  editRecord(record: PerformanceRecord) {
  if (this.editUserForm.valid) {
    const updatedRecord = this.editUserForm.value;

    // Find the index of the record to be updated
    const index = this.performanceReviews.findIndex(r => r.id === record.id);

    if (index !== -1) {
      // Prepare the updated performance review data
      const updatedPerformanceReview = {
        ...this.performanceReviews[index],
        ...updatedRecord,
        competencies: updatedRecord.competencies.map((comp: any) => ({
          competencyId: comp.competencyId || this.performanceReviews[index].competencies[0].competency.id,  // Preserve existing competencyId
          competency: {
            id: comp.competencyId || this.performanceReviews[index].competencies[0].competency.id,  // Preserve existing competency ID
            competency: comp.competency || this.performanceReviews[index].competencies[0].competency,  // Preserve existing competency name
            level: comp.level || this.performanceReviews[index].competencies[0].competency.level,  // Preserve existing level
            description: comp.description || this.performanceReviews[index].competencies[0].competency.description,  // Preserve existing description
            isActive: comp.isActive !== undefined ? comp.isActive : this.performanceReviews[index].competencies[0].competency.isActive, // Preserve existing isActive status
          },
          orderNo: comp.orderNo || this.performanceReviews[index].competencies[0].orderNo,  // Preserve existing orderNo
          weight: comp.weight || this.performanceReviews[index].competencies[0].weight,  // Preserve existing weight
        })),
        goals: updatedRecord.goals.map((goal: any) => ({
          id: goal.id || this.performanceReviews[index].goals[0].id,  // Preserve existing goal ID
          orderNo: goal.orderNo || this.performanceReviews[index].goals[0].orderNo,  // Preserve existing orderNo
          goals: goal.goals || this.performanceReviews[index].goals[0].goals,  // Preserve existing goal text
          weight: goal.weight || this.performanceReviews[index].goals[0].weight,  // Preserve existing weight
          date: goal.date || this.performanceReviews[index].goals[0].date,  // Preserve existing date
          measure1: goal.measure1 || this.performanceReviews[index].goals[0].measure1,  // Preserve existing measure1
          measure2: goal.measure2 || this.performanceReviews[index].goals[0].measure2,  // Preserve existing measure2
          measure3: goal.measure3 || this.performanceReviews[index].goals[0].measure3,  // Preserve existing measure3
          measure4: goal.measure4 || this.performanceReviews[index].goals[0].measure4,  // Preserve existing measure4
        }))
      };

      // Log the updated performance review before sending
      console.log('Updated Performance Review:', updatedPerformanceReview);

      // Send the updated record to the backend using PUT request
      this.http.put<any>(`https://localhost:7012/performance-reviews/${record.id}`, {
        id: updatedPerformanceReview.id,
        name: updatedPerformanceReview.name,
        departmentType: updatedPerformanceReview.departmentType,
        startYear: updatedPerformanceReview.startYear,
        endYear: updatedPerformanceReview.endYear,
        startDate: updatedPerformanceReview.startDate,
        endDate: updatedPerformanceReview.endDate,
        employeeId: updatedPerformanceReview.employeeId,
        supervisorId: updatedPerformanceReview.supervisorId,
        goals: updatedPerformanceReview.goals,
        competencies: updatedPerformanceReview.competencies
      })
      .subscribe({
        next: (response) => {
          // Update the local performanceReviews array
          this.allPerformanceReviews[index] = { ...updatedPerformanceReview };
          this.isEditFormVisible = false;  // Close the form
        },
        error: (err) => {
          console.error('Error updating record:', err);
          alert('Failed to update the record. Please try again.');
        },
      });
    }
  } else {
    alert('Please fill out all required fields.');
  }
}

  

  addRecord() {
    if (this.addUserForm.valid) {
      const newRecord = this.addUserForm.value;
      console.log('Form Data being sent:', newRecord);
  
      // Declare competencies and goals using the existing interfaces
      const competencies: Competency[] = [
        {
          competencyId: newRecord.competencies,
          orderNo: 1,
          weight: 5,
          competency: {
            id: 'some-id',  // Replace with actual ID from form or elsewhere
            description: 'Competency description',  // Replace with actual description
            competency: 'Competency name',  // Replace with actual name
            level: 'Level 1',  // Replace with the level (can be from form data or predefined)
            isActive: true,  // Set as needed
          },
        },
      ];
  
      const goals: Goal[] = [
        {
          id: 'some-id', // Replace with actual ID or generate it
          orderNo: 1,
          goals: newRecord.goals,
          weight: 10,
          date: new Date().toISOString().split('T')[0],  // Set the date dynamically
          measure1: 'string',  // Replace with actual measure
          measure2: 'string',  // Replace with actual measure
          measure3: 'string',  // Replace with actual measure
          measure4: 'string',  // Replace with actual measure
        },
      ];
  
      // Use the existing PerformanceRecord interface directly
      const performanceData: PerformanceRecord = {
        id: 'new-id', // Placeholder ID, use the actual ID if available
        name: newRecord.name,
        departmentType: newRecord.departmentType,
        startYear: newRecord.startYear,
        endYear: newRecord.endYear,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',  // Placeholder ID, change as needed
        supervisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Placeholder ID
        isActive: true,  // Set as needed
        isDeleted: false, // Set as needed
        goals: goals,
        competencies: competencies,
      };
  
      this.http
        .post<any>(
          'https://localhost:7012/performance-reviews',
          performanceData
        )
        .subscribe({
          next: (response) => {
            if (response && response.data.id) {
              // Add the ID from the server response
              const performanceReviewWithId: PerformanceRecord = {
                ...performanceData,
                id: response.data.id,  // Actual ID from the server
              };
  
              // Add to local arrays
              this.performanceReviews.push(performanceReviewWithId);
              this.allPerformanceReviews.push(performanceReviewWithId);
  
              // Close and reset the form
              this.isAddFormVisible = false;
              this.addUserForm.reset();
            } else {
              alert('Failed to retrieve the ID after creation.');
            }
          },
          error: (err) => {
            console.error('Error adding record:', err);
            alert(
              'Failed to add the record. Please check the console for more details.'
            );
          },
        });
    } else {
      alert('Please fill out all required fields.');
    }
  }
  

  deleteRecord(id: string) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.http
        .delete<any>(`https://localhost:7012/performance-reviews/${id}`)
        .subscribe({
          next: () => {
            this.performanceReviews = this.performanceReviews.filter(
              (record) => record.id !== id
            );
            this.allPerformanceReviews = this.allPerformanceReviews.filter(
              (record) => record.id !== id
            );
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            alert('Failed to delete the record. Please try again.');
          },
        });
    }
  }

  readonly Edit = Edit;
  readonly Trash = Trash;

  headers = [
    'ID',
    'Department',
    'Review Year',
    'Start Date',
    'End Date',
    'Name',
    'Supervisor',
    'Actions',
  ];

  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
  openAddUserForm() {
    this.isAddFormVisible = true;
  }

  openEditForm(record: PerformanceRecord) {
    this.record = record;
    this.isEditFormVisible = true;
  
    // Create FormArray for competencies where each competency is a FormGroup
    const competenciesFormArray = this.fb.array(
      record.competencies.map(comp => this.fb.group({
        competency: [comp.competency.competency],  // Competency name
        level: [comp.competency.level],            // Competency level
        description: [comp.competency.description], // Competency description
        weight: [comp.weight],                     // Competency weight
      }))
    );
  
    this.editUserForm.setControl('competencies', competenciesFormArray);
  
    // Similarly handle goals if necessary
    const goalsFormArray = this.fb.array(
      record.goals.map(goal => this.fb.group({
        orderNo: [goal.orderNo],           // Goal order number
        goals: [goal.goals],               // Goal description
        weight: [goal.weight],             // Goal weight
        date: [goal.date],                 // Goal date
        measure1: [goal.measure1],         // Measure 1
        measure2: [goal.measure2],         // Measure 2
        measure3: [goal.measure3],         // Measure 3
        measure4: [goal.measure4],         // Measure 4
      }))
    );
  
    this.editUserForm.setControl('goals', goalsFormArray);
  
    // Set values for other fields
    this.editUserForm.patchValue({
      name: record.name,
      departmentType: record.departmentType,
      startYear: record.startYear,
      endYear: record.endYear,
      goals: record.goals.map(goal => goal.goals).join(', ') // Example for goals field
    });
  }
  
  
  cancelEdit() {
    this.isEditFormVisible = false;
  }

}

