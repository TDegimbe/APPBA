import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsViewFiltersPage } from './meetings-view-filters.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingsViewFiltersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsViewFiltersPageRoutingModule {}
