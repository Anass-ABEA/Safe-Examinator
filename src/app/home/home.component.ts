import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	connected = false;
	isProf = false;


  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
  	const checker = new CheckCookies(this.cookie).isProf();

  	if(checker===0){
  		this.connected = true;
			this.isProf = false;
		}
		if(checker===1){
			this.connected = true;
			this.isProf = true;
		}

  }
}
