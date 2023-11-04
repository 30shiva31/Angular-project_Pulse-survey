import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ServicesService } from 'src/app/services/services.service';
import { RouterLink } from '@angular/router';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-close-survey',
  standalone: true,
  imports: [CommonModule, RouterLink, BsDatepickerModule, ReactiveFormsModule],
  providers: [BsModalService, BsDatepickerConfig],
  templateUrl: './close-survey.component.html',
  styleUrls: ['./close-survey.component.scss']
})
export class CloseSurveyComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> = {
    showWeekNumbers: false,
  };
  @ViewChild('CloseSurveyTemplate', { static: true })
  CloseSurveyTemplate!: TemplateRef<any>;
  modalRef!: BsModalRef;
  survey: any;
  constructor(
    private router: Router,
    private service: ServicesService,
    private modalService: BsModalService,
    private ModalService: ModalServiceService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default' });
    this.bsConfig = {
      showWeekNumbers: false,
    };
  }
  ngOnInit(): void {
    this.ModalService.openSmallModal$.subscribe((data: any) => {
      if (data && data.type === 'closeSurvey') {
        this.openCloseSurveyModal(data.survey);
      }
    });
      
  }
  openCloseSurveyModal(data: any) {
    this.survey = data;
    this.modalRef = this.modalService.show(this.CloseSurveyTemplate, {
      class: 'small-modal',
    });
  }

  hideModal() {
    this.modalRef.hide();
  }

  closeSurvey() {
    this.service.closeSurvey(this.survey.surveyId);
    this.hideModal();
  }


}