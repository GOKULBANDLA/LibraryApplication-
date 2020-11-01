import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from './model.review';
import { UserService } from './../user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.sass']
})
export class ReviewComponent implements OnInit {

  constructor(private service: UserService) { }
 _review: Review = {
   bookid: null,
   userid: null,
   rating: null,
   review: null
 };
  ratings: number[];

  ngOnInit() {

    this.ratings = [1, 2, 3, 4, 5];
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  reviewSubmit(form: NgForm) {

this.service.postReviews(form.value).subscribe(
  x => {
    Swal('Added Review on Book');
    this.resetForm(form);

  }, error => {
    Swal('Oops', 'Review was not added ', 'error');
  }
);
  }
}
