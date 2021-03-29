import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	isProf = null;

  constructor(private cookie:CookieService ) { }

  ngOnInit(): void {
  	this.isProf = new CheckCookies(this.cookie).isProfBoolean();
  }

}
