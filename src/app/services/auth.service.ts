import { Injectable } from '@angular/core';
import {User} from "../models/User.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import * as shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User;
  private islogged : boolean = false;

  constructor(public userService: UserService, public router: Router) { }

  public auth(username,password) : Promise<boolean>{
      return new Promise((resolve) => {
        this.userService.getAll().then(usersList => {
          let connected = false;
          let usertoconnect: User;
          usersList.forEach(user => {
            let cryptedpass = shajs('sha256').update(password).digest('hex');
            if(user.password == cryptedpass && user.user == username){
              connected = true;
              usertoconnect = user;
            }
          });
          if(!connected){
            resolve(false)
          }else{
            this.setUser(usertoconnect)
            resolve(true);
          }
        });
      });
  }

  public loadAuth() : Promise<boolean>{
    return new Promise((resolve) => {
      if (!this.isLogged()) {
        if (this.hasLocalStorage()) {
          const session = localStorage.getItem("session");
          this.userService.getBySession(session).then(user => {
            if (user !== undefined) {
              this.setUser(user);
            } else {
              this.logout();
            }
            resolve(true);
          });
        }
      }
    });
  }

  public hasLocalStorage() : boolean{
    const session = localStorage.getItem("session");
    return session !== "undefined";
  }

  public setUser(user){
    this.user = user;
    this.islogged = true;
    if(localStorage.getItem("session") === "undefined"){
      localStorage.setItem("session", user.session);
    }
  }

  public getUser(): User{
    return this.user;
  }

  public logout(){
    this.islogged = false;
    this.user = null;
    localStorage.setItem("session", "undefined");
    this.router.navigate(["/connection-choice"]);
  }

  public isLogged(): boolean{
    return this.islogged;
  }
}
