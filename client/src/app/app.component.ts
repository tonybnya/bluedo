import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  template: `
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ["./app.component.css"],
  imports: [RouterModule],
})
export class AppComponent {
  title = "BlueDo";
}
