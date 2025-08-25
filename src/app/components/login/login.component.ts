import { Component, inject, Injectable } from '@angular/core';
import {    FormGroup,
    FormControl,
    Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userService } from '../../services/userService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({providedIn: 'root'})
export class LoginComponent {
  private userService = inject(userService);
  private router = inject(Router);


  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });


onSubmit() {
  this.userService.saveCredentials(this.loginForm);
  this.router.navigate(['/dashboard']);
}

}
