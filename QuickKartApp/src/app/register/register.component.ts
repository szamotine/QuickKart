import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../quickKart-interfaces/user';
import { UserService } from '../quickKart-services/user-service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  msg!: string;
  status: boolean = false;
  credentialStatus: string;
  registerStatus: true;
  errorMsg: string;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private _userService: UserService) {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(12)]],
      gender: ['', [Validators.required]],
      password: ['',[Validators.required]],
      dateOfBirth: ['', checkDate],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(12)]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required]],
      dateOfBirth: ['', checkDate],
      address: ['', [Validators.required]]
    });
  }

  SubmitForm(form: FormGroup) {
   //console.log(form.value.emailId, form.value.password, form.value.gender, form.value.dateOfBirth, form.value.address);
    let flagValid: boolean = false;
    let flagCredCheck: boolean = false;
    let userObj: IUser;

    userObj = {
      emailId: form.value.emailId,
      userPassword : form.value.password,
      gender : form.value.gender,
      dateOfBirth : form.value.dateOfBirth,
      address : form.value.address,
      roleId : 2

    };


    if (this.registerForm.valid) {
      console.log("registerForm is valid");
      flagValid = true;

    } else {
      this.msg = "registerForm is invalid"
    }

    this.CheckCredentials(userObj);

  }

  RegisterUser(userObj: IUser) {
    let regStatus: boolean = false;

    this._userService.RegisterUser(userObj).subscribe(
      responseRegisterStatus => {
        regStatus = responseRegisterStatus
        if (regStatus = true) {
          this.msg = "User successfully registered"
          alert("User successfully registered, please log in");
          this.router.navigate(['/login']);
        } else {
          this.msg = "Error: Unable to register user"
        }
      },
      responseRegisterError => {
        this.errorMsg = responseRegisterError},
      ()=> console.log("RegisterUser method executed successfully")
    );

   // return regStatus;
  }

  CheckCredentials(userObj: IUser) {
  
    this._userService.validateCredentials(userObj.emailId, userObj.userPassword).subscribe(
      responseCredentialStatus => {
        this.credentialStatus = responseCredentialStatus;
        if (this.credentialStatus.toLowerCase() != "invalid credentials") {
         
          this.msg = "Credentials exist already, please log in";
          console.log("Credentials exist already");
      
        } else {
  
         // this.msg = "Credentials verified, duplicate does not exist";
          console.log("Credentials verified, duplicate does not exist");
          this.RegisterUser(userObj);
    
        }
      }
    );

  }
 
}

function checkDate(control: FormControl) {
  var currentDate = new Date();
  var givenDate = new Date(control.value);

 // console.log(currentDate);
  //console.log(givenDate);

  if (givenDate <= currentDate || givenDate == null) {
    return null;
  } else {
    return {
      dateError: {
        message: "Enter a date less than today's date"
      }
    };
  }

}
