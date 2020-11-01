import { Component, OnInit } from '@angular/core';
import { AdminBooks } from './Adminbooks';
import { UserService } from './../user.service';
import { VolumeInfo } from '../books/attributes/volumeInfo';
import { NgForm, FormsModule } from '@angular/forms';
import { ApiResult } from '../Shared/ApiResult';
import { Cart } from './../cart/model_cart';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  styles: [`

    `]
})
export class AdminComponent implements OnInit {

  // ---------------Crud Operations on Books
  allBooks: AdminBooks[];
  deleteButton = true; // To hide delete button
 // numberPattern = "^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$";
 numberPattern = '^[0-9]*$';
  cols: any[]; // To fill table headers and rows
  selectedBook: AdminBooks = null; // For storing Book Values
  newBook: Boolean = false;
  admincols: any[]; // To fill Renewal Table
  cartBookscols: any[]; // To fill Cart Table
  bookDetails: AdminBooks = {
    title: null,
    authors: null,
id: null,
    description: null,
    isbn: null,
    categories: null,

    imageLinks: null,
    language: null,

    ratingsCount: null,
    averageRating: null, count: null
  };
  isbn: string;
  _book: AdminBooks = {
    id: null,
    title: null,
    authors: null,
    categories: null,
    isbn: null,
    imageLinks: null,
    ratingsCount: null,
    averageRating: null,
    language: null,
    count: null,
    description: null
  };
  constructor(private service: UserService, private http: HttpClient) { }
  displayDialog: boolean; // to display dialog for CRUD operation
  i: number;
  ngOnInit() {
    this.getAllBooks();
    this.renewalApprove();
this.fetchBooksAssignedToUser();
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'authors', header: 'Authors' },
      { field: 'categories', header: 'Categories' },
      { field: 'language', header: 'Language' },
      {field: 'isbn', header: 'ISBN' },


      {field: 'ratingsCount', header: 'Ratings Count'},
      {field: 'averageRating', header: 'Average Rating'},
      {field: 'count', header: 'Books Count'}
  ];

  this.cartBookscols = [
    { field: 'title', header: 'Title' },
    { field: 'authors', header: 'Authors' },
    {field: 'userId', header: 'User ID' },
    {field: 'fromDate', header: 'Issued Date' },
    {field: 'toDate', header:'Till Date'},
    {field: 'username', header: 'User Name' },

];
  this.i = 0;
  this.admincols = [
    { field: 'title', header: 'Title' },
    { field: 'language', header: 'Language' },
    {field: 'isbn', header: 'ISBN' },
    {field: 'userId', header: 'User ID' },
    {field: 'fromDate', header: 'FROM' },
    {field: 'toDate', header: 'TO' },
    {field: 'requestedDate', header: 'New Date'},
    {field: 'bookid', header: 'BOOK ID' },
    {field: 'renewCode', header: 'RENEWAL CODE' },

  ];
  }


  showDialogToAdd() {
    this.newBook = true;
    this.deleteButton = false;
    this._book = {
      id: null,
      title: null,
      authors: null,
      categories: null,
      isbn: null,
      imageLinks: null,
      ratingsCount: 0,
      averageRating: 0,
      language: null,
      count: null, description: null
    };
    this.displayDialog = true;
}
save() {
  if (this._book.id == null) {
    this.service.AddBooks(this._book).subscribe(x => {
      Swal('Added Book');
      this.displayDialog = false;
      this.deleteButton = true;
    }, error => {
      Swal('Not Added....Please try after sometime');
    }
    );
  } else {
    this.service.adminUpdateBooks(this._book).subscribe(x => {
      Swal('Updated Book Details');
      this.displayDialog = false;
      this.getAllBooks();
    }, error => {
      Swal('Not Updated Successfully....!');
    }
    );
  }

}
delete() {
  this.service.adminDeleteBooks(this._book.id).subscribe(x => {
    Swal('Deleted book successfully');
    this.displayDialog = false;
    this.getAllBooks();
  }, error => {
    Swal('Not Deleted.Please try later');
  }
  );
}
getAllBooks() {
  this.service.Fetchdetails().subscribe((x: AdminBooks[]) => {
    this.allBooks = x;
  });
}
onRowSelect(event) {
  this.newBook = false;
  this.deleteButton = true;
  this._book = this.cloneCar(event.data);
  this.displayDialog = true;
}
cloneCar(c: AdminBooks): AdminBooks {
  const book = {
    id: null,
    title: null,
    authors: null,
    categories: null,
    isbn: null,
    imageLinks: null,
    ratingsCount: null,
    averageRating: null,
    language: null,
    count: null, description: null
  };


  for (const prop in c) {
      book[prop] = c[prop];
  }
  return book;
}

