import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {AuthGuard} from "../../guard/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'user-view',
        loadChildren: () => import('../user-view/user-view.module').then( m => m.UserViewPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'my-meetings',
        loadChildren: () => import('../my-meetings/my-meetings.module').then(m => m.MyMeetingsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'meetings-view',
        loadChildren: () => import('../meetings-view/meetings-view.module').then(m => m.MeetingsViewPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/meetings-view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
