import { Component, OnInit } from '@angular/core';
import {ExamRes} from "./ExamType";
import {HttpErrorResponse} from "@angular/common/http";
import {StudentexamsResultsService} from "./studentexams-results.service";
import {CookieService} from "ngx-cookie-service";
import CheckCookies from "../CheckCookies";

@Component({
  selector: 'app-studentexams-results',
  templateUrl: './studentexams-results.component.html',
  styleUrls: ['./studentexams-results.component.css']
})
export class StudentexamsResultsComponent implements OnInit {
	id = "";
  constructor(private cookie: CookieService,private studentexamsresultservice: StudentexamsResultsService ) { }

  ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();
		console.log(this.id);
  	this.getStudentExamResults(this.id);
  }


	Exam: ExamRes = {
  	nomEtud: '',
		listeExamens:[{
  		note:0,
			idConnectedStu:'',
			idExam:'',
			nomeeaxam:'',
			prof:'',
			bareme:0,
			dateexam: new Date(),
  	}]
	}
	public getStudentExamResults(idStudent: string): void{
		this.studentexamsresultservice.getPassedExams(idStudent).subscribe(
			(res: ExamRes) => {
				console.log(res);
				res.listeExamens.sort(function (a , b){
					// @ts-ignore
					return new Date(b.dateexam)- new Date(a.dateexam);
				});
				this.Exam= res;
				// console.log(res);
				// console.log(res.listeExamens[0].dateexam);
				// console.log(res.listeExamens[1].dateexam);
				// console.log(res.listeExamens[0].dateexam>res.listeExamens[1].dateexam);
			},

			(error: HttpErrorResponse) => {
				alert(error.message);
			}
		);
	}

	Decision(note: number,bareme: number): boolean{
  	if((note/bareme)*100>60){
  		return true
		}
  	return false
	}

	Pourcentage(note: number, bareme: number) {
		return ((note/bareme)*100).toFixed(1);
	}
}
