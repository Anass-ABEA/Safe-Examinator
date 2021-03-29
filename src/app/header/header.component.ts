import { Component, OnInit } from '@angular/core';
import CheckCookies  from '../CheckCookies';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookie : CookieService) { }
	check = new CheckCookies(this.cookie);
	isProf = -1;
  ngOnInit(): void {
  	this.isProf = this.check.isProf();
  }
}
