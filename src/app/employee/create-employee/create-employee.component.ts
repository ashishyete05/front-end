import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee:Employee = new Employee();
  employeeForEmailCheck:Employee = new Employee();
  emailMessage:any="";
  constructor(private empSvc: EmployeeService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.empSvc.createEmployee(this.employee).subscribe(data=>
      {console.log("Employee Creation Success");
      }
    )
    this.goToEmployeeList();
  }

  goToEmployeeList(){
    this.router.navigate(['/employee-list']);
  }

  checkForEmail(email:string){
    this.empSvc.checkForEmailService(email).subscribe(data=>{
      this.employeeForEmailCheck = data;
      if(this.employeeForEmailCheck==null){
        this.emailMessage="Available";
      }else{
        this.emailMessage="Email Already Exist";
      }
    })
  }

}
