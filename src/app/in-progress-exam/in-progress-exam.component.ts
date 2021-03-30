import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';

@Component({
  selector: 'app-in-progress-exam',
  templateUrl: './in-progress-exam.component.html',
  styleUrls: ['./in-progress-exam.component.css']
})
export class InProgressExamComponent implements OnInit {
	isProf: boolean;

  constructor(private cookie:CookieService) { }

  ngOnInit(): void {
  	this.isProf = new CheckCookies(this.cookie).isProfBoolean();
  }

}
