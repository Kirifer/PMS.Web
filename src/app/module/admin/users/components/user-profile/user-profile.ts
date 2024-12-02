import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  Users,
  TrendingUp,
  Award,
} from 'lucide-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, HttpClientModule], // Include HttpClientModule here
  template: `
    <div class="max-w-7xl mx-auto p-8 bg-card rounded-lg ">
    <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold text-gray-900">User Profile</h1>
        </div>
      <div class="flex items-center">
        <img
          class="w-30 h-30 rounded-full"
          src="https://placehold.co/120x120"
          alt="Profile Picture"
        />
        <div class="ml-4">
          <h2 class="text-xl font-semibold">John Doe</h2>
          <p class="text-muted-foreground">Website • San Francisco, CA</p>
          <div class="mt-2">
            
          </div>
          <div class="flex space-x-2 mt-2">
            <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs"
              >Active</span
            >
          
          </div>
        </div>
        <button
          class="ml-auto rounded-full border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Edit Profile
        </button>
      </div>
      <div class="mt-6 border-t border-border pt-4">
        <h2 class="text-lg font-semibold mb-4">Contact Information</h2>
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>sarah.ander.com</span>
          </div>
         
          <div class="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>+1 (555) 123-4567</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>San Frcontaancisco Office</span>
          </div>

          <div class="mt-6 border-t border-border pt-4">
        <h2 class="text-lg font-semibold mb-4">Employment Information</h2>
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Joined: January 15, 2020</span>
          </div>
        </div>

        <div class="mt-6 border-t border-border pt-4">
          <h3 class="text-lg font-semibold">Employee Stats</h3>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div class="bg-blue-900 text-white p-4 rounded-lg">
              <p class="text-sm">2</p>
              <p class="text-xs">Rating</p>
            </div>
            <div class="bg-blue-900 text-white p-4 rounded-lg">
              <p class="text-sm">105</p>
              <p class="text-xs">OFF MARKET</p>
            </div>
            <div class="bg-blue-900 text-white p-4 rounded-lg">
              <p class="text-sm">Yes</p>
              <p class="text-xs">MANAGEMENT</p>
            </div>
            <div class="bg-blue-900 text-white p-4 rounded-lg">
              <p class="text-sm">🏠 Rent</p>
              <p class="text-xs">TOP CATEGORY</p>
            </div>
            <div class="bg-blue-900 text-white p-4 rounded-lg">
              <p class="text-sm">Honest</p>
              <p class="text-xs">FEEDBACK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize component
  }
}
