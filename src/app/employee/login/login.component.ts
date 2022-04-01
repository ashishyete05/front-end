import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { LoginViewModel } from '../login-view-model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginViewModel:LoginViewModel=new LoginViewModel();
  currentUserName:any=null;
  employee: Employee= new Employee();
  loginError:string="";
  constructor(private loginSvc: LoginService,private router :Router) { }

  ngOnInit(): void {
   
  }

  onLoginClick(event: any){
    this.loginSvc.authenticateUserService(this.loginViewModel).subscribe
    ((response)=>{
      console.log("response --- "+response);
      if(response == null){
        this.loginError="Invalid UserName Password";
      }else{
      this.employee = response;
      this.currentUserName= this.loginViewModel.username;
      this.router.navigate(['/employee-list'])
      }
    },
    (error)=>{
      console.log(error);
      this.loginError="Invalid UserName Password";
    }
    )
  }

  

}
