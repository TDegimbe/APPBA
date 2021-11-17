import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.page.html',
  styleUrls: ['./add-meeting.page.scss'],
})
export class AddMeetingPage implements OnInit {

  public loaded: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
