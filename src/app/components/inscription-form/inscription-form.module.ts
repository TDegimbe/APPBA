import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import {InscriptionFormComponent} from './inscription-form.component';

@NgModule({
  imports: [
    IonicModule,
  ],
  exports: [
    InscriptionFormComponent
  ],
  declarations: [
    InscriptionFormComponent
  ]
})
export class InscriptionFormModule {}
