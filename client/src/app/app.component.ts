import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-root",
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-blue-600 mb-4">Hello World!</h1>
        <p class="text-gray-700 mb-2">Tailwind CSS is now working properly!</p>
        <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
          Click me
        </button>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "BlueDo";
}
