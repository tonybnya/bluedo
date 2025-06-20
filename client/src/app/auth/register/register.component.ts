import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-[#1a1826]">
      <div class="bg-[#2b2938] p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-8">
          <img class="w-16 h-16 mx-auto animate-pulse" src="/assets/logo.png" alt="logo" />
          <h1 class="text-2xl font-bold text-white mt-2">Create an Account</h1>
        </div>

        <div *ngIf="errorMessage" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
          {{ errorMessage }}
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="mb-4">
            <label for="username" class="block text-[#dfddf3] mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="user.username"
              required
              minlength="3"
              class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
              placeholder="Choose a username"
            />
          </div>
          
          <div class="mb-4">
            <label for="password" class="block text-[#dfddf3] mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="user.password"
              required
              minlength="6"
              class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
              placeholder="Choose a password"
            />
          </div>
          
          <div class="mb-6">
            <label for="confirmPassword" class="block text-[#dfddf3] mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="confirmPassword"
              required
              class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
              placeholder="Confirm your password"
            />
            <div *ngIf="confirmPassword && user.password !== confirmPassword" class="text-red-500 text-sm mt-1">
              Passwords don't match
            </div>
          </div>
          
          <button
            type="submit"
            [disabled]="!registerForm.form.valid || isLoading || (user.password !== confirmPassword)"
            class="w-full py-2 px-4 bg-[#317591] text-white rounded hover:bg-[#317591]/80 focus:outline-none disabled:opacity-50"
          >
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
        </form>
        
        <div class="mt-4 text-center text-[#dfddf3]">
          Already have an account?
          <a routerLink="/login" class="text-[#f7c279] hover:underline">Login</a>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: ''
  };
  
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit(): void {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/login'], { 
          queryParams: { registered: 'true' } 
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
