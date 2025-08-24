
import {  inject, Injectable } from '@angular/core';
import {    FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { User } from '../models/User.model';
import { CookieService } from 'ngx-cookie-service';

import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private user:User ={id:0,name:'',password:''};
  private cookieService = inject(CookieService);

   tasks:Task[]=[];

  set userName(name:string){
    this.user.name = name;
  }
  set userId(id:number){
    this.user.id = id;
  }
  set userPassword(password:string){
    this.user.password = password;
  } 
  saveCredentials(user:FormGroup){
    this.user.name =user.value.name;
    this.user.password = user.value.password
  
  
    this.cookieService.set('user', JSON.stringify(this.user));
  }
  loadCredentials(){
    const user = JSON.parse(this.cookieService.get('user') || '{}');
    this.user.name = user.name;
    this.user.password = user.password;
  }
  getUserData() {
    const user = JSON.parse(this.cookieService.get('user') || '{}');
    if(!user.name || !user.password){
      this.user.name = 'guest';
      this.user.password = 'guest';
    }else{
      this.user.name = user.name;
      this.user.password = user.password;
    }
    const credentials = `${this.user.name}:${ this.user.password}`;
    const encodedCredentials = btoa(credentials);

return this.http.get<Task[]>('http://localhost:8080/tasks', {
  headers: { 'Authorization': `Basic ${encodedCredentials}` }
                  }).pipe(
                    map(response => response.map(item => ({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      user_id: item.user_id,
                      status: item.status
                    })))
                  );
            
          }
          deleteTask(taskId: number) {
            const credentials = `${this.user.name}:${this.user.password}`;
            console.log(credentials);
            const encodedCredentials = btoa(credentials);
            return this.http.delete(`http://localhost:8080/tasks/${taskId}`, {
              headers: { 'Authorization': `Basic ${encodedCredentials}` }
            });
          }
}
