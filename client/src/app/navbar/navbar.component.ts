import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      id="header"
      class="w-full z-30 py-1 bg-[#2b2938] shadow-lg border-b border-[#1a1826]"
    >
      <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
        <div class="flex items-center w-auto w-full">
          <img
            src="/assets/logo.png"
            alt="logo"
            class="w-8 h-8 animate-pulse"
          />
          <h1 class="text-[#317591] font-bold text-xl">BlueDo</h1>
        </div>

        <div
          class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
          id="nav-content"
        >
          <div class="auth flex items-center w-full md:w-full">
            <button
              class="bg-transparent text-white  p-2 rounded border border-[#317591] mr-4 hover:border-[#317591]/50"
            >
              Login
            </button>
            <button
              class="bg-[#317591] text-white  p-2 rounded  hover:bg-[#317591]/50 hover:text-gray-100"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {}
