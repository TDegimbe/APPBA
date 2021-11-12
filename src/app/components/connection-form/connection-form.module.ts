import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {ConnectionFormComponent} from './connection-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ConnectionFormComponent
  ],
  declarations: [
    ConnectionFormComponent
  ]
})
export class ConnectionFormModule { }
