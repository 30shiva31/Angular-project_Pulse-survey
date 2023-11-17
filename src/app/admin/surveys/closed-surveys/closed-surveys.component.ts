import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserDataService } from 'src/app/services/user-data.service';
import { RelaunchSurveyComponent } from './relaunch-survey/relaunch-survey.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ServicesService } from 'src/app/services/services.service';

import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';

@Component ({
  selector: 'app-closed-surveys',
  standalone: true,
  imports: [CommonModule,NgSelectModule,FormsModule,BsDatepickerModule,RelaunchSurveyComponent],
  templateUrl: './closed-surveys.component.html'
})

export class ClosedSurveysComponent {

  @ViewChild('dateRangeCalendar') dateRangCalendar!: ElementRef;
  closedSurveys:any;
  bsModalRef!: BsModalRef;
  filteredSurveys: any;
  selectedFilterId: any;
  inputTextFilter: string = '';
  selectedDate: any;
  combinedFilterArray: any;
  filterStartDate: any;
  filterEndDate:any;

  filterOptions = [
      { id: 1, name: 'past 7 days' },
      { id: 2, name: 'past 14 days' },
      { id: 3, name: 'past 21 days' },
      { id: 4, name: 'custom range' },
  ];

  constructor(private httpService:ServicesService,public modalService: BsModalService, private router: Router,private behaviorSubjectService:UserDataService,private ModalService:ModalServiceService){}

  ngOnInit(){
    this.httpService.surveyEdited$.subscribe((updated) => {
      if (updated) {
       this.showClosedSurveys();
    }});

    this.httpService.getClosedSurveys().subscribe({
      next:(data)=>{
        this.closedSurveys = data;
        this.filteredSurveys = data;
        this.combinedFilterArray = data;
      },
      error:(e)=>{
        console.log(e);
      }
    });

    this.showClosedSurveys();
  }

  filterOnInput(event: any) {
    this.inputTextFilter = event.value.trim();
    if(this.selectedFilterId == 4)
      this.combinedSelectFilter(this.selectedFilterId,this.filterStartDate,this.filterEndDate);
    else
      this.combinedSelectFilter(this.selectedFilterId);
}

filterDropDown(id: number) {
    if(id==4){
      this.dateRangCalendar.nativeElement.click();
    }
    else
      this.combinedSelectFilter(id);
}

combinedSelectFilter(id: number, setBeginDate?: any, setEndDate?: any){
    this.selectedFilterId = id;
    let today = new Date();
    let beginDate = new Date(today);
    let endDate = new Date(today);
    if (id == 4) {
        beginDate = new Date(setBeginDate);
        endDate = new Date(setEndDate);
    }
    else{
        beginDate.setDate(today.getDate() - 7 * id);
        endDate.setDate(today.getDate());
    }
    if(this.selectedFilterId){
        this.filteredSurveys = this.closedSurveys.filter((survey: any) => {
            let launchedDate = new Date(survey.launchedOn);
              return launchedDate >= beginDate && launchedDate <= endDate;
            });
        this.combinedFilterArray = this.filteredSurveys;
    }
        this.filteredSurveys = this.combinedFilterArray.filter((survey: any) => {
            return survey.surveyTitle.toLowerCase().includes(this.inputTextFilter.toLowerCase());
        });
}

onDateChange(dateRange: any) {
    this.filterStartDate = dateRange[0];
    this.filterEndDate = dateRange[1];
    this.combinedSelectFilter(4, dateRange[0], dateRange[1]);
}

reset(){
    this.selectedFilterId = null;
    this.inputTextFilter = '';
    this.selectedDate = null;
    this.filteredSurveys = this.closedSurveys;
}

  toggleDropdown(survey: any) {
    survey.dropdownOpen = !survey.dropdownOpen;
  }

  reLaunchSurvey(survey:any){
    this.bsModalRef = this.modalService.show(RelaunchSurveyComponent, { class: 'small-modal' });
    this.ModalService.setupdateSurvey(survey);
    survey.dropdownOpen = false; 
  }

  showClosedSurveys(){
    this.httpService.getClosedSurveys().subscribe({
      next:(data)=>{
        this.closedSurveys = data;
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }

  viewSurvey(survey:any){
    this.behaviorSubjectService.setViewSurveyId(survey.surveyId);
    this.router.navigate(['pulseSurvey/home/Admin/surveys/closed/view']);
  }

}
