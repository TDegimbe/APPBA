import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MeetingSwipeComponent} from "./meeting-swipe.component";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    MeetingSwipeComponent
  ],
  declarations: [
    MeetingSwipeComponent
  ]
})
export class MeetingSwipeModule { }
