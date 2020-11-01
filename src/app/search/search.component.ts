import { Component, OnInit } from "@angular/core";
import { Bookdetails } from "../books/bookdetails";
import { UserService } from "../user.service";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { Cart } from "../cart/model_cart";
import { AdminBooks } from './../admin/Adminbooks';
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.sass"]
})
export class SearchComponent implements OnInit {
  category:String[] =[]; //fetches all categories from json
  uniqueCategories:any[]; //stores unique categories
  categoryname: String[]; //to store category from html
  allUserbooksinCart: Cart[] = []; //All  book details mapped with userid and bookid
  sourcebooks: AdminBooks[];
  books_Category: AdminBooks[];
  userBookDetails: Cart[] = []; //present user book Details
  Cartbooks: Bookdetails[]; //Array to store user added books
  activeBooks: number;
  constructor(private service: UserService, private route: Router) {}
  maxdate: Date;
  public todayDate: Date = null;
  bookID:Cart[]=[];
  ngOnInit() {
    this.todayDate=new Date(new Date().toISOString().split("T")[0]);
    this.maxdate = null;
    this.Cartbooks = [];
    this.fetchBooks();
    this.category = [];
    this.categoryname = [];
    this.activeBooks = 0;
  }

  fetchBooks() {
    this.service.Fetchdetails().subscribe((x:AdminBooks[]) => {
      this.sourcebooks = x;
      this.books_Category = x;

      this.sourcebooks=this.sourcebooks.filter(x=>(x.count)>0);
      for (var i = 0; i < x.length; i++) {
        this.category.push(x[i].categories.toString()); //adding categories to category array
      }
      this.category = this.category.filter(x => x != undefined); //removing undefined values

      //to remove duplicate values

      for(var k=0;k<this.category.length;k++)
     {
     for(var y=k+1;y<this.category.length;y++)
     {
       if(this.category[k].toString()===  this.category[y].toString())
       {
         this.category[k]='';
       }
     }
 }

    this.category = this.category.filter(x => x != ''); //removing empty values

 this.filterBooksinCart();

    });


  }


  filterBooksinCart()
  {
    this.service.fetchbooksAssignedtoUser().subscribe((x: Cart[]) => {
     this.allUserbooksinCart = x;

      //collecting books which are already in cart both expired and non expired
 // this.bookID=this.allUserbooksinCart.filter(x=>x.bookid!=undefined);  //fetching already assigned books


 //REmoving nonexpired books
 // for(var k=0;k<this.bookID.length;k++)
  //{
    // var d= (new Date((this.bookID[k].toDate).toLocaleString().split("T")[0]));

      //if(d>this.todayDate)
      //{
       // var index=this.books_Category.findIndex(x=>x.title.toString()==this.bookID[k].title.toString())
      //     this.books_Category.splice(index,1);

     // }

 // }

  var userid=parseInt( atob( JSON.parse(localStorage.getItem('userid')))); //fetching userid from jSOn
 // this.sourcebooks =this.books_Category.filter(x=>x!=undefined);

      this.userBookDetails = this.allUserbooksinCart.filter(
        x => (x.userId == userid)
      );

      for (var k = 0; k < this.userBookDetails.length; k++) {
        var date = this.userBookDetails[k].toDate.toString().split("T")[0];
        this.maxdate = new Date(date);
        if (this.maxdate > this.todayDate) {  //checking active users active books in cart
          this.activeBooks++;                 //incrementing if book is active
        }
         else {

          continue;
        }
      }

    });
  }
  //filtering books based on dropdown value

  booksFilter() {
    this.sourcebooks = this.books_Category.filter(
      x =>
       ( x.categories == this.categoryname)

    );
   this.sourcebooks=this.sourcebooks.filter(x=>x.count>0);
  }
  addtocart() {
    if (this.Cartbooks.length > 3) {
      swal("Oops", "You cannot add more than 3 books ", "error");
    }
    if (this.Cartbooks.length == 0) {
      swal("Oops", "Please add books into Cart ", "error");
    }
    if (this.Cartbooks.length > 0 && this.Cartbooks.length <= 3) {
      if (this.Cartbooks.length + this.activeBooks > 3) {
        swal({
          title: "Oops!",
          text: "Maximum books exceeded in your Account",
          type: "error"
        });
      } else {
        localStorage.setItem("cartdetails", JSON.stringify(this.Cartbooks));
        this.activeBooks=0;
        this.fetchBooks();
        this.route.navigate(["/Cart"]);
      }
    }
  }
}
