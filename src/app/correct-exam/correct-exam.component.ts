import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';
import {base_url} from '../../environments/environment';

@Component({
	selector: 'app-correct-exam',
	templateUrl: './correct-exam.component.html',
	styleUrls: ['./correct-exam.component.css']
})
export class CorrectExamComponent implements OnInit {
	idProf = new CheckCookies(this.cookie).getId();
	examId = this.route.params['_value'].examId;
	studentId = this.route.params['_value'].studentId;

	exam = {
		name: '',
		nomEtudiant: ''
	};

	questions = [];

	choices = [];

	types = {
		SHORT: 0,
		LONG: 1,
		MULTIPLE: 2,
		SINGLE: 3,
		FILE: 4
	};

	constructor(private route: ActivatedRoute, private http: HttpClient, private cookie: CookieService) {
	}

	ngOnInit(): void {
		this.http.get(base_url + 'getExamHeader/' + this.examId + '/' + this.studentId).subscribe(res => {
			// @ts-ignore
			this.exam = res;
			console.log('EXAM DETAILS ', res);

			this.http.get(base_url + 'exams/responses/' + this.examId + '/' + this.studentId).subscribe((res: Array<any>) => {
				this.choices = res;
				console.log('answers', this.choices);
				this.http.get(base_url + 'exams/questions/' + this.examId).subscribe((res: Array<any>) => {
					console.log('questions', res);
					for (let ans of this.choices) {
						this.questions.push(res[ans.index]);
					}
				});
			});
		});
	}

	saveResults() {
		console.log("answers",this.choices);
		this.http.post(base_url+"updateMark/"+this.studentId+"/"+this.examId,this.choices).subscribe(res=>{
			console.log(res);
		})
	}
}
