import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {NonauthGuard} from "./guard/nonauth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'connection-choice',
    loadChildren: () => import('./pages/connection-choice/connection-choice.module').then( m => m.ConnectionChoicePageModule),
    canActivate: [NonauthGuard]
  },
  {
    path: 'connection',
    loadChildren: () => import('./pages/connection/connection.module').then( m => m.ConnectionPageModule),
    canActivate: [NonauthGuard]
  },
  {
    path: 'inscription',
    loadChildren: () => import('./pages/inscription/inscription.module').then( m => m.InscriptionPageModule),
    canActivate: [NonauthGuard]
  },
  {
    path: 'add-meeting',
    loadChildren: () => import('./pages/add-meeting/add-meeting.module').then( m => m.AddMeetingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cgu',
    loadChildren: () => import('./pages/cgu/cgu.module').then( m => m.CguPageModule)
  },  {
    path: 'verifcode',
    loadChildren: () => import('./pages/verifcode/verifcode.module').then( m => m.VerifcodePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'meetings-view-filters',
    loadChildren: () => import('./modals/meetings-view-filters/meetings-view-filters.module').then( m => m.MeetingsViewFiltersPageModule)
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
