import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicesService } from '../services/services.service';
import { UserDataService } from '../services/user-data.service';
import jwt_decode from 'jwt-decode';
import { loggeduser } from '../modals/modal';

@Component({
    selector: 'app-login-employee',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login-employee.component.html',
    styleUrls: ['./login-employee.component.scss'],
})
export class LoginEmployeeComponent {
  currentUser:loggeduser={employeeId:'',role:'',emailaddress:'',name:''}
  loginForm!:FormGroup;
  data:any;

  constructor(private fb:FormBuilder,private service:ServicesService, private router:Router, private udService:UserDataService){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  onSubmit(){
    this.service.getVerifyEmployee(this.loginForm.value).subscribe({
      next:(data)=>{
        this.data = data;
        const decodedToken = <any>jwt_decode(this.data.token);
// <<<<<<< master
//         console.log(decodedToken);
//         for( let each in decodedToken){
//           let key = each.split('/').pop();
//           switch(key){
//             case 'EmployeeId': this.currentUser.EmployeeId=decodedToken[each];break;
//             case 'role': this.currentUser.role=decodedToken[each];break;
//             case 'emailaddress': this.currentUser.emailaddress=decodedToken[each];break;
//             case 'name': this.currentUser.name=decodedToken[each];break;
//           }
//         }
//         console.log(this.currentUser)
// =======
//         this.setCurrentUser(decodedToken);
// >>>>>>> master
        this.udService.setCredentials(this.currentUser);
         this.router.navigate(['/pulseSurvey/home']);
      },
      error:(e)=>{
        console.log('Error',e);
      }})
    this.router.navigate(['/pulseSurvey/home']);
  }

  setCurrentUser(decodedToken:any){
    this.currentUser.employeeId=decodedToken['EmployeeId'];
    this.currentUser.role=decodedToken['Role'];
    this.currentUser.emailaddress=decodedToken['Email'];
    this.currentUser.name=decodedToken['Name'];
  }
}