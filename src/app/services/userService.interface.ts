import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

export interface IuserService {
  userName: string;
  userId: number;
  userPassword: string;

  saveCredentials(user: FormGroup): void;
  loadCredentials(): void;
  getUserData(): Observable<Task[]>;
  deleteTask(taskId: number): Observable<any>;
  createTask(task: Task): Observable<Task>;
  editTask(task: Task): Observable<Task>;
}
