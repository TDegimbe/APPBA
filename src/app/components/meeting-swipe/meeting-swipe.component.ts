import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Meeting} from "../../models/Meeting.model";
import {User} from "../../models/User.model";
import {UserService} from "../../services/user.service";
import {Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-meeting-swipe',
  templateUrl: './meeting-swipe.component.html',
  styleUrls: ['./meeting-swipe.component.scss'],
})
export class MeetingSwipeComponent implements OnInit {

  @Input() meeting: Meeting;
  @Input() id: String;
  @ViewChild('slide_content') slide_content;
  public loaded = false;
  public user: User;
  public descshowed = false;

  constructor(private userService: UserService, private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.userService.getBySession(this.meeting.user).then(value => {
      this.user = value;
      this.loaded = true;
    });
  }

  public toggleDesc(){
    if(!this.descshowed){
      this.animationCtrl.create()
        .addElement(this.slide_content.nativeElement)
        .duration(150)
        .fromTo('height', '215px', '400px')
        .play();
      this.descshowed = true;
    }else{
      this.animationCtrl.create()
        .addElement(this.slide_content.nativeElement)
        .duration(150)
        .fromTo('height', '400px', '215px')
        .play();
      this.descshowed = false;
    }
  }

}
