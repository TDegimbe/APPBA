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

  public checkLocalStorage(){
    const session = localStorage.getItem("session");
    if(session !== "undefined"){
      console.log("Session trouvée");
      this.userService.getBySession(session).then(user => {
        this.setUser(user);
        this.router.navigate(["/home"]);
      })
    }
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

  public isLogged(): boolean{
    return this.islogged;
  }
}
