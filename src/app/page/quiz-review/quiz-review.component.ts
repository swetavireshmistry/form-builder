import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-quiz-review',
  templateUrl: './quiz-review.component.html',
  styleUrls: ['./quiz-review.component.scss']
})
export class QuizReviewComponent implements OnInit {
  answers: any = [];

  constructor(private commonService: CommonService) {
    this.commonService.answers.subscribe((res: any) => {
      this.answers = res;
    })
  }

  ngOnInit(): void {
  }

}
