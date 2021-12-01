import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserPpComponent} from "./user-pp.component";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    UserPpComponent
  ],
  declarations: [
    UserPpComponent
  ]
})
export class UserPpModule { }
