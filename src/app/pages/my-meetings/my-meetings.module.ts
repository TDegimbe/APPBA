import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMeetingsPageRoutingModule } from './my-meetings-routing.module';

import { MyMeetingsPage } from './my-meetings.page';
import {MeetingModule} from "../../components/meeting/meeting.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMeetingsPageRoutingModule,
    MeetingModule
  ],
  declarations: [MyMeetingsPage]
})
export class MyMeetingsPageModule {}
