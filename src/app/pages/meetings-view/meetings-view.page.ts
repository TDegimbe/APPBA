import { Component, OnInit } from '@angular/core';
import {MeetingService} from "../../services/meeting.service";
import {Meeting} from "../../models/Meeting.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-meetings-view',
  templateUrl: './meetings-view.page.html',
  styleUrls: ['./meetings-view.page.scss'],
})
export class MeetingsViewPage implements OnInit {

  public slideMeetingsSubscription: Subscription;
  public slideMeetings = new Map<String,Meeting>();
  public loaded = false;

  constructor(private meetingService: MeetingService, public userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.load();
  }

  getMeetings(){
    this.meetingService.getSlideMeetings();
    this.slideMeetingsSubscription = this.meetingService.slideMeetingsSubject.subscribe(
      (slideMeetings: Map<String,Meeting>) =>{
        this.slideMeetings.clear();
        slideMeetings.forEach((value,key) =>{
          if(value.isfull == false){
            this.slideMeetings.set(key,value);
          }
        })
      }
    );
    this.meetingService.emitSlideMeetingsSubject();
  }


  load(){
    if (!this.authService.isLogged()) {
      this.authService.loadAuth().then(status => {
        if (status) {
          this.loaded = true;
          this.getMeetings();
        }
      });
    }else{
      this.loaded = true;
      this.getMeetings();
    }
  }

}
