import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginViewModel } from './login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL="http://localhost:8082/api/v1";
  constructor(private httpClient:HttpClient ,private jwtHelperService :JwtHelperService) { }
  currentUserName:any;

  public authenticateUserService(loginViewModel :LoginViewModel) :Observable<any>
  {
    console.log("calling authenticate method -- of service")
    return this.httpClient.post<any>(this.baseURL+"/authenticate",loginViewModel,{responseType:"json"})
    .pipe(map((res: any) => {
      if(res){
        this.currentUserName=loginViewModel.username;
        sessionStorage.currentUser = JSON.stringify(res);
        console.log("Printing the jtw token :" + JSON.stringify(res));
      }
      return res;
    }));
  }


  public logout(){
    console.log("logout was called");
    sessionStorage.removeItem("currentUser");
    this.currentUserName=null;
  }

  public isAuthenticated(): boolean
  {
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as any).token : null;
    if (this.jwtHelperService.isTokenExpired())
    {
      return false; //token is not valid
    }
    else
    {
      return true; //token is valid
    }
  }


}
