<<<<<<< HEAD
import { Component,Input,Output , EventEmitter} from '@angular/core';
=======
import { Component,EventEmitter,Input, Output } from '@angular/core';
>>>>>>> upstream/master
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { loggeduser } from 'src/app/modals/modal';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent {

<<<<<<< HEAD
  @Input() userDetails:loggeduser={name:'',emailaddress:'',employeeId:'',role:''};
  @Output() showNavChange = new EventEmitter<boolean>();
  activeItem: any;
=======
  @Output() navigateToProfile: EventEmitter<string>= new EventEmitter<string>();
  @Input() userDetails:loggeduser={name:'',emailaddress:'',employeeId:'',role:''};
>>>>>>> upstream/master
  constructor(private router:Router){}


  ngOnInit(){
    this.userDetails=JSON.parse(<string>localStorage.getItem('currentUser'));
  }
  
  toMe() {
<<<<<<< HEAD
    this.showNavChange.emit(true);
    this.activeItem = 'me';
    this.router.navigate(['/pulseSurvey/home/openSurveys']);
  }

  toAdmin() {
    this.showNavChange.emit(false);
    this.activeItem = 'admin';
    this.router.navigate(['/pulseSurvey/home/Admin/surveys/active']);
=======
    this.navigateToProfile.emit("me");
  }
  toAdmin(){
    this.navigateToProfile.emit("admin");
>>>>>>> upstream/master
  }
}