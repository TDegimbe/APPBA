import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {ConnectionFormComponent} from './connection-form.component';


@NgModule({
  imports: [
    IonicModule,
  ],
  exports: [
    ConnectionFormComponent
  ],
  declarations: [
    ConnectionFormComponent
  ]
})
export class ConnectionFormModule { }
