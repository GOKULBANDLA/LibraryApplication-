import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../sign-up/user.model';
import { UserService } from '../user.service';
import { SocialLogin } from './socialLoginDetails';
import  Swal  from "sweetalert2";




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  constructor(private service:UserService) { }
 userDetails:User;
 userId:number=0;
 _socialLogin:SocialLogin={  //for Storing SocialLogin Credentials
id:null,
userId:null,
facebookName:null,
facebookMail:null,
googlename:null,
googleMail:null,
facebookImage:null,
googleImage:null

 }
 socialLoginDetails:SocialLogin=null;  //for storing required user SocialLogin details
  ngOnInit() {
this.FetchUser();
this.FetchSocialLoginDetails();
  }
  shareObj = {
    href: 'www.google.com',
    hashtag: '#FACEBOOK-SHARE-HASGTAG'
};
FetchSocialLoginDetails()
{
  this.userId=parseInt(atob( JSON.parse(localStorage.getItem('userid'))));
  this.service.socialLoginDetails().subscribe((data:SocialLogin[])=>{
    this.socialLoginDetails=data.find(x=>x.userId==this.userId);
  });
}
  FetchUser()
  {
    this.userId=parseInt(atob( JSON.parse(localStorage.getItem('userid'))));
    this.service.userDetails(this.userId).subscribe((user:User)=>this.userDetails=user);
  }
  files:File[];
  filestring='';
    getFiles(event) {
      this.files = event.target.files;
      var reader = new FileReader();
      if(this.files[0].type!="image/jpeg")
      {
        Swal("Please Upload Images Only (.jpg)");
      }
      else
      {
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.files[0]);
      }

    }

    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.filestring = btoa(binaryString);
      this.userId=parseInt(atob( JSON.parse(localStorage.getItem('userid'))));
      this.service.userDetails(this.userId).subscribe((user:User)=>{this.userDetails=user
        this.userDetails.profilepic=this.filestring;
        this.service.uploadPic(this.userDetails).subscribe(()=>{
          Swal("Image Updated Successfully");
          this.FetchUser();
        });
      });

    }
    getSocialUser(socialUser) {

      this.userId=parseInt(atob( JSON.parse(localStorage.getItem('userid'))));
      if(socialUser!=null && socialUser!=undefined)
      {
        if(socialUser.provider=="google")
        {

   this.service.socialLoginDetails().subscribe((data:SocialLogin[])=>{

this.socialLoginDetails=data.find(x=>x.userId==this.userId);
if(this.socialLoginDetails!=null)
{
  this._socialLogin.googleMail=socialUser.email;
  this._socialLogin.googleImage=socialUser.image;
  this._socialLogin.googlename=socialUser.name;
  this._socialLogin.userId=this.userId;
  this._socialLogin.id=this.socialLoginDetails.id;
this._socialLogin.facebookImage=this.socialLoginDetails.facebookImage;
this._socialLogin.facebookName=this.socialLoginDetails.facebookName;
this._socialLogin.facebookMail=this.socialLoginDetails.facebookMail;
this.service.socialLoginDetailsUpdate(this._socialLogin).subscribe(()=>{
  Swal("Updated Successfully"); this.FetchSocialLoginDetails();
});
}
else{
  this._socialLogin.googleMail=socialUser.email;
  this._socialLogin.googleImage=socialUser.image;
  this._socialLogin.googlename=socialUser.name;
  this._socialLogin.userId=this.userId;
  this._socialLogin.facebookName=null;
  this._socialLogin.facebookMail=null;
  this._socialLogin.facebookImage=null;
  this.service.socialLoginDetailsAdd(this._socialLogin).subscribe(()=>{
    Swal("Details Added Successfully");
    this.FetchSocialLoginDetails();
  });
}


  });
        }
        if(socialUser.provider=="facebook"){
          this.userId=parseInt(atob( JSON.parse(localStorage.getItem('userid'))));
          this.service.socialLoginDetails().subscribe((data:SocialLogin[])=>{
            this.socialLoginDetails=data.find(x=>x.userId==this.userId);
            if(this.socialLoginDetails!=null)
            {
              this._socialLogin.googleMail=this.socialLoginDetails.googleMail;
              this._socialLogin.googleImage=this.socialLoginDetails.googleImage;
              this._socialLogin.googlename=this.socialLoginDetails.googlename;
              this._socialLogin.userId=this.userId;
              this._socialLogin.id=this.socialLoginDetails.id;
            this._socialLogin.facebookImage=socialUser.image;
            this._socialLogin.facebookName=socialUser.name;
            this._socialLogin.facebookMail=socialUser.email;
            this.service.socialLoginDetailsUpdate(this._socialLogin).subscribe(()=>{
              Swal("Updated Successfully"); this.FetchSocialLoginDetails();
            });
            }
            else
            {

                this._socialLogin.googleMail=null;
                this._socialLogin.googleImage=null;
                this._socialLogin.googlename=null;
                this._socialLogin.userId=this.userId;
                this._socialLogin.facebookName=socialUser.name;
                this._socialLogin.facebookMail=socialUser.email;
                this._socialLogin.facebookImage=socialUser.image;
                this.service.socialLoginDetailsAdd(this._socialLogin).subscribe(()=>{
                  Swal("Details Added Successfully");
    this.FetchSocialLoginDetails();
                });

            }
          });

        }

      }
      else
      {
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'Try After Sometime'
        });
      }


  }

}
