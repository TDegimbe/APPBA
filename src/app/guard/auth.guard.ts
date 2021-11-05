import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if(!this.authService.isLogged()){
      if(this.authService.hasLocalStorage()){
        return true;
      }else{
        this.router.navigate(["/connection-choice"]);
        return false;
      }
    }else{
      return true;
    }
  }

}
