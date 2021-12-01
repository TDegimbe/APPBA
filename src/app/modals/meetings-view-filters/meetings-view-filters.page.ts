import {Component, Input, OnInit, ViewChildren} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-meetings-view-filters',
  templateUrl: './meetings-view-filters.page.html',
  styleUrls: ['./meetings-view-filters.page.scss'],
})
export class MeetingsViewFiltersPage implements OnInit {

  @Input() sport: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  dismissModal() {
     this.modalController.dismiss()
  }

  validateModal() {
    this.modalController.dismiss({
        "sport": this.sport
    });
  }

}
