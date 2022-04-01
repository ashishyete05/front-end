import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:Employee[];
  constructor(private empSvc:EmployeeService, private router:Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(){
    this.empSvc.getEmployeesList().subscribe(data=>{
      this.employees=data;
    })
  }

  updateEmployee(id:number){
    this.router.navigate(['/update-employee',id])
  }

  deleteEmployee(id:number){
    console.log("deleting emp with id : "+id);
    this.empSvc.deleteEmployeeById(id).subscribe(data=>{
      this.getEmployees();
    })
  }

  employeeDetails(id:number){
    console.log("view employee details called");
    this.router.navigate(['employee-details',id]);
  }
}
