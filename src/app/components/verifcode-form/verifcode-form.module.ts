import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {VerifcodeFormComponent} from "./verifcode-form.component";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    VerifcodeFormComponent
  ],
  declarations: [
    VerifcodeFormComponent
  ]
})
export class VerifcodeFormModule {}
