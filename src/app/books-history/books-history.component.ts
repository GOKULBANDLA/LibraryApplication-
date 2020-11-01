import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Cart } from '../cart/model_cart';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { Review } from '../review/model.review';
import { DatePipe } from '@angular/common';
import { AdminBooks } from './../admin/Adminbooks';


@Component({
  selector: 'app-books-history',
  templateUrl: './books-history.component.html',
  styleUrls: ['./books-history.component.sass'],

})
export class BooksHistoryComponent implements OnInit {

  constructor(private service: UserService, private route: Router) { }
 renewButton = false;
  userBookDetails: Cart[] = [];
requiredReviews: Review[] = []; // Review array to store one book details
public reqdate: any = new Date().toLocaleString();
bookToRenew: Cart = null;
datePipe = new DatePipe('en-in').transform(this.reqdate, 'yyyy-MM-dd'); //today date
  allUserbooksinCart: Cart[] = [];
  hideModal = false;
  shareObj = {
    href: 'https://www.facebook.com/Anytime-Library-386801965428493/',
    hashtag: '#LOVELY LIBRARY'
};
  ngOnInit() {
this.fetchBooks();
  }

  addReview(bookid: number) {
  localStorage.setItem('bookid', JSON.stringify(btoa(bookid.toString())));
  this.route.navigate(['/Review']);
  }
 fetchBooks() {

  const userid = parseInt(atob( JSON.parse(localStorage.getItem('userid')))); // fetching userid from jSOn
  this.service.fetchbooksAssignedtoUser().subscribe((x: Cart[]) => {
    this.allUserbooksinCart = x;
    this.userBookDetails = this.allUserbooksinCart.filter(
      x => (x.userId === userid &&x.title!=null)
    );
    if (this.userBookDetails.length === 0) {
      Swal('No Books in your Cart');
    }
 });
}
bookReview(bookid) {
this.service.fetchReviews().subscribe((x: Review[]) => {

// tslint:disable-next-line:no-shadowed-variable
this.requiredReviews = x.filter(x => {
  return x.bookid === bookid;
});

}, error => {
  Swal('Oops', 'Review was not able to fetch ', 'error');
}
);
}

renewBookDetails(bookid: any, toDate: any) {

// tslint:disable-next-line:radix
const userid = parseInt(atob( JSON.parse(localStorage.getItem('userid')))); // fetching userid from jSOn
this.service.fetchbooksAssignedtoUser().subscribe((x: Cart[]) => {

  this.bookToRenew = x.find(

    x => (x.userId === userid && x.bookid === parseInt(bookid) && x.toDate.toString().split('T')[0] === toDate.toString().split('T')[0])
  );

  if (this.bookToRenew.renewCode === 'Requested' ) {
    this.renewButton = true;
  }
  if (this.bookToRenew.renewCode === 'Active') {
    this.renewButton = false;
  }
  const todayDate = new Date(new Date().toISOString().split('T')[0]);
  const date = toDate.toString().split('T')[0];
  const maxdate = new Date(date);
  const diff = Math.floor((Math.abs(new Date(maxdate).getTime() - new Date(todayDate).getTime()) / (1000 * 60 * 60  * 24)));
  if (diff === 10) {
     this.renewButton = true;
  }
});
}

renew(book: Cart) {
  const date = new Date();

//  var newMaxDate= new Date(date.getTime() + (1000 * 60 * 60 * 240));
// book.fromDate=date;
// book.toDate=newMaxDate;
// this.renewButton=true;
book.requestedDate = new Date(date.getTime() + (1000 * 60 * 60 * 240));
book.renewCode = 'Requested';
this.service.renewBook(book).subscribe(
  x => {
    Swal('Updated Successfully');
    this.fetchBooks();
  }, error => {
    Swal('Oops', 'Updation Failed', 'error');
  }
);

}
returnBook(book: Cart) {
  const userid = parseInt(atob( JSON.parse(localStorage.getItem('userid'))));
  this.service.returnBook(book.id).subscribe(x => {
    this.service.fetchBookDetailsToUpdateCount(book.bookid).subscribe((x: AdminBooks) => {
      x.count = x.count + 1;
      this.service.bookCountReduce(x).subscribe(x => {
        Swal('Returned Book Successfully');

      });

    }
    );

    this.fetchBooks();

  }, error => {
    Swal('Not Returned! Try after Sometime');
  });
}
}
