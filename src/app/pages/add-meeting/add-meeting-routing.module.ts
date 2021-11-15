import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMeetingPage } from './add-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: AddMeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMeetingPageRoutingModule {}
