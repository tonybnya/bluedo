import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="py-24 flex items-center min-h-screen justify-center bg-black"
    >
      <div class="mx-auto max-w-[43rem]">
        <div class="text-center flex flex-col items-center justify-center">
          <img
            class="w-20 h-20 animate-pulse"
            src="/assets/logo.png"
            alt="logo"
          />
          <p class="text-lg font-medium leading-8 text-[#317591]">
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
            create, edit, and track your tasks effortlessly.
          </p>
        </div>

        <div class="mt-6 flex items-center justify-center gap-4">
          <a
            href="#"
            class="transform rounded-md bg-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/50"
            >Get started</a
          >
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {}
