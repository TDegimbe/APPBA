import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifcodePage } from './verifcode.page';

const routes: Routes = [
  {
    path: '',
    component: VerifcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifcodePageRoutingModule {}
