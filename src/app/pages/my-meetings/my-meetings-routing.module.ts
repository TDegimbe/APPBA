import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMeetingsPage } from './my-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: MyMeetingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMeetingsPageRoutingModule {}
