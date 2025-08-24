import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { AuthService } from '../../services/userService.service';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent {
  private userService = inject(AuthService);
  private dialog = inject(MatDialog);
  tasks: Task[] = [];
    ngOnInit() {
    this.userService.getUserData().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
  editTask(task: Task) {}
createTask() {} 

openPopup() {  
  console.log("Popup opened");
  this.dialog.open(PopupDialogComponent, {
    width: '400px'
  });}
deleteTask(taskId: number) {
  this.userService.deleteTask(taskId)
    .pipe(
      switchMap(() => this.userService.getUserData())
    )
    .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
}
}
