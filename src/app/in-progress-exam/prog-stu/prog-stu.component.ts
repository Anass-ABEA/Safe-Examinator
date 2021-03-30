import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prog-stu',
  templateUrl: './prog-stu.component.html',
  styleUrls: ['./prog-stu.component.css']
})
export class ProgStuComponent implements OnInit {
	exam = {
		title : "EXAM TITLE"
	}
	isReady = false;
	examIntro = true;
  constructor() { }

  ngOnInit(): void {
  }

	getStarted() {
		if(!this.isReady){
			this.isReady = true;
			return ;
		}
		this.examIntro = false;
	}
}
