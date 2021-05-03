import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-results-stud',
  templateUrl: './exam-results-stud.component.html',
  styleUrls: ['./exam-results-stud.component.css']
})
export class ExamResultsStudComponent implements OnInit {
  constructor() { }

  exam ={
  	title : "JAVA",
		date: "20/04/2021",
		time : "10:00",
		length : {
  		h:1,
			m:20
		},
		prof:"J. DOE",
		profEmail:"jdoe@emi.ac.ma",
		note: 16,
		total: 20,
		Questions:null
	}

  ngOnInit(): void {
  }

	getString(note: number, total: number) {
		return ""+note+"/"+total;
	}
}
