import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User, LoginCredentials, AuthResponse } from "../models/user.model";
import { Task, NewTask, TaskUpdate } from "../models/task.model";

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
  register(userData: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/register`,
      userData
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      credentials
    );
  }

  // Tasks endpoints
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createTask(taskData: NewTask): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, taskData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTask(id: string, taskData: TaskUpdate): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, taskData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
