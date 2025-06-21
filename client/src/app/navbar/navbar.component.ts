import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      id="header"
      class="w-full z-30 py-1 bg-[#2b2938] shadow-lg border-b border-[#1a1826]"
    >
      <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
        <a href="/" class="flex items-center w-auto w-full">
          <img
            src="/assets/logo.png"
            alt="logo"
            class="w-8 h-8 animate-pulse"
          />
          <h1 class="text-[#317591] font-bold text-xl">BlueDo</h1>
        </a>

        <div
          class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          <div class="auth flex items-center w-full md:w-full">
            <div class="flex items-center justify-center gap-4">
              <ng-container *ngIf="!(isAuthenticated$ | async); else loggedIn">
                <a
                  routerLink="/login"
                  class="transform rounded-md bg-transparent border border-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/10"
                >
                  Login
                </a>
                <a
                  routerLink="/register"
                  class="transform rounded-md bg-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/50"
                >
                  Register
                </a>
              </ng-container>
            </div>
            <ng-template #loggedIn>
              <a
                routerLink="/tasks"
                class="transform rounded-md bg-transparent border border-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/10"
              >
                Tasks
              </a>
              <button
                (click)="logout()"
                class="transform rounded-md bg-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/50"
              >
                Logout
              </button>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isAuthenticated$ = this.authService.isAuthenticated();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
