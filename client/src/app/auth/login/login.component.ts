import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LoginCredentials } from "../../models/user.model";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-[#1a1826]">
      <div class="bg-[#2b2938] p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-8">
          <img
            class="w-16 h-16 mx-auto animate-pulse"
            src="/assets/logo.png"
            alt="logo"
          />
          <h1 class="text-2xl font-bold text-[#f7c279] mt-2">Login</h1>
        </div>

        <div
          *ngIf="errorMessage"
          class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4"
        >
          {{ errorMessage }}
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="mb-4">
            <label for="username" class="block text-[#dfddf3] mb-2"
              >Username</label
            >
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="credentials.username"
              required
              class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
              placeholder="Enter your username"
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-[#dfddf3] mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="credentials.password"
                required
                class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#dfddf3] focus:outline-none"
                (click)="showPassword = !showPassword"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    *ngIf="!showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    *ngIf="!showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    *ngIf="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            [disabled]="!loginForm.form.valid || isLoading"
            class="w-full py-2 px-4 bg-[#317591] text-white rounded hover:bg-[#317591]/80 focus:outline-none disabled:opacity-50"
          >
            {{ isLoading ? "Logging in..." : "Login" }}
          </button>
        </form>

        <div class="mt-4 text-center text-[#dfddf3]">
          Don't have an account?
          <a routerLink="/register" class="text-[#f7c279] hover:underline"
            >Register</a
          >
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class LoginComponent {
  credentials: LoginCredentials = {
    username: "",
    password: "",
  };

  isLoading = false;
  errorMessage = "";
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = "";

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Navigate to tasks page after successful login
        this.router.navigate(["/tasks"]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          "Login failed. Please check your credentials.";
      },
    });
  }
}
