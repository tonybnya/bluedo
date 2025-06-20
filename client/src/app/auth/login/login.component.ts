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
          <h1 class="text-2xl font-bold text-white mt-2">Login</h1>
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
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="credentials.password"
              required
              class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
              placeholder="Enter your password"
            />
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
