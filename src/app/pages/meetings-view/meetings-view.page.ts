import { Component, OnInit } from '@angular/core';
import {MeetingService} from "../../services/meeting.service";
import {Meeting} from "../../models/Meeting.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-meetings-view',
  templateUrl: './meetings-view.page.html',
  styleUrls: ['./meetings-view.page.scss'],
})
export class MeetingsViewPage implements OnInit {

  public meetings: Map<String,Meeting>;
  public loaded = false;

  constructor(private meetingService: MeetingService, public userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.meetingService.getSlideMeetings().then(map => {
      this.meetings = map;
    });
    this.load();
  }

  load(){
    if (!this.authService.isLogged()) {
      this.authService.loadAuth().then(status => {
        if (status) {
          this.loaded = true;
        }
      });
    }else{
      this.loaded = true;
    }
  }

}
