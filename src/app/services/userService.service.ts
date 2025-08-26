import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';
import { User } from '../models/User.model';
import { IuserService } from '../services/userService.interface';

@Injectable({ providedIn: 'root' })
export class userService implements IuserService {
  private http = inject(HttpClient);
  private user: User = { id: 0, name: '', password: '' };

  tasks: Task[] = [];

  set userName(name: string) {
    this.user.name = name;
  }
  get userName(): string {
    return this.user.name;
  }

  set userId(id: number) {
    this.user.id = id;
  }
  get userId(): number {
    return this.user.id;
  }

  set userPassword(password: string) {
    this.user.password = password;
  }
  get userPassword(): string {
    return this.user.password;
  }

  saveCredentials(user: FormGroup): void {
    this.user.name = user.value.name;
    this.user.password = user.value.password;

    // Save in localStorage instead of cookies
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadCredentials(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user.name = user.name || '';
    this.user.password = user.password || '';
  }

  getUserData(): Observable<Task[]> {
    console.log(this.user);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.name || !user.password) {
      this.user.name = 'guest';
      this.user.password = 'guest';
    } else {
      this.user.name = user.name;
      this.user.password = user.password;
    }

    const credentials = `${this.user.name}:${this.user.password}`;
    const encodedCredentials = btoa(credentials);

    return this.http.get<Task[]>('http://localhost:8080/tasks', {
      headers: { Authorization: `Basic ${encodedCredentials}` }
    }).pipe(
      map(response =>
        response.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          user_id: item.user_id,
          status: item.status,
          dueDate: new Date(item.dueDate) // Convert to Date object
        }))
      )
    );
  }

  deleteTask(taskId: number): Observable<any> {
    const credentials = `${this.user.name}:${this.user.password}`;
    const encodedCredentials = btoa(credentials);
    return this.http.delete(`http://localhost:8080/tasks/${taskId}`, {
      headers: { Authorization: `Basic ${encodedCredentials}` }
    });
  }
  filterTasksByStatus(status: string): Observable<Task[]> {
    const credentials = `${this.user.name}:${this.user.password}`;
    const encodedCredentials = btoa(credentials);
    return this.http.get<Task[]>(`http://localhost:8080/tasks/${status}`, {
      headers: { Authorization: `Basic ${encodedCredentials}` }
    });
  }
  createTask(task: Task): Observable<Task> {
    task.user_id = this.user.id;
    const credentials = `${this.user.name}:${this.user.password}`;
    const encodedCredentials = btoa(credentials);
    return this.http.post<Task>('http://localhost:8080/tasks', task, {
      headers: { Authorization: `Basic ${encodedCredentials}` }
    });
  }

  editTask(task: Task): Observable<Task> {
    const credentials = `${this.user.name}:${this.user.password}`;
    const encodedCredentials = btoa(credentials);
    return this.http.put<Task>(`http://localhost:8080/tasks/${task.id}`, task, {
      headers: { Authorization: `Basic ${encodedCredentials}` }
    });
  }
}
