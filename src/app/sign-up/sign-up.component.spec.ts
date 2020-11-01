import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { MethodFn } from '@angular/core/src/reflection/types';
import { never } from 'rxjs';
describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let debugElement: DebugElement;
  let submitEl: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [BrowserModule,  FormsModule,  BrowserAnimationsModule,HttpClientModule ],
      providers:[UserService],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    expect(component.ngOnInit).toBeTruthy();
    fixture.detectChanges();
  });


  it('Validating function after Button click', () => {


let button = fixture.debugElement.nativeElement.querySelector('button');
button.click();

fixture.whenStable().then(() => {
expect(component.onSubmit).toBeTruthy();

 fixture.detectChanges();
});

  });

  it('Checking ngOninit Working', () => {


  if( component.ngOnInit){
    console.log("Ngonit Worked");
  }
  else

  {
    console.log("Ngonit not Worked");
  }
    fixture.detectChanges();


      });
});
