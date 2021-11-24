import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {InscriptionFormComponent} from './inscription-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {IonIntlTelInputModule} from "ion-intl-tel-input";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    IonIntlTelInputModule
  ],
  exports: [
    InscriptionFormComponent
  ],
  declarations: [
    InscriptionFormComponent
  ]
})
export class InscriptionFormModule {}
