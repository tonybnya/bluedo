import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = environment.apiUrl || "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  // get the auth token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("auth_token");

    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    });
  }

  // Auth endpoints
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Tasks endpoints
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, taskData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, taskData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
