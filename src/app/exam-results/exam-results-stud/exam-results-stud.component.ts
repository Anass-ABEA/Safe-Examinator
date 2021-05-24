import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';

@Component({
	selector: 'app-exam-results-stud',
	templateUrl: './exam-results-stud.component.html',
	styleUrls: ['./exam-results-stud.component.css']
})
export class ExamResultsStudComponent implements OnInit {
	id = new CheckCookies(this.cookie).getId();
	id_exam = this.route.params['_value'].examId;
	types = {
		SHORT: 0,
		LONG: 1,
		MULTIPLE: 2,
		SINGLE: 3,
		FILE: 4
	};

	questions = [];
	choices = [];

	constructor(private route : ActivatedRoute,private http:HttpClient,private cookie:CookieService) {
	}

	showDetails = false;

	exam = {
		title: 'JAVA',
		date: '20/04/2021',
		time: '10:00',
		length: {
			h: 1,
			m: 20
		},
		prof: 'J. DOE',
		profEmail: 'jdoe@emi.ac.ma',
		note: 16,
		total: 20,
		Questions: null,
		nbrQuestions : 1,
		canSeeRes :false
	};

	ngOnInit(): void {
		this.http.get(base_url+"students/getExamDetails/"+this.id_exam).subscribe(res=>{
			// @ts-ignore
			this.exam = res;

			this.http.get(base_url + 'exams/responses/' + this.id_exam+"/"+this.id).subscribe((res: Array<any>) => {
				//this.choices = res.splice(0,this.exam.nbrQuestions);
				this.choices = res;
				console.log("answers",this.choices);
				this.http.get(base_url + 'exams/questions/' + this.id_exam).subscribe((res: Array<any>) => {
					//this.questions = res.slice(0,this.exam.nbrQuestions);
					//this.questions = res;
					console.log("questions", res);
					for (let ans of this.choices){
						this.questions.push(res[ans.index]);
					}
				});


			});



		})



	}

	getString(note: number, total: number) {
		return '' + note + '/' + total;
	}

	showExamDetails() {
		this.showDetails = !this.showDetails;
	}
}
