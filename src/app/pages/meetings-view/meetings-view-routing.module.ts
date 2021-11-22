import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsViewPage } from './meetings-view.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsViewPageRoutingModule {}
