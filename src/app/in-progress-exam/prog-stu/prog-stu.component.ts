import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {base_url} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';


@Component({
	selector: 'app-prog-stu',
	templateUrl: './prog-stu.component.html',
	styleUrls: ['./prog-stu.component.css']
})


export class ProgStuComponent implements OnInit {
	id = null;
	isScrolled = false;
	examIntro = true; //default TRUE
	examId = this.route.params['_value'].examId;
	isStarted = true;
	exam = {
		title: 'EXAM TITLE',
		profName: 'DOE J.',
		length: '1h30',
		tries: '1',
		nbrQuestions: '20',
		isFraudOn: true,
	};
	icons = {
		warning: faExclamationTriangle
	};
	isReady = false;


	focusMode = false;
	types = {
		SHORT: 0,
		LONG: 1,
		MULTIPLE: 2,
		SINGLE: 3,
		FILE: 4
	};
	time = {
		h: 1,
		m: 0,
		s: 30
	};
	length = 12;

	questions =[];
	i = 0;


	inter = null;
	choices = [];
	final= false;

	constructor(private http: HttpClient, private route: ActivatedRoute,private cookie:CookieService) {
	}

	ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();

		this.getExamInfo();
		this.getExams();

		window.addEventListener('scroll', (e) => {
			if (e['path'][1]['pageYOffset'] > 0) {
				this.isScrolled = true;
			} else {
				this.isScrolled = false;
			}
		});

		this.length = this.time.s + this.time.m * 60 + this.time.h * 3600;

		this.inter = setInterval(() => {
			this.changeDate();
		}, 1000);
		if (!this.isStarted) {
			window.open('/', '_self');
		}

	}
	getExamInfo(){
		this.http.get(base_url+"exams/firstData/"+this.examId).subscribe((res)=>{
			// @ts-ignore
			this.exam= res;
		});
	}
	getExams(){

		this.questions =  [
			{
				body: 'HELLO THIS IS GOING TO BE A SIMPLE EXAMPLE OF A QUESTION SO PLEASE WAIT',
				type: 0,
				points: 10

			},
			{
				body: 'HELLO THIS IS GOING TO BE A SIMPLE EXAMPLE OF A QUESTION SO PLEASE WAIT',
				type: 2,
				points: 7,
				rep: [
					{val:"lorem",isCorrect:false},
					{val:"lorem",isCorrect:false},
					{val:"lorem",isCorrect:false},
				]
			},
			{
				body: 'HELLO THIS IS GOING TO BE A SIMPLE EXAMPLE OF A QUESTION SO PLEASE WAIT',
				type: 3,
				points: 3,
				rep: [
					{val:"lorem",isCorrect:false},
					{val:"lorem",isCorrect:false},
					{val:"lorem",isCorrect:false},
				]
			},
			{
				body: 'HELLO THIS IS GOING TO BE A SIMPLE EXAMPLE OF A QUESTION SO PLEASE WAIT',
				type: 1,
				points: 5
			}
		];
		this.http.get(base_url+"exams/questions/"+this.examId).subscribe((res)=>{
			this.questions = res;
		})
		this.setupChoices();
	}
	setupChoices(){
		this.choices = [];
		for( let e of this.questions){
			if(e.type==this.types.SHORT){
				this.choices.push({value:""})
			}
			if(e.type==this.types.LONG){
				this.choices.push({value:""})
			}
			if(e.type==this.types.SINGLE || e.type==this.types.MULTIPLE){
				let list = [];
				for (let i=0;i<e.rep.length;i++){
					list.push(false);
				}
				this.choices.push({value:list})
			}
		}
	}
	saveExam(){
		console.log(this.choices);
	}

	endExam() {
		console.log(this.choices);
		clearInterval(this.inter);
		this.time = {
			h: 0,
			m: 0,
			s: 0
		};
		this.final = true;
	}

	changeDate() {
		const val = this.time.s + this.time.m * 60 + this.time.h * 3600 - 1;
		if (val == -1) {
			this.endExam();
		}
		this.time.h = Math.floor((val) / 3600);
		this.time.m = Math.floor((val - this.time.h * 3600) / 60);
		this.time.s = Math.floor((val - this.time.h * 3600 - this.time.m * 60));

	}

	getStarted() {
		this.examIntro = false;
	}


	getTimeLeft() {
		if (this.time.h == 0) {
			if (this.time.m == 0) {
				return this.time.s + ' secondes';
			}
			return this.time.m + ' minues ' + this.time.s + ' secondes';
		}
		return this.time.h + ' heures ' + this.time.m + ' minues ' + this.time.s + ' secondes';
	}

	enableFocusMode() {
		this.focusMode = !this.focusMode;
	}

	getWidth() {
		const res = this.time.s + this.time.m * 60 + this.time.h * 3600;
		return Math.floor((res* 10000 / this.length) )/100;
	}

	getCompWidth() {
		return Math.floor(100 - this.getWidth());
	}

	getColor() {
		const val = this.getWidth();
		if (val > 80) {
			return '#106700';
		}
		if (val > 60) {
			return '#18ac00';
		}
		if (val > 40) {
			return 'orange';
		}
		if (val > 20) {
			return '#d4300d';
		}
		return '#ff0000';
	}

	showSelection(i: number, j: number) {
		let temp = [];
		for(let x = 0; x < this.choices[i].value.length;x++){
			temp.push(false);
		}
		this.choices[i].value = temp;
		this.choices[i].value[j] = true;
	}
}
