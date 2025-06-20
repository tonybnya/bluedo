import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, BehaviorSubject, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  constructor(private apiService: ApiService, private router: Router) {}

  isAuthenticatedSubject(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private hasToken(): boolean {
    return !localStorage.getItem("auth_token");
  }

  login(credentials: any): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem("auth_token", response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.apiService.register(userData);
  }

  logout(): void {
    localStorage.removeItem("auth_token");
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(["/login"]);
  }
}
