import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMeetingPageRoutingModule } from './add-meeting-routing.module';

import { AddMeetingPage } from './add-meeting.page';
import {AddMeetingFormModule} from "../../components/add-meeting-form/add-meeting-form.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMeetingPageRoutingModule,
    AddMeetingFormModule
  ],
  declarations: [AddMeetingPage]
})
export class AddMeetingPageModule {}
