import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMeetingsPageRoutingModule } from './my-meetings-routing.module';

import { MyMeetingsPage } from './my-meetings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMeetingsPageRoutingModule
  ],
  declarations: [MyMeetingsPage]
})
export class MyMeetingsPageModule {}
