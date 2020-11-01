import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../user.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { Ng6SocialButtonModule, SocialServiceConfig } from 'ng6-social-button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PickListModule } from 'primeng/picklist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { OrderListModule } from 'primeng/orderlist';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { getAuthServiceConfigs } from '../app.module';
import { HomeComponent } from '../home/home.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SearchComponent } from '../search/search.component';
import { CartComponent } from '../cart/cart.component';
import { BooksHistoryComponent } from '../books-history/books-history.component';
import { ReviewComponent } from '../review/review.component';
import { AdminComponent } from '../admin/admin.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,
        SignUpComponent, SearchComponent, CartComponent, BooksHistoryComponent, ReviewComponent, AdminComponent, UserProfileComponent, PageNotFoundComponent ],
      imports: [BrowserModule,Ng6SocialButtonModule, AppRoutingModule, FormsModule, HttpClientModule, PickListModule,
        InputTextModule, DropdownModule, ButtonModule, DialogModule, BrowserAnimationsModule, TableModule,
        AccordionModule, CardModule, FileUploadModule, OrderListModule,TabViewModule,TooltipModule,ListboxModule,MatMenuModule,MatIconModule
       , MatToolbarModule,MatButtonModule  // Configurations
      ],
      providers:[UserService, {
        provide: SocialServiceConfig,
        useFactory: getAuthServiceConfigs
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
