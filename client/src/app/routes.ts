import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MainLayoutComponent } from "./layouts/main-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { TasksComponent } from "./tasks/tasks.component";
import { AuthGuard } from "./auth/auth.guard";

const routeConfig: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        title: "BlueDo - Home Page",
      },
      {
        path: "login",
        component: LoginComponent,
        title: "BlueDo - Login",
      },
      {
        path: "register",
        component: RegisterComponent,
        title: "BlueDo - Register",
      },
      {
        path: "tasks",
        component: TasksComponent,
        canActivate: [AuthGuard],
        title: "BlueDo - My Tasks",
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "404 - Not Found Page",
  },
];

export default routeConfig;
