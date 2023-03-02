import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent implements OnInit, AfterViewInit {

  questionForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddQuestionModalComponent>,
    private fb: FormBuilder,
  ) {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answerType: 'text',
      isRequired: false,
      isAllowUser: false,
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.questionForm.controls['answerType'].valueChanges.subscribe(type => {
      if (type === 'text') {
        this.questionForm.removeControl('options');
        this.questionForm.addControl('answer', this.fb.control(''));
      } else {
        this.questionForm.addControl('options', this.fb.array([this.fb.control('', [Validators.required])]));
        this.questionForm.removeControl('answer');
      }
    })
  }


  get options(){
    return this.questionForm.get('options') as FormArray;
  }

  addOption(){
    this.options.push(this.fb.control('', [Validators.required]));
  }


  onSubmit() {
    if (this.options) {
      this.options.push(this.fb.control('Other'));
    }
    this.dialogRef.close(this.questionForm);
  }

  get question () {
    return this.questionForm.get('question');
  }
}
