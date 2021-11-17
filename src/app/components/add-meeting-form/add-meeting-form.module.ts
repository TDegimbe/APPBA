import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddMeetingFormComponent} from "./add-meeting-form.component";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    AddMeetingFormComponent
  ],
  declarations: [
    AddMeetingFormComponent
  ]
})
export class AddMeetingFormModule { }
