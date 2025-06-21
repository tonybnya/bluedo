import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Task, CreateTaskDto, UpdateTaskDto } from "../models/task.model";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-[#1a1826] text-white p-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6 flex items-center">
          <span class="text-[#317591]">My Tasks</span>
        </h1>

        <!-- Error message -->
        <div
          *ngIf="error"
          class="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4"
        >
          {{ error }}
        </div>

        <!-- Edit task modal -->
        <div
          *ngIf="isEditing"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-[#2b2938] p-5 rounded-lg w-full max-w-md relative">
            <h2 class="text-xl font-semibold mb-4">Edit Task</h2>
            <form (ngSubmit)="updateTask()" #editForm="ngForm">
              <div class="mb-4">
                <label for="editTitle" class="block text-[#dfddf3] mb-2"
                  >Title</label
                >
                <input
                  type="text"
                  id="editTitle"
                  name="editTitle"
                  [(ngModel)]="editingTask.title"
                  required
                  class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
                />
              </div>

              <div class="mb-4">
                <label for="editDescription" class="block text-[#dfddf3] mb-2"
                  >Description (Optional)</label
                >
                <textarea
                  id="editDescription"
                  name="editDescription"
                  [(ngModel)]="editingTask.description"
                  rows="3"
                  class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
                ></textarea>
              </div>

              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  (click)="cancelEdit()"
                  class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="!editForm.form.valid || isLoading"
                  class="px-4 py-2 bg-[#317591] text-white rounded hover:bg-[#317591]/80 focus:outline-none disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Create new task form -->
        <div class="bg-[#2b2938] p-4 rounded-md mb-6">
          <h2 class="text-xl font-semibold mb-4">Create New Task</h2>
          <form (ngSubmit)="createTask()" #taskForm="ngForm">
            <div class="mb-4">
              <label for="title" class="block text-[#dfddf3] mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                [(ngModel)]="newTask.title"
                required
                class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
                placeholder="Task title"
              />
            </div>

            <div class="mb-4">
              <label for="description" class="block text-[#dfddf3] mb-2"
                >Description (Optional)</label
              >
              <textarea
                id="description"
                name="description"
                [(ngModel)]="newTask.description"
                rows="3"
                class="w-full px-3 py-2 bg-[#1a1826] text-white border border-[#317591] rounded focus:outline-none focus:border-[#f7c279]"
                placeholder="Task description"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="!taskForm.form.valid || isCreating"
              class="px-4 py-2 bg-[#317591] text-white rounded hover:bg-[#317591]/80 focus:outline-none disabled:opacity-50"
            >
              {{ isCreating ? "Creating..." : "Add Task" }}
            </button>
          </form>
        </div>

        <!-- Loading indicator -->
        <div *ngIf="isLoading" class="text-center py-8">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#317591]"
          ></div>
          <p class="mt-2 text-[#dfddf3]">Loading tasks...</p>
        </div>

        <!-- No tasks message -->
        <div
          *ngIf="!isLoading && tasks.length === 0"
          class="bg-[#2b2938] p-8 rounded-md text-center"
        >
          <p class="text-[#dfddf3] text-lg">You don't have any tasks yet.</p>
          <p class="text-[#dfddf3] mt-2">Create your first task above!</p>
        </div>

        <!-- Tasks list -->
        <div *ngIf="!isLoading && tasks.length > 0" class="space-y-4">
          <div
            *ngFor="let task of tasks"
            class="bg-[#2b2938] p-4 rounded-md border-l-4 border-[#317591]"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold">{{ task.title }}</h3>
                <p *ngIf="task.description" class="text-[#dfddf3] mt-2">
                  {{ task.description }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  (click)="startEditTask(task)"
                  class="p-2 text-[#f7c279] hover:bg-[#f7c279]/10 rounded"
                >
                  Edit
                </button>
                <button
                  (click)="deleteTask(task._id!)"
                  class="p-2 text-red-500 hover:bg-red-500/10 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTask: CreateTaskDto = {
    title: "",
    description: "",
  };

  editingTask: UpdateTaskDto = {
    title: "",
    description: "",
  };
  currentTaskId = "";
  isEditing = false;

  isLoading = false;
  isCreating = false;
  error = "";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = "";

    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error =
          err.error?.message || "Failed to load tasks. Please try again.";
      },
    });
  }

  createTask(): void {
    if (!this.newTask.title.trim()) return;

    this.isCreating = true;
    this.error = "";

    this.apiService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.unshift(task);
        this.resetForm();
        this.isCreating = false;
      },
      error: (err) => {
        this.isCreating = false;
        this.error =
          err.error?.message || "Failed to create task. Please try again.";
      },
    });
  }

  startEditTask(task: Task): void {
    this.isEditing = true;
    this.currentTaskId = task._id || "";
    this.editingTask = {
      title: task.title,
      description: task.description,
    };
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentTaskId = "";
    this.editingTask = {
      title: "",
      description: "",
    };
  }

  updateTask(): void {
    if (!this.currentTaskId || !this.editingTask.title?.trim()) return;

    this.isLoading = true;

    this.apiService.updateTask(this.currentTaskId, this.editingTask).subscribe({
      next: (updatedTask) => {
        // Find and update the task in the tasks array
        const index = this.tasks.findIndex((t) => t._id === this.currentTaskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }

        this.isLoading = false;
        this.isEditing = false;
        this.currentTaskId = "";
      },
      error: (err) => {
        this.isLoading = false;
        this.error =
          err.error?.message || "Failed to update task. Please try again.";
      },
    });
  }

  deleteTask(id: string): void {
    if (confirm("Are you sure you want to delete this task?")) {
      this.apiService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task._id !== id);
        },
        error: (err) => {
          this.error =
            err.error?.message || "Failed to delete task. Please try again.";
        },
      });
    }
  }

  private resetForm(): void {
    this.newTask = {
      title: "",
      description: "",
    };
  }
}
