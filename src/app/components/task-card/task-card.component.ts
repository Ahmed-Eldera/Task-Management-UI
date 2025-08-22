import { Component } from '@angular/core';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  id: number = 0;
  title: string = 'Task 1';
  description: string = 'This is a sample task description. lorem ipsum dolor sit amet, consectetur  adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.his is a sample task description. lorem ipsum dolor sit amet, consectetur  adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.his is a sample task description. lorem ipsum dolor sit amet, consectetur  adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  status: string = 'In Progress';
task: any;

}
