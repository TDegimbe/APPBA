import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.page.html',
  styleUrls: ['./my-meetings.page.scss'],
})
export class MyMeetingsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
