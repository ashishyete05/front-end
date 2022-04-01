import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee:Employee = new Employee();
  id:number;
  constructor(private empSvc:EmployeeService, private router :Router , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.empSvc.getEmployeeById(this.id).subscribe(data =>{
      this.employee=data;
    })
  }

  onSubmit(){
    this.empSvc.createEmployee(this.employee).subscribe(data=>
      {console.log("Update Creation Success");
      }
    )
    this.callGetEmpList();
  }

  private callGetEmpList(){
    this.router.navigate(['/employee-list']);
  }
}
