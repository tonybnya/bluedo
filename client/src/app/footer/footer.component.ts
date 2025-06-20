import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="p-4 shadow-lg px-6 py-4 bg-[#2b2938]">
      <span class="block text-sm text-[#6e6a86] text-center"
        >© {{ currentYear }}
        <a href="/" target="_blank" class="hover:underline">BlueDo</a>
        • All Rights Reserved •
      </span>
    </footer>
    <!-- </div> -->
  `,
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
