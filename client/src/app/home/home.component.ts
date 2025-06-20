import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-[#1a1826]">
      <div class="mx-auto max-w-[43rem]">
        <div class="text-center flex flex-col items-center justify-center">
          <img
            class="w-20 h-20 animate-pulse"
            src="/assets/logo.png"
            alt="logo"
          />
          <p class="text-lg font-medium leading-8 text-[#f7c279]">
            Introducing BlueDo
          </p>
          <h1
            class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-white"
          >
            Organize your productivity from&nbsp;task to completion.
          </h1>
          <p class="mt-3 text-lg leading-relaxed text-[#dfddf3]">
            <span class="text-[#317591] font-bold">BlueDo</span> helps you stay
            focused and in control by managing your to-do list with ease —
            create, edit, delete, and track your tasks effortlessly.
          </p>
        </div>

        <div class="mt-6 flex items-center justify-center gap-4">
          <a
            routerLink="/register"
            class="transform rounded-md bg-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/50"
            >Get started</a
          >
          <a
            routerLink="/login"
            class="transform rounded-md bg-transparent border border-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/10"
            >Login</a
          >
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {}
