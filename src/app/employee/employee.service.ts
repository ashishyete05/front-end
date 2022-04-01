import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL="http://localhost:8082/api/v1"
  constructor(private httpClient : HttpClient) { }

  getEmployeesList():Observable<Employee[]>{
    var currentUser = { jwt: "" };
    var headers = new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "* ");
    headers = headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ");
    headers = headers.set("Authorization", "Bearer ");
    if (sessionStorage['currentUser'] != null)
    {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.jwt);
      console.log("Sending header --> "+JSON.stringify(headers));
    }
    console.log("this is called.")
    return this.httpClient.get<Employee[]>(this.baseURL+"/employees",{ headers: headers, responseType: "json" });
  }

  createEmployee(employee:Employee):Observable<any>{
    var currentUser = { jwt: "" };
    var headers = new HttpHeaders();
    headers = headers.set("Access-Control-Allow-Origin", "* ");
    headers = headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ");
    headers = headers.set("Authorization", "Bearer ");
    if (sessionStorage['currentUser'] != null)
    {
      currentUser = JSON.parse(sessionStorage['currentUser']);
      headers = headers.set("Authorization", "Bearer " + currentUser.jwt);
      console.log("Sending header --> "+JSON.stringify(headers));
    }
    console.log("reaching post method of rest call")
    return this.httpClient.post<any>(this.baseURL+"/employee", employee,{ headers: headers, responseType: "json" });
  }

  checkForEmailService(email:string):Observable<Employee>{
    this.jwtTokenAuth();
    console.log("check for email Service called")
    return this.httpClient.get<Employee>(this.baseURL+"/checkEmailAvailability/"+email);
  }

  getEmployeeById(id:number):Observable<Employee>{
    this.jwtTokenAuth();
    console.log("calling getEmpById method for id : "+id);
    return this.httpClient.get<Employee>(this.baseURL+"/employee/"+id);
  }

  deleteEmployeeById(id:number):Observable<Object>{
    this.jwtTokenAuth();
    console.log("delete service invoked!");
    return this.httpClient.delete(this.baseURL+"/employee/"+id);
  }

  private jwtTokenAuth(){
    console.log("jtw Auth is called");
    var currentUser ={jwt:""};
    var headers = new HttpHeaders();
    headers= headers.set("Authorization","Bearer ");
    if(sessionStorage.currentUser!=null){
      currentUser = JSON.parse(sessionStorage.currentUser);
      headers= headers.set("Authorization","Bearer "+currentUser.jwt);
      console.log("Printing header : "+JSON.stringify(headers));
    }
  }

}
