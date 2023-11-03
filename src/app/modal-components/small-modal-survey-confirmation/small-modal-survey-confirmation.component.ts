import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-small-modal-survey-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-modal-survey-confirmation.component.html',
  styleUrls: ['./small-modal-survey-confirmation.component.scss']
})
export class SmallModalSurveyConfirmationComponent {

    constructor(public modalRef: BsModalRef, private udService: UserDataService){}

    submitSurevyQuestions(){
      console.log("submiting");
      this.udService.setSurveyQuestionsConfirmation(true);
      this.modalRef.hide();
    }
}