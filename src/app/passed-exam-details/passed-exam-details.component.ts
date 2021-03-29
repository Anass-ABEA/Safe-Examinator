import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';

@Component({
  selector: 'app-passed-exam-details',
  templateUrl: './passed-exam-details.component.html',
  styleUrls: ['./passed-exam-details.component.css']
})
export class PassedExamDetailsComponent implements OnInit {
	isProf =null;
  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
  	this.isProf = new CheckCookies(this.cookie).isProfBoolean();
  }

}
