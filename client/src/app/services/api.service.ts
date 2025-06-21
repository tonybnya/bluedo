import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User, LoginCredentials, AuthResponse } from "../models/user.model";
import { Task, CreateTaskDto, UpdateTaskDto } from "../models/task.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // Force production URL if deploying to Vercel
  private apiUrl = window.location.hostname.includes('vercel') 
    ? 'https://tonybnya-bluedo-api.onrender.com/api'
    : environment.apiUrl;

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
    const url = `${this.apiUrl}/auth/register`;
    console.log('Register URL:', url);
    console.log('Using API URL:', this.apiUrl);
    return this.http.post<AuthResponse>(url, userData);
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

  createTask(taskData: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, taskData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTask(id: string, taskData: UpdateTaskDto): Observable<Task> {
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
