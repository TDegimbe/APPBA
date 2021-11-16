import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {InscriptionFormComponent} from './inscription-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    InscriptionFormComponent
  ],
  declarations: [
    InscriptionFormComponent
  ]
})
export class InscriptionFormModule {}
