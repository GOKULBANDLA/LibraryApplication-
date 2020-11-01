import { Component, OnInit } from '@angular/core';
import { Bookdetails } from '../books/bookdetails';
import { UserService } from './../user.service';
import { Cart } from './model_cart';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './../sign-up/user.model';
import { AdminBooks } from './../admin/Adminbooks';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
username = '';
  cartproceed = false;
  constructor(private service: UserService, private route: Router) { }
  Cartbooks: Bookdetails[];
  selectedCartBook: Bookdetails[] = [];
  cartstatus = false;
  cartlist: Cart = {
    title: null,
    authors: null,
    categories: null,
    isbn: null,
    userId: null,
    fromDate: null,
    toDate: null,
    bookid: null,
    imageLinks: null,
    id: null, renewCode: null,
    requestedDate: null, username: null
  };
  cart: Cart[];
  ngOnInit() {
    this.Cartbooks = JSON.parse( localStorage.getItem('cartdetails'));
    this.cart = [];

  }
  Proceed_Cart() {
    // tslint:disable-next-line:radix
    const userid = parseInt(atob( JSON.parse(localStorage.getItem('userid')))); // fetching userid from jSOn
    this.service.userDetails(userid).subscribe((x: User) => {
      this.username = x.UserName;

      for (let i = 0; i < this.Cartbooks.length; i++) {

      const date = new Date();
this.cartlist.title = this.Cartbooks[i].title;
this.cartlist.categories = this.Cartbooks[i].categories;
this.cartlist.isbn = this.Cartbooks[i].isbn;
this.cartlist.userId = userid;
this.cartlist.fromDate = date;
// tslint:disable-next-line:radix
this.cartlist.bookid = parseInt(this.Cartbooks[i].id);
this.cartlist.toDate = new Date(date.getTime() + (1000 * 60 * 60 * 240));
this.cartlist.requestedDate = new Date(date.getTime() + (1000 * 60 * 60 * 240));
this.cartlist.imageLinks = this.Cartbooks[i].imageLinks;
this.cartlist.authors = this.Cartbooks[i].authors;
this.cartlist.renewCode = 'Active';
this.cartlist.username = this.username;
this.service.addbookstoUser(this.cartlist).subscribe(
  // tslint:disable-next-line:no-shadowed-variable
  x => {
    this.service.fetchBookDetailsToUpdateCount(this.cartlist.bookid).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (x: AdminBooks) => {
x.count = x.count - 1;
this.service.bookCountReduce(x).subscribe(
  // tslint:disable-next-line:no-shadowed-variable
  x => this.route.navigate(['/search']));
      }, error => {
        Swal('Failure to Update');
      }
    );
   this.cartstatus = true;
   this.cartproceed = true; // to disable cart button

   Swal('Hurray!', 'Books added into Cart!', 'success');
  }, error => {
    Swal('Not Added Successfully');
  }

);

    }
    }
     );



  }
}
