import { Component, OnInit } from '@angular/core';
import {MeetingService} from "../../services/meeting.service";
import {Meeting} from "../../models/Meeting.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-meetings-view',
  templateUrl: './meetings-view.page.html',
  styleUrls: ['./meetings-view.page.scss'],
})
export class MeetingsViewPage implements OnInit {

  public meetings: Map<String,Meeting>

  constructor(private meetingService: MeetingService, public userService: UserService) { }

  ngOnInit() {
    this.meetingService.getSlideMeetings().then(map => {
      this.meetings = map;
    });
  }

}
