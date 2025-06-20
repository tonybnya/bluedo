import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, BehaviorSubject, tap } from "rxjs";
import { Router } from "@angular/router";
import { LoginCredentials, User, AuthResponse } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private apiService: ApiService, private router: Router) {}

  isAuthenticated(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem("auth_token");
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.apiService.login(credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem("auth_token", response.token);
          this.authSubject.next(true);
        }
      })
    );
  }

  register(userData: User): Observable<AuthResponse> {
    return this.apiService.register(userData);
  }

  logout(): void {
    localStorage.removeItem("auth_token");
    this.authSubject.next(false);
    this.router.navigate(["/login"]);
  }
}
