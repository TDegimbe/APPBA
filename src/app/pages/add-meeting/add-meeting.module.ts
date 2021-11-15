import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMeetingPageRoutingModule } from './add-meeting-routing.module';

import { AddMeetingPage } from './add-meeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMeetingPageRoutingModule
  ],
  declarations: [AddMeetingPage]
})
export class AddMeetingPageModule {}
