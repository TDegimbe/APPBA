import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MeetingSwipeComponent} from "./meeting-swipe.component";
import {UserPpModule} from "../user-pp/user-pp.module";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserPpModule
  ],
  exports: [
    MeetingSwipeComponent
  ],
  declarations: [
    MeetingSwipeComponent
  ]
})
export class MeetingSwipeModule { }
