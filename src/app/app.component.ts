import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'AnytimeLibrary';
  constructor(location: PlatformLocation, private router: Router) {
    location.onPopState(() => {

    this.router.navigate(['/']);


    });

}
}
