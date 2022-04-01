import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  id:number;
  employee:Employee = new Employee();
  constructor(private route:ActivatedRoute, private empSvc:EmployeeService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.empSvc.getEmployeeById(this.id).subscribe(data=>{
      this.employee=data;
    })
  }

}
