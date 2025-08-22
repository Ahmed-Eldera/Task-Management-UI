import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({providedIn: 'root'})
export class LoginComponent {
    private http = inject(HttpClient);
  name: string = '';
  password: string = '';
  onSubmit() {
    const credentials = `${this.name}:${ this.password}`;
    const encodedCredentials = btoa(credentials);
    console.log('Name:', this.name);
    console.log('Password:', this.password);
    this.http.get('http://localhost:8080/tasks', {
  headers: {
    'Authorization': `Basic ${encodedCredentials}`
  }
}).subscribe(data => {
  console.log(data);
  // ...
});
}
}