reset(form?: NgForm) {
if (form != null) {
form.resetForm();
}
}

search(form: NgForm) {
  this.isbn = form.value;
  this.isbn = this.isbn.replace(/[^a-zA-Z0-9]/g, '');

  this.service.fetchBookDetailsFromApi(this.isbn).subscribe((data: ApiResult) => {
      if (data.totalItems < 1) {
        Swal('Sorry....! No Books Found.Add Manually');
      } else {
        this.StoreBookDetails(data.items[this.i].volumeInfo);
        this.reset(form);
      }

    });
}

CheckingBooks(newbook: AdminBooks) {
  this.service.Fetchdetails().subscribe((x: AdminBooks[]) => {

    if (x.find(x => x.title === newbook.title)) {
     Swal('Book is already added');
    } else {

      this.service.AddBooks(newbook).subscribe(x => {
        Swal('Book added Successfully');
        this.getAllBooks();
      });
    }
  });
}
StoreBookDetails(book: VolumeInfo) {
  this.bookDetails.title = book.title;
  this.bookDetails.authors = book.authors;
  this.bookDetails.categories = book.categories;
  this.bookDetails.description = book.description;
  this.bookDetails.imageLinks = book.imageLinks;
  this.bookDetails.language = book.language;
  this.bookDetails.averageRating = book.averageRating;
  this.bookDetails.ratingsCount = book.ratingsCount;
  this.bookDetails.isbn = this.isbn;
  this.bookDetails.count = 1;
  this.CheckingBooks(this.bookDetails);
}


// Renewal Approve Starts------------------------------------->
// tslint:disable-next-line:member-ordering
adminBooksApprove: Cart[];  // To store books to approve for renewal
// tslint:disable-next-line:member-ordering
selectedCartBook: Cart = null;

renewalApprove() {
  this.service.fetchbooksAssignedtoUser().subscribe((x: Cart[]) => {
  this.adminBooksApprove = x;
  // tslint:disable-next-line:no-shadowed-variable
  this.adminBooksApprove = this.adminBooksApprove.filter(x => x.renewCode !== 'Active');
  });
}
bookApprove(data: Cart) {
  data.toDate = data.requestedDate;
data.renewCode = 'Active';
this.service.renewBook(data).subscribe(x => {
  Swal('Succeded');
  this.renewalApprove();
}, error => {
  Swal('Failure');
}
);
}

bookReject(rowData: Cart) {
rowData.renewCode = 'Rejected';
this.service.renewBook(rowData).subscribe(x => {
  Swal('Succeeded');
  this.renewalApprove();
}, error => {
  Swal('Failure');
}
);
}

// Display CartBooks Table
// tslint:disable-next-line:member-ordering
booksWithUser: Cart[];  // To store books to approve for renewal
fetchBooksAssignedToUser() {
  this.service.fetchbooksAssignedtoUser().subscribe((x: Cart[]) => {
    this.booksWithUser = x;

    });
}
deleteCartBook(rowData:Cart)
{
  this.service.deleteFromUserCart(rowData.id).subscribe(x => {
    Swal('Succeeded');
    this.service.fetchBookDetailsToUpdateCount(rowData.bookid).subscribe((x: AdminBooks) => {
      x.count = x.count + 1;
      this.service.bookCountReduce(x).subscribe();

    }
    );
    this.fetchBooksAssignedToUser();
  }, error => {
    Swal('Failure');
  }
  );
}


}
