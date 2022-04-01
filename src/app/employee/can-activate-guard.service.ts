import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService:LoginService, private router:Router) { }

  canActivate():boolean{
    if(this.loginService.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
  }
      
  }
