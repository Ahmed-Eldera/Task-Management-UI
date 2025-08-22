import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TaskCardComponent } from "./components/task-card/task-card.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, TaskCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskManagementApp';
}
