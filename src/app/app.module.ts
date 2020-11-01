import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FileUploadModule} from 'primeng/fileupload';
import { SignUpComponent } from './sign-up/sign-up.component';
import {CardModule} from 'primeng/card';
import { SearchComponent } from './search/search.component';
import {PickListModule} from 'primeng/picklist';
import {InputTextModule} from 'primeng/inputtext';
import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {DropdownModule} from 'primeng/dropdown';
import { CartComponent } from './cart/cart.component';
import {ButtonModule} from 'primeng/button';
import { BooksHistoryComponent } from './books-history/books-history.component';
import { ReviewComponent } from './review/review.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import {TableModule} from 'primeng/table';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {TooltipModule} from 'primeng/tooltip';
import {OrderListModule} from 'primeng/orderlist';
import {TabViewModule} from 'primeng/tabview';
import {ListboxModule} from 'primeng/listbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {
  Ng6SocialButtonModule,
  SocialServiceConfig
} from 'ng6-social-button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [AppComponent,
    HomeComponent,
     SignUpComponent, SearchComponent, CartComponent, BooksHistoryComponent, ReviewComponent, AdminComponent, UserProfileComponent, PageNotFoundComponent],

  imports: [BrowserModule,Ng6SocialButtonModule, AppRoutingModule, FormsModule, HttpClientModule, PickListModule,
    InputTextModule, DropdownModule, ButtonModule, DialogModule, BrowserAnimationsModule, TableModule,
    AccordionModule, CardModule, FileUploadModule, OrderListModule,TabViewModule,TooltipModule,ListboxModule,MatMenuModule,MatIconModule
   , MatToolbarModule,MatButtonModule // Configurations
  ],
  providers: [ {
    provide: SocialServiceConfig,
    useFactory: getAuthServiceConfigs
}],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function getAuthServiceConfigs() {
  const config = new SocialServiceConfig()
      .addFacebook('543456446169191')
      .addGoogle('529148044156-ruq8liuie2i3s3bbj3pgc6dnd62tbve9.apps.googleusercontent.com');

  return config;
}
