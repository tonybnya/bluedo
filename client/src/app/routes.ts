import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "BlueDo - Home Page",
  },
  // {
  //   path: "details/:id",
  //   component: DetailsComponent,
  //   title: "Details Page",
  // },
  {
    path: "**",
    component: NotFoundComponent,
    title: "404 - Not Found Page",
  },
];

export default routeConfig;
