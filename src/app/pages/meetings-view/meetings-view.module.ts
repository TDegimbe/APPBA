import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingsViewPageRoutingModule } from './meetings-view-routing.module';

import { MeetingsViewPage } from './meetings-view.page';
import {MeetingSwipeModule} from "../../components/meeting-swipe/meeting-swipe.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingsViewPageRoutingModule,
    MeetingSwipeModule
  ],
  declarations: [MeetingsViewPage]
})
export class MeetingsViewPageModule {}
