import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stu-exam-old',
  templateUrl: './stu-exam-old.component.html',
  styleUrls: ['./stu-exam-old.component.css']
})
export class StuExamOldComponent implements OnInit {
	exam={
		title:"Java",
	};
	examId = "";


  constructor(private http:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
  	this.examId = this.route.params['_value'].examid;
  }

}
