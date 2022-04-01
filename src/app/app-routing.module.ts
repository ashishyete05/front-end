import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about/about.component';
import { CanActivateGuardService } from './employee/can-activate-guard.service';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { LoginComponent } from './employee/login/login.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

const routes: Routes = [
  {path :'employee-list', component:EmployeeListComponent, canActivate:[CanActivateGuardService]},
  {path :'create-employee', component:CreateEmployeeComponent,canActivate:[CanActivateGuardService]},
  {path :'about', component:AboutComponent},
  {path :'update-employee/:id', component:UpdateEmployeeComponent,canActivate:[CanActivateGuardService]},
  {path :'employee-details/:id', component:ViewEmployeeComponent,canActivate:[CanActivateGuardService]},
  {path :'login', component:LoginComponent},
  {path :'', redirectTo:'login' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
