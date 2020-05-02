import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User = null;
  private loggedIn: boolean = false;

  constructor() { }

  login(email: string, password: string, users: User[]){
    for(let user of users){
      if(user.email == email && user.password == password){
        this.currentUser = new User(user.username, user.email, user.password);
        this.loggedIn = true;
        return true;
      }
    }
    return false;
  }

  logout(){
    this.currentUser = null;
    this.loggedIn = false;
  }

  regist(username: string, email: string, password: string){
    this.currentUser = new User(username, email, password);
    this.loggedIn = true;
  }

  public get currentUserValue(): User{
    return this.currentUser;
  }

  public get isLoggedIn(): boolean{
    return this.loggedIn;
  }
}
