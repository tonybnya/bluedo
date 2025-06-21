import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex text-white">
      <div class="w-1/2 h-screen">
        <img
          src="/assets/bg.png"
          alt="Background illustration"
          class="h-full w-full object-cover"
        />
      </div>

      <div
        class="w-1/2 flex flex-col justify-between max-lg:justify-center items-center p-8 bg-[#1a1826] min-h-screen"
      >
        <div class="flex flex-col items-center gap-3 mb-12">
          <img
            src="/assets/logo.png"
            class="h-12 w-12 max-lg:w-10 max-lg:h-10 text-primary"
          />
          <span
            class="text-4xl max-lg:text-lg font-bold text-[#317591] tracking-tight"
          >
            BlueDo
          </span>
        </div>

        <div class="text-center space-y-4 mb-12">
          <h1
            class="text-4xl max-lg:text-lg font-semibold leading-none tracking-tight"
          >
            Oops! You have
            <br />
            discovered a world not
            <br />
            found!
          </h1>
          <p class="text-lg max-lg:text-sm font-light leading-6 tracking-tight">
            Home is just a click away. Let&apos;s go back and
            <br />
            continue with BlueDo.
          </p>

          <button
            size="lg"
            class="transform rounded-md bg-[#317591] px-5 py-3 font-medium text-white transition-colors hover:bg-[#317591]/50"
          >
            <a
              href="/"
              class="uppercase font-bold"
              rel="noopener noreferrer"
              aria-label="Go to home page"
            >
              Go to Home
            </a>
          </button>
        </div>

        <div class="mt-12 text-[#f7c279] text-sm font-bold">
          <span>Error Code 404</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent {}
