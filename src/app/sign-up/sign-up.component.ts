import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../user.service';
import Swal from 'sweetalert2';
import { User } from './user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  constructor( private service: UserService) {}

  signupDetails: User = {
    id: null,
    Name: null,
    UserName: null,
    Email: null,
    Password: null,
    Gender: null,
    Age: null,
    mobileNo: null,
    profilepic: null
};
  emailPattern =
    '^[A-Za-z0-9_]+(?:\\.[a-z0-9A-Z]+)*@[A-Za-z]+\\.[A-Za-z]{2,64}$';
  agePattern = '^(1[89]|[2-9][0-9])$';
  genders: string[];
  registeredUsers: User[] = [];
  mobPattern = '[6789][0-9]{9}';
  userPattern = '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,15}$';
  passwordPattern =
    '((?=.*\\d)(?=.*[a-z])(?=.*[@#$%!&\'()*+,-./:;<=>?{}|~^]).{6,15})';
  fullnamePattern = '([A-Za-z]+)\\s*([A-Za-z]+)\\s*([A-Za-z]+)';
  ngOnInit() {
    this.resetForm();

    this.genders = ['Male', 'Female', 'Others'];
  }

  // For restting Signup Form
  resetForm(form?: NgForm) {
    if (form != null) { form.resetForm(); }
  }

  // Method invoked on Signup

  onSubmit(form: NgForm) {

  if(form==null)
  {
    Swal("Enter Details");
  }
    this.signupDetails = form.value;
    this.service.loginValidation().subscribe((x: User[]) => {
      this.registeredUsers = x;

      if (this.registeredUsers.find(x => x.Email === this.signupDetails.Email)) {

        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'Already Email Exists'
        });

      } else if (this.registeredUsers.find(x => x.UserName === this.signupDetails.UserName)) {
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'UserName Email Exists'
        });
      } else {

        this.service.SaveUserDetails(form.value).subscribe(

          () => {
            this.resetForm(form);
            Swal('Registered Successfully');
          },
          error => {
            Swal('Not Registered'+" "+error);
          }
        );
      }
    });

  }


}
