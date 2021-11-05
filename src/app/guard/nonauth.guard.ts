import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NonauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if(!this.authService.isLogged()){
      if(this.authService.hasLocalStorage()){
        this.router.navigate(["/home"]);
        return false;
      }else{
        return true;
      }
    }else return true;
  }

}
