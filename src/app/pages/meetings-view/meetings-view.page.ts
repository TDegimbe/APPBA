import { Component, OnInit } from '@angular/core';
import {MeetingService} from "../../services/meeting.service";
import {Meeting} from "../../models/Meeting.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {ModalController} from "@ionic/angular";
import {MeetingsViewFiltersPage} from "../../modals/meetings-view-filters/meetings-view-filters.page";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-meetings-view',
  templateUrl: './meetings-view.page.html',
  styleUrls: ['./meetings-view.page.scss'],
})
export class MeetingsViewPage implements OnInit {

  public slideMeetingsSubscription: Subscription;
  public slideMeetings = new Map<String,Meeting>();
  public loaded = false;
  public filters = {
    sport: undefined
  };

  constructor(private meetingService: MeetingService, public userService: UserService, private authService: AuthService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.load();
  }

  showFilters(){
    this.presentModal().then(modal => {
        modal.onWillDismiss().then(data => {
          if(data.data != undefined) {
            if (data.data.sport != undefined) {
              this.filters.sport = data.data.sport;
              this.updateFilters();
            }
          }
        });
    });
  }

  updateFilters(){
    this.meetingService.updateSlideFilters(this.filters);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MeetingsViewFiltersPage,
      cssClass: 'my-custom-class',
      componentProps: this.filters
    });
    await modal.present();
    return modal;
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
