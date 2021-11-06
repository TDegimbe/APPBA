import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionPageRoutingModule } from './inscription-routing.module';

import { InscriptionPage } from './inscription.page';
import {InscriptionFormModule} from '../../components/inscription-form/inscription-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscriptionPageRoutingModule,
    InscriptionFormModule
  ],
  declarations: [InscriptionPage]
})
export class InscriptionPageModule {}
