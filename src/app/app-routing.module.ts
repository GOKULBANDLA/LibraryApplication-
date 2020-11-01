import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { BooksHistoryComponent } from './books-history/books-history.component';
import { ReviewComponent } from './review/review.component';
import { AdminComponent } from './admin/admin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/AnytimeLibrary', pathMatch: 'full' },
  { path: 'AnytimeLibrary', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'Cart', component: CartComponent },
  { path: 'BooksHistory', component: BooksHistoryComponent },
  { path: 'Review', component: ReviewComponent },
  {path:'Admin',component:AdminComponent},
  {path:'Profile',component:UserProfileComponent},

  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],



  exports: [RouterModule]
})
export class AppRoutingModule { }
