import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionChoicePage } from './connection-choice.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionChoicePageRoutingModule {}
