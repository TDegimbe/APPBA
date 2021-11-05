import { Injectable } from '@angular/core';
import {User} from "../models/User.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User;
  private islogged : boolean = false;

  constructor(public userService: UserService, public router: Router) { }

  public auth(username,password){
    //faire une vérif de mdp et connecter le user
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
      }else{
        resolve(true);
      }
    });
  }

  public hasLocalStorage() : boolean{
    const session = localStorage.getItem("session");
    return session !== "undefined";
  }

  public setUser(user,){
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
    this.router.navigate(["/connection-choice"]);
    localStorage.setItem("session", "undefined");
  }

  public isLogged(): boolean{
    return this.islogged;
  }
}
