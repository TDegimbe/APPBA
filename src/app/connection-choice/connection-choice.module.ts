import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionChoicePageRoutingModule } from './connection-choice-routing.module';

import { ConnectionChoicePage } from './connection-choice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionChoicePageRoutingModule
  ],
  declarations: [ConnectionChoicePage]
})
export class ConnectionChoicePageModule {}
