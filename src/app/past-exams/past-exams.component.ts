import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';

@Component({
  selector: 'app-past-exams',
  templateUrl: './past-exams.component.html',
  styleUrls: ['./past-exams.component.css']
})
export class PastExamsComponent implements OnInit {
	isProf = null;

  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
  	const val = new CheckCookies(this.cookie).isProf();
  	switch (val){
			case -1:
				this.isProf = null;
				break;
			case 0:
				this.isProf = false;
				break;
			case 1:
				this.isProf = true;
		}
  }

}
