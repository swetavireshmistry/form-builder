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

  @ViewChildren ('checkBox' ) checkBox:QueryList<any>;
  checked: any = [];

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
    checked.forEach(data => {
      this.checked.push ({
        'checked' : data.checked,
        'value':  data.value
      })
      this.questions[index].data = this.checked;
    })
  }

  saveAnswer() {
    this.commonService.answers.next(this.questions);
    this.router.navigate(['/form','answers']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
