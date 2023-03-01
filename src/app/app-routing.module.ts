import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuizComponent} from "./page/quiz/quiz.component";
import {QuizReviewComponent} from "./page/quiz-review/quiz-review.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form',
  },
  {
    path: 'form',
    children: [
      {
        path: 'builder',
        pathMatch: 'full',
        component: QuizComponent
      },
      {
        path: 'answers',
        pathMatch: 'full',
        component: QuizReviewComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'builder'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
