import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {base_url} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';
import * as moment from 'moment';


@Component({
	selector: 'app-prog-stu',
	templateUrl: './prog-stu.component.html',
	styleUrls: ['./prog-stu.component.css']
})


export class ProgStuComponent implements OnInit {
	/*
	* FEEDBACK CONTENT IS STORED IN THIS VARIABLE (feedback) just send it to the database
	* Using the function "closeExam()" at the end of the file
	* */
	feedback = '';

	width = 20;
	/*
	* ANSWSERS of the students are stored in here (choices) just send it to the database
	* Using the function "sendcurrentQuestion()" at the end of the file
	* */
	choices = [];
	hastext = false;
	startDate = null;
	endDate = null;
	id = null;
	isScrolled = false;
	examIntro = true; //default TRUE
	notes = [];
	examId = this.route.params['_value'].examId;
	isStarted = true;
	isGoodGood = false;
	note = 0;
	totalNotes = 0;
	exam = {
		title: 'EXAM TITLE',
		profName: 'DOE J.',
		len: '1h30',
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
		h: 0,
		m: 2,
		s: 0
	};

	length = 12;

	questions = [];
	i = 0;

	CHEATER= false;
	frauded = [];
	inter = null;
	allowStart = true;
	final = false;  // DEFAULT FALSE

	constructor(private http: HttpClient, private route: ActivatedRoute, private cookie: CookieService) {
	}

	ngOnInit(): void {

		this.id = new CheckCookies(this.cookie).getId();
		//check if exam is on

		this.http.get(base_url+`/exam/isPassed/${this.id}/${this.examId}`).subscribe(res=>{
			this.allowStart = !res;
		})

		this.http.get(base_url + 'exam/isExamStarted/' + this.examId).subscribe(res => {
			// @ts-ignore
			if (res.isOpen == false) {
				window.open('/', '_self');
			}
			// @ts-ignore
			this.isGoodGood = res.isgoodgood;
		}, err => {
			window.open('/', '_self');
			alert('une erreur a survenue');
		});

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


	}

	getExamInfo() {
		this.http.get(base_url + 'exams/firstData/' + this.examId).subscribe((res) => {
			// @ts-ignore
			this.exam = res;
			this.getTime(res);
		});
	}

	getExams() {

		this.http.get(base_url + 'exams/questions/' + this.examId).subscribe((res: Array<any>) => {

			this.questions = res.sort((a, b) => 0.5 - Math.random());
			this.setupChoices(res);
		});
	}

	setupChoices(res) {
		this.choices = [];
		let r = 0;
		for (let e of res) {
			this.frauded.push(false);
			if (e.type == this.types.SHORT) {
				this.hastext = true;
				this.choices.push({
					isCheating:false,
					type:e.type,
					value: '',
					index: r,
					note: 0,
					total: e.points
				});

			}
			if (e.type == this.types.LONG) {
				this.hastext = true;
				this.choices.push({
					isCheating:false,
					type:e.type,
					value: '',
					index: r,
					note: 0,
					total: e.points
				});

			}
			if (e.type == this.types.MULTIPLE) {
				let list = [];
				for (let i = 0; i < e.rep.length; i++) {
					list.push(false);
				}
				this.choices.push({
					isCheating:false,
					type:e.type,
					value: list,
					index: r,
					note: 0,
					total: e.points
				});
			}
			if (e.type == this.types.SINGLE) {
				this.choices.push({
					isCheating:false,
					type:e.type,
					value: '',
					index: r,
					note: 0,
					total: e.points
				});
			}
			r++;
		}
	}

	saveExam() {
		this.setMark();
	}

