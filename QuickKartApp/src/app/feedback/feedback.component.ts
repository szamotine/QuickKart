import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  msg!: string;

  constructor(private formBuilder: FormBuilder) {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      feedback: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', checkEmail],
      feedback: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  SubmitForm(form: FormGroup) {
   /*
    if (this.feedbackForm.valid) {
      console.log(form.value.name);
      console.log(form.value.email);
      console.log(form.value.feedback);
    } else {
      console.log("Form Invalid");
    }
   */
    if (this.feedbackForm.valid) {
      this.msg = "Feedback has been submitted successfully"
    } else {
      this.msg=" Feedback form invalid, try again"
    }
  }
}

function checkEmail(control: FormControl) {
  var givenEmail = control.value;
 // var reg1 = "/(/w*+)@gmail.com/";
 //var reg2 = /.{1}@gmail.com.*/;
  var reg = /^([A-Za-z0-9_\-\.]+)@gmail.com$/;
  let re = new RegExp(reg);
  if (re.test(givenEmail)) {
    return null;

  } else {
    return {
      emailError: {
        message: "Email invalid, must be ...@gmail.com"
      }
    }
  }


}
