import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { userService } from '../../services/userService.service';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MyFormDialogComponent } from '../my-form-dialog/my-form-dialog.component';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent {
  private userService = inject(userService);
  private dialog = inject(MatDialog);
  tasks: Task[] = [];
    ngOnInit() {
    this.userService.getUserData().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
  editTask(task: Task): void { 
    const dialogRef = this.dialog.open(MyFormDialogComponent, {
    data: { name: task.name, status: task.status, description: task.description } // initial values (can be empty or an existing task)
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {
      console.log('Dialog returned:', result);
      result.id = task.id; // retain the original task ID
      this.userService.editTask(result).subscribe({
  next: (savedTask) => {
    console.log('Task saved successfully:', savedTask);
        this.userService.getUserData().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    })
  },
  error: (err) => {
    console.error('Error saving task:', err);
  }
});

      //  Simple check: values are not empty
      if (result.name && result.status && result.description) {
        console.log('All fields saved correctly ');
        // Here is where you’d call your service in the future:
        // this.taskService.createTask(result);
      } else {
        console.warn('Some fields are empty ', result);
      }
    } else {
      console.log('Dialog was closed without saving ');
    }
  });
  }
createTask(): void {
  const dialogRef = this.dialog.open(MyFormDialogComponent, {
    data: { name: '', status: '', description: '' } // initial values (can be empty or an existing task)
  });

  dialogRef.afterClosed().subscribe(result => {
    // result will be:
    // { name: "...", status: "...", description: "..." }
    // OR undefined if user clicked Cancel
    if (result) {
      console.log('Dialog returned:', result);
      this.userService.createTask(result).subscribe({
  next: (savedTask) => {
    console.log('Task saved successfully:', savedTask);
    this.userService.getUserData().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  },
  error: (err) => {
    console.error('Error saving task:', err);
  }
});

      // ✅ Simple check: values are not empty
      if (result.name && result.status && result.description) {
        console.log('All fields saved correctly ✅');
        // Here is where you’d call your service in the future:
        // this.taskService.createTask(result);
      } else {
        console.warn('Some fields are empty ❌', result);
      }
    } else {
      console.log('Dialog was closed without saving ❌');
    }
  });
}

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
