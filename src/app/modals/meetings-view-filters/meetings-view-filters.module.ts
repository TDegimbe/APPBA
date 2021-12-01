import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingsViewFiltersPageRoutingModule } from './meetings-view-filters-routing.module';

import { MeetingsViewFiltersPage } from './meetings-view-filters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingsViewFiltersPageRoutingModule
  ],
  declarations: [MeetingsViewFiltersPage]
})
export class MeetingsViewFiltersPageModule {}
