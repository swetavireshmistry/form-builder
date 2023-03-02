import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddQuestionModalComponent} from "../../components/add-question-modal/add-question-modal.component";
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonService} from "../../services/common.service";


export interface Question {
  answerType: string;
  question: string;
  options: any;
  data: any;
  isAllowUser: boolean;
  userId: string;
  isRequired: boolean;
  requiredMessage: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  AddQuestionForm: FormGroup;
  questions: Question[] = [];
  checked: any = [];
  userId = '1234'

  @ViewChildren ('checkBox' ) checkBox:QueryList<any>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  addQuestionClicked() {
    const dialogRef = this.dialog.open(AddQuestionModalComponent, {
      width: '650px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.questions.push(result.value)
      })
  }

  onChange(checkbox: any, index: any) {
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);

    if (checked.length) {
      checked.forEach(data => {
        data.isOtherValue = '';
        data.isOther = false;
        if (data.value === 'Other') {
          data.isOther = data.checked === true;
        }

        if (!data.questionIndex) {
          data.questionIndex = index;
        }

        if (data.questionIndex === index) {
          this.checked.push ({
            'checked' : data.checked,
            'value':  data.value,
            'isOther': data.isOther,
            'isOtherValue': data.isOtherValue
          })
        }
        this.questions[index].data = this.checked;
      })
    } else {
      this.questions[index].data = [];
    }
  }

  saveAnswer() {
    this.questions.map((question) => {
      if (question.answerType === 'checkbox') {
        const isOtherFindIndex = question.data.findIndex((d: any) => d.value === 'Other' && d.isOtherValue !== '')
        if (isOtherFindIndex > -1) {
          question.data[isOtherFindIndex].value = question.data[isOtherFindIndex].value + ' - ' + question.data[isOtherFindIndex].isOtherValue
        }
      }
    })
    this.commonService.answers.next(this.questions);
    this.router.navigate(['/form','answers']);
  }

  isDisable(): boolean {
    let isDisable = false;
    this.questions.map((question) => {
      if (question.isRequired && (!question.data || question.data.length === 0) && question.isAllowUser) {
        isDisable = true
      }
    })
    return isDisable;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
