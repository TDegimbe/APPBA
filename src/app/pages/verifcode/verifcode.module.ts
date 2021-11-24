import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifcodePageRoutingModule } from './verifcode-routing.module';

import { VerifcodePage } from './verifcode.page';
import {VerifcodeFormModule} from "../../components/verifcode-form/verifcode-form.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifcodePageRoutingModule,
    VerifcodeFormModule
  ],
  declarations: [VerifcodePage]
})
export class VerifcodePageModule {}
