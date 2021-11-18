import { Injectable } from '@angular/core';
import {User} from "../models/User.model";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import * as shajs from 'sha.js';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MeetingService} from "./meeting.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User;
  private islogged : boolean = false;

  constructor(public userService: UserService, public router: Router, private firestore: AngularFirestore,
              private meetingService: MeetingService) { }

  public auth(username,password) : Promise<boolean>{
    return new Promise((resolve) => {
      let connected = false;
      let usertoconnect: User;

      const usersCollection = this.firestore.collection('Users');
      let cryptedpass = shajs('sha256').update(password).digest('hex');
      const query = usersCollection.ref.where("user","==",username)
        .where("password","==",cryptedpass)
      query.get().then(array => {
        if(!array.empty){
          const data: any = array.docs[0].data();
          usertoconnect = new User(
            data.email,
            data.phone,
            data.password,
            data.user,
            data.lastname,
            data.firstname,
            data.session
          );
          connected = true;
          this.setUser(usertoconnect);
        }else{
          connected = false;
        }
        resolve(connected);
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
    this.meetingService.connectedUser = user;
    this.meetingService.getMyMeetings();
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
    this.meetingService.connectedUser = null;
    this.meetingService.clearMyMeetings();
    localStorage.setItem("session", "undefined");
    this.router.navigate(["/connection-choice"]);

  }

  public isLogged(): boolean{
    return this.islogged;
  }
}
