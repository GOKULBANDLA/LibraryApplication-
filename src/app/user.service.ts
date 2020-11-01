import { Injectable } from '@angular/core';
import { User } from './sign-up/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Bookdetails } from './books/bookdetails';
import { Cart } from './cart/model_cart';
import { Review } from './review/model.review';
import { AdminBooks } from './admin/Adminbooks';
import { SocialLogin } from './user-profile/socialLoginDetails';
import { Profile } from './Shared/ImageSouce';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri: string = 'http://localhost:' + '3000';
  constructor(public http: HttpClient) { }
  Cartbooks: Bookdetails[] = [];

userId: number = null;


  SaveUserDetails(user: User) {
    if(user.Name==''|| user.Name==null || user.Name==undefined)
    {
alert("Enter All details");
    }
    else
   {
    var profile=btoa( "src\assets\profile.jpg");
    user.profilepic=profile;
        return this.http.post('http://localhost:3000/Signup', user);
   }

  }
  loginValidation() {
    return this.http.get('http://localhost:3000/Signup');
  }
  Fetchdetails() {

    return this.http.get(this.uri + '/books');

  }
  addbookstoUser(cartlist: Cart) {
    return this.http.post(this.uri + '/cartbooks', cartlist);
  }
  fetchBookDetailsToUpdateCount(bookid) {
    return this.http.get(this.uri + '/books/' + bookid);
  }
  fetchbooksAssignedtoUser() {
    return this.http.get(this.uri + '/cartbooks');
  }
  postReviews(review: Review) {
    const userid = parseInt(atob(JSON.parse(localStorage.getItem('userid'))));
    const bookid = parseInt(atob(JSON.parse(localStorage.getItem('bookid'))));
    review.bookid = bookid;
    review.userid = userid;
    return this.http.post(this.uri + '/reviews', review);
  }
fetchReviews() {
  return this.http.get(this.uri + '/reviews');
}
renewBook(book: Cart) {
  return this.http.put(this.uri + '/cartbooks/' + book.id, book );
}
AddBooks(AdminBooks: AdminBooks) {
return this.http.post(this.uri + '/books', AdminBooks);
}
adminUpdateBooks(AdminBooks: AdminBooks) {
  return this.http.put(this.uri + '/books/' + AdminBooks.id, AdminBooks);
}
adminDeleteBooks(id) {
  return this.http.delete(this.uri + '/books/' + id);
}
fetchBookDetailsFromApi(isbn: string) {
  let params = new HttpParams();


  params = params.append('q', 'isbn:' + isbn);

 return this.http
    .get('https://www.googleapis.com/books/v1/volumes', { params: params });
}
bookCountReduce(x: AdminBooks) {
  return this.http.put(this.uri + '/books/' + x.id, x);
}
returnBook(bookid) {
  return this.http.delete(this.uri + '/cartbooks/' + bookid );
}
userDetails(id) {
  return this.http.get(this.uri + '/Signup/' + id );
}
uploadPic(user:User)
{
  return this.http.put(this.uri + '/Signup/' + user.id,user );
}
socialLoginDetails()
{
  return this.http.get(this.uri+'/socialLogin');
}
socialLoginDetailsUpdate(socialDetails:SocialLogin)
{
  return this.http.put(this.uri+'/socialLogin/'+socialDetails.id,socialDetails);
}
socialLoginDetailsAdd(socialDetails:SocialLogin)
{
  return this.http.post(this.uri+'/socialLogin',socialDetails);
}
deleteFromUserCart(bookid)
{
  return this.http.delete(this.uri + '/cartbooks/' + bookid );
}
}
