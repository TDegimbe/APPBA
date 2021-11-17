import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Meeting} from "../../models/Meeting.model";
import {MeetingService} from "../../services/meeting.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.page.html',
  styleUrls: ['./my-meetings.page.scss'],
})
export class MyMeetingsPage implements OnInit {

  public loaded: boolean = false;
  public myMeetingsSubscription: Subscription;
  public myMeetings = new Map<String,Meeting>();

  constructor(private router: Router,private authService: AuthService,private meetingService: MeetingService) {
  }

  ngOnInit() {
    this.load();
  }

  getMeetings(){
   this.meetingService.getMyMeetings();
   this.myMeetingsSubscription = this.meetingService.myMeetingsSubject.subscribe(
     (myMeetings: Map<String,Meeting>) =>{
       this.myMeetings = myMeetings;
     }
   );
   this.meetingService.emitMyMeetingsSubject();
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