	endExam() {
		clearInterval(this.inter);
		this.time = {
			h: 0,
			m: 0,
			s: 0
		};
		this.final = true;
		this.endDate= new Date();
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
		window.onblur = ()=>{
			this.frauded[this.i] = true;
			this.choices[this.i].isCheating = true;
		}
		this.examIntro = false;
		this.startDate = new Date();
		this.http.get(base_url+"exams/addToStudent/"+this.id+"/"+this.examId).subscribe(res=>{
			console.log(res);
		});
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
		return Math.floor((res * 10000 / this.length)) / 100;
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
		for (let x = 0; x < this.choices[i].value.length; x++) {
			temp.push(false);
		}
		this.choices[i].value = temp;
		this.choices[i].value[j] = true;
	}

	goNext() {
		this.setMark();

		if (this.i < this.questions.length - 1) {
			this.i++;
		} else {
			this.final = true;
			clearInterval(this.inter);
			this.endDate= new Date();
			console.log(this.totalNotes);
			console.log(this.note);
			console.log(this.choices);
			console.log(this.questions);
		}
		this.sendcurrentQuestion();
		this.calculerNote();

	}

	setMark() {
		const qst = this.questions[this.i];
		if (qst.type <= 1) {
			this.choices[this.i].note = 0;
			return;
		}
		const rep = this.choices[this.i];
		if (qst.type == this.types.SINGLE) {
			if (qst.rep[rep.value]) {
				if (qst.rep[rep.value].isCorrect) {
					this.choices[this.i].note = this.choices[this.i].total;
				} else {
					this.choices[this.i].note = 0;
				}
				return;
			}
			return;
		}
		if (this.isGoodGood) {
			for (let r = 0; r < rep.value.length; r++) {
				if (rep.value[r] != qst.rep[r].isCorrect) {
					this.choices[this.i].note = 0;
					return;
				}
			}
			this.choices[this.i].note = this.choices[this.i].total;
		} else {
			let corre = 0;
			let check = 0;
			let norml = 0;
			for (let r = 0; r < rep.value.length; r++) {
				if (rep.value[r] == qst.rep[r].isCorrect) {
					corre++;
				}
				if (rep.value[r]) {
					check++;
				}
				if (qst.rep[r].isCorrect) {
					norml++;
				}
			}
			if (norml == check || norml == check + 1 || norml == check - 1) {
				this.choices[this.i].note = Math.floor(this.choices[this.i].total * (corre / rep.value.length) * 100) / 100;
			} else {
				this.choices[this.i].note = 0;
			}

		}
	}

	goPrevious() {
		this.setMark();
		if (this.i > 0) {
			this.i--;
		}
		this.calculerNote();
		this.sendcurrentQuestion();
	}

	calculerNote() {
		/*for(let index = 0 ; index<this.questions.length;i++){
			this.note+=
		}*/
		this.note = 0;
		this.totalNotes = 0;
		for (let x of this.choices) {
			this.note += x.note;
			this.totalNotes += x.total;
		}
		console.log(this.note, '/', this.totalNotes);

	}

	closeExam() {
		this.http.post(base_url + '/exams/' + this.examId + '/feedback/' + this.id, this.feedback).subscribe(res => {
			console.log(res, this.feedback);
		});
		window.open('/', '_self');
	}

	sendcurrentQuestion() {
		console.clear();
		const st  = moment(this.startDate).lang('fr').format('DD/MM/YYYY hh:mm:ss');;
		const en  = moment(this.endDate).lang('fr').format('DD/MM/YYYY hh:mm:ss');


		const data = {
			id: this.id,
			startDate: st,
			endDate: en,
			reponses: this.choices
		};
		console.log(data);
		// send the curent data to the database
		this.http.post(base_url + 'exams/updateresult/' + this.examId, data).subscribe(res => {
			console.log(res);
		});
	}

	getPourcentage() {
		return Math.floor(this.note * 10000 / this.totalNotes) / 100;
	}

	private getTime(res) {
		const length = this.exam.len.split("h");
		const h = length[0];
		const m = length[1];

		this.time = {
			h: Number(h),
			m: Number(m),
			s: 0
		};

		this.length= this.time.s + this.time.m * 60 + this.time.h * 3600
		this.width = this.getWidth();
	}
}
