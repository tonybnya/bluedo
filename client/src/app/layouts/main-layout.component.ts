import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  standalone: true,
  selector: "app-main-layout",
  template: `
    <main>
      <app-navbar></app-navbar>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
      <app-footer></app-footer>
    </main>
  `,
  imports: [RouterModule, NavbarComponent, FooterComponent],
})
export class MainLayoutComponent {}
