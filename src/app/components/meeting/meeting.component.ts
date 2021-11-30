import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "../../models/Meeting.model";
import {MeetingService} from "../../services/meeting.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {

  @Input() meeting: Meeting;
  @Input() id: string;
  constructor(private meetingService: MeetingService, private toastController: ToastController) { }

  ngOnInit() {}

  setFullToggle(){
    this.meeting.isfull = !this.meeting.isfull;
    this.meetingService.update(this.meeting,this.id);
    if(this.meeting.isfull){
      this.presentToast("L'évènement est complet!")
    }else{
      this.presentToast("L'évènement n'est plus complet!")
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    await toast.present();
  }

}
