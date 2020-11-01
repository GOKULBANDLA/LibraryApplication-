import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../sign-up/user.model';

import  Swal  from 'sweetalert2';
import { vaLogin } from '../sign-up/login.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  user: User = {
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
userid:number=0;
  logindetails: vaLogin = {
    UserName: null,
    Password: null
  };
  constructor(public http: HttpClient, public service: UserService,public router:Router) {}

  ngOnInit() {
    localStorage.clear();
  }

  login: number=0;

  //Method invoked after clicking login button

  OnSubmit(form: NgForm) {
    this.logindetails = form.value;
    this.service.loginValidation().subscribe((x: User[]) => {
      if (x != null) {
        for (var i = 0; i < x.length; i++) {
          if (
            x[i].UserName == this.logindetails.UserName &&
            x[i].Password == this.logindetails.Password
          ) {
            this.login = 1;
            this.userid=x[i].id;
            this.service.userId=this.userid;
            localStorage.setItem('userid',JSON.stringify(btoa(this.userid.toString())));
            break;

          } else {
            this.login = 0;
          }
        }
        if (this.login == 1) {
        
          form.resetForm();
          this.router.navigate(['/search']);
        } else {
          Swal("Invalid Username/Password");
        }
      }
    });
  }
  admin(form: NgForm) {

    this.logindetails = form.value;
    if(this.logindetails.UserName=="admin"&& this.logindetails.Password=="mindtree@123")
    {

      this.router.navigate(['/Admin']);
    }
    else
    {
      Swal("Sorry ! You are not authorized");
    }
  }
}
