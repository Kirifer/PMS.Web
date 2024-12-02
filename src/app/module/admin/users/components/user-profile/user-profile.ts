import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Edit, Trash } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="container mx-auto min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 pb-2" >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Profile Section -->
        <div class="space-y-3">
          <div class="text-sm text-gray-500 uppercase tracking-wide">
            Profile Image
          </div>
          <div class="bg-pink-50 rounded-lg p-4 text-center">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Profile"
              class="mx-auto rounded-lg mb-4"
            />
            <button class="text-blue-500 text-sm">Change Profile Image</button>
          </div>

          <div class="space-y-4">
            <div class="text-sm text-gray-500 uppercase tracking-wide">
              Employee Details
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-500">First Name</label>
                <input
                  type="text"
                  value="Russel"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500">Last Name</label>
                <input
                  type="text"
                  value="Sims"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500">Email Address</label>
                <div class="mt-1 flex">
                  <input
                    type="email"
                    value="russell@mycompany.com"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button class="ml-2 text-gray-400 hover:text-gray-500">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-500">Phone Number</label>
                <div class="mt-1 flex">
                  <input
                    type="tel"
                    value="+1 255 29345690"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button class="ml-2 text-gray-400 hover:text-gray-500">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-500">Position</label>
                <input
                  type="text"
                  value="iOS Developer"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Role & Team Section -->
        <div class="space-y-6">
          <div>
            <div class="text-sm text-gray-500 uppercase tracking-wide">
              Role
            </div>
            <select
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option>Employee</option>
            </select>
          </div>

          <!-- Bio Section -->
          <div class="space-y-4">
            <div>
              <div class="text-sm text-gray-500 uppercase tracking-wide">
                Bio
              </div>
              <input
                type="text"
                id="large-input"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a brief bio..."
              />
            </div>
          </div>
        </div>

        <!-- Onboarding Section -->
        <div class="space-y-6">
          <div>
            <div class="text-sm text-gray-500 uppercase tracking-wide">
              Onboarding
            </div>
            <div class="mt-2">
              <div class="flex justify-between items-center">
                <span>Starts on</span>
                <div class="flex items-center space-x-2">
                  <span>21.05.2022</span>
                  <button class="text-gray-400 hover:text-gray-500">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span>Onboarding required</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div class="text-sm text-gray-500 uppercase tracking-wide">
              Current Status
            </div>
            <div class="mt-2 bg-green-50 rounded-lg p-2">
              <div class="flex justify-between items-center">
                <span>Onboarding</span>
                <span>35%</span>
              </div>
              <div class="mt-2 h-2 bg-gray-200 rounded-full">
                <div class="h-full w-1/3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="text-sm text-gray-500 uppercase tracking-wide">
              Onboarding Scripts
            </div>
            <div class="space-y-3">
              <label class="flex items-center justify-between">
                <span>Office Tour</span>
                <div class="flex items-center space-x-2">
                  <span>100%</span>
                  <input
                    type="checkbox"
                    checked
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </label>
              <label class="flex items-center justify-between">
                <span>Management Introductory</span>
                <div class="flex items-center space-x-2">
                  <span>0%</span>
                  <input
                    type="checkbox"
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </label>
              <label class="flex items-center justify-between">
                <span>Work Tools</span>
                <div class="flex items-center space-x-2">
                  <span>20%</span>
                  <input
                    type="checkbox"
                    checked
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </label>
              <label class="flex items-center justify-between">
                <span>Meet Your Colleagues</span>
                <div class="flex items-center space-x-2">
                  <span>0%</span>
                  <input
                    type="checkbox"
                    checked
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </label>
              <label class="flex items-center justify-between">
                <span>Duties Journal</span>
                <div class="flex items-center space-x-2">
                  <span>0%</span>
                  <input
                    type="checkbox"
                    checked
                    class="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex space-x-4">
        <button
          class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
        >
          Save Changes
        </button>
        <button
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class UserProfileComponent {}