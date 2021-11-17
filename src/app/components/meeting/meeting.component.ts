import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "../../models/Meeting.model";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {

  @Input() meeting: Meeting;
  @Input() id: String;
  constructor() { }

  ngOnInit() {}

}
