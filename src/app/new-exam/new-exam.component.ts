import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import CheckCookies from '../CheckCookies';
import * as moment from 'moment';
import {Md5} from 'ts-md5';
import {
	faAlignJustify, faCheck,
	faChevronLeft,
	faChevronRight, faChevronUp,
	faGripLines,
	faInfo, faPlus,
	faSlidersH, faTimes,
	faTools,
	faTrash
} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faClone, faDotCircle, faFileAlt, faSave} from '@fortawesome/free-regular-svg-icons';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons/faFileUpload';
import {base_url} from '../../environments/environment';

@Component({
	selector: 'app-new-exam',
	templateUrl: './new-exam.component.html',
	styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
	id = "";
	showScrollTop = false;
	firstPage = true;
	thirdPage = false;

	selectedQuestion = 0;

	questionList = [
		{
			body: '',
			type: 'short',
			note:"1",
			answers: [
				{
					body: '',
					isCorrect: false
				}
			]
		}

	];
	icons = {
		trash: faTrash,
		info: faInfo,
		options: faSlidersH,
		back: faChevronLeft,
		next: faChevronRight,
		close: faTimes,
		check: faCheck,
		save: faSave,
		add: faPlus,
		duplicate:faClone,
		up:faChevronUp

	};
	keys = ['short', 'long', 'multiple', 'single', 'file'];
	questionsText = {
		short: 'réponse courte',
		long: 'réponse longue',
		multiple: 'Choix multiple',
		single: 'Choix unique',
		file: 'Fichier'
	};
	questionsIcons = {
		short: faGripLines,
		long: faAlignJustify,
		multiple: faCheckSquare,
		single: faDotCircle,
		file: faFileAlt
	};

	// form data
	booleans = {
		isVisible:false,
		mark: false,
		finalReport: false,
		feedback: false,
		correctAns: false,
		random: false,
		fraude : false,
		randomRep:false,
		canadien:false,
		goodgood:false,
	};
	selectedGroups = [];
	selectedgenie = [];

	// elements received from database
	groups = [
		'A',
		'B',
		'rat_SE'
	];


	//final form data :



	elementGrp = '--';

	formValues = {
		hashed:"",
		note:"0",
		examName: '',
		tries: '1',
		date: '',
		time: '',
		promo: '--',
		display:"1",
		length: {
			h: '00',
			m: '00'
		}

	};

	promotions = [];

	genie = [
		'INF',
		'IND',
		'CIV',
		'MEC',
		'ELEC',
		'MIS',
		'RT'
	];


	elementGen = '--';

	date = new Date();


	constructor(private cookie: CookieService, private http: HttpClient) {
	}

	ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();

		if (new CheckCookies(this.cookie).isProf() != 1) {
			window.open('/', '_self');
		}

		window.addEventListener('scroll',(e)=>{
			if(e['path'][1]['pageYOffset']>0){
				this.showScrollTop = true;
			}else{
				this.showScrollTop = false;
			}
		})
		this.promotions = this.getPromotions();

	}
	getPromotions() {
		var d = new Date().getFullYear();
		if(new Date().getMonth()>7){
			d++;
		}
		return [d,d+1,d+2];
	}

	getDateSelected() {
		return moment(this.formValues.date).lang('fr').format('dddd Do MMMM YYYY');
		;
	}

	genieChanged() {
		let exists = false;
		for (let x of this.elementGen) {
			exists = false;
			for (let y of this.selectedgenie) {
				if (x === y) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				this.selectedgenie.push(x);
			}
		}

	}

	groupChanged() {
		let exists = false;
		for (let x of this.elementGrp) {
			exists = false;
			for (let y of this.selectedGroups) {
				if (x === y) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				this.selectedGroups.push(x);
			}
		}

	}

	deleteGenie(element) {
		setTimeout(() => {
			this.selectedgenie = this.selectedgenie.filter(s => !s.includes(element));
		}, 250);
	}


	deleteGroup(element) {
		setTimeout(() => {
			this.selectedGroups = this.selectedGroups.filter(s => !s.includes(element));
		}, 250);
	}

	saveExam() {
		// @ts-ignore
		this.formValues.hashed = new Md5().appendStr(new Date()+this.id).end();
		let note = 0;
		for (let x of this.questionList){
			note += Number(x.note);
		}
		this.formValues.note = ""+note;
		const data = {
			booleans : this.booleans,
			groups : this.selectedGroups,
			genies : this.selectedgenie,
			values : this.formValues,
			questions : this.questionList
		}

		this.http.post(base_url+"newExam/"+this.id,data).subscribe(res=>{
				// @ts-ignore
			if(res.isAdded){
					alert("Votre examen a été ajouté avec succes");
					window.open("/","_self");
				}else{
					// @ts-ignore
				alert(res.Error);
				}

		})
	}

	addAnswer(i: number) {
		this.questionList[i].answers.push({
			body: '',
			isCorrect: false
		});
	}

	deleteQuestion(i: number, j: number) {
		this.questionList[i].answers.splice(j, 1);
	}

	reverseCorrectness(i: number, j: number) {
		this.questionList[i].answers[j].isCorrect = !this.questionList[i].answers[j].isCorrect;
	}

	setQuestionType(str) {
		this.questionList[this.selectedQuestion].type = str;
		const type = this.questionList[this.selectedQuestion].type;

		if (type === 'multiple' || type === 'single') {
			return;
		} else {
			this.questionList[this.selectedQuestion].answers = [
				{
					body: '',
					isCorrect: false
				}
			];
		}
	}

	checkValidity(i: number) {
		const type = this.questionList[i].type;
		return (type === 'multiple' || type === 'single');
	}


	duplicate(i: number) {
		const c = this.questionList[i-1];
		this.addNewQuestion(i);
		this.questionList[i].answers =c.answers.map(x=>this.cloneAnswers(x));
		this.questionList[i].type = c.type;
		this.questionList[i].body = c.body;
		this.questionList[i].note = c.note;

	}
	cloneAnswers(x){
		let res = {
			body: '',
			isCorrect: false
		}
		res.body = x.body;
		res.isCorrect = x.isCorrect;
		return res;
	}

	addNewQuestion(i: number) {
		this.questionList.splice(i,0,
			{
				body: '',
				type: 'short',
				note:"1",
				answers: [
					{
						body: '',
						isCorrect: false
					}
				]
			});
	}

	delete(i: number) {
		this.questionList.splice(i,1);
	}



	scrollTop() {
		window.scrollTo(0,0);
	}
}
