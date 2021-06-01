import {Component, OnInit} from '@angular/core';
import {
	faAlignJustify,
	faCheck,
	faChevronLeft,
	faChevronRight,
	faChevronUp, faGripLines,
	faInfo,
	faPlus,
	faSlidersH,
	faTimes,
	faTrash
} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faClone, faDotCircle, faFileAlt, faSave} from '@fortawesome/free-regular-svg-icons';
import {Md5} from 'ts-md5';
import {base_url} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-edit-exam',
	templateUrl: './edit-exam.component.html',
	styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {
	model = null;
	firstPage = false;
	thirdPage = false;
	selectedQuestion = 0;
	id = this.route.params['_value'].examId;

	display = '1';

	questionsText = {
		short: 'réponse courte',
		long: 'réponse longue',
		multiple: 'Choix multiple',
		single: 'Choix unique',
		file: 'Fichier'
	};

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
		duplicate: faClone,
		up: faChevronUp

	};


	questionList = [
		{
			body: '',
			type: 'short',
			note: '1',
			answers: {
				answers: [
					{
						body: '',
						correct: false
					}
				]
			}
		},
		{
			body: '',
			type: 'short',
			note: '1',
			answers: [
				{
					body: '',
					correct: false
				}
			]
		}

	];

	questionsIcons = {
		short: faGripLines,
		long: faAlignJustify,
		multiple: faCheckSquare,
		single: faDotCircle,
		file: faFileAlt
	};

	examSaved = false;

	constructor(private route: ActivatedRoute, private http: HttpClient) {
	}

	ngOnInit(): void {
		this.http.get(base_url + 'getExamToUpdate/' + this.id).subscribe(res => {
			// @ts-ignore
			console.log(res.questions);
			// @ts-ignore
			this.questionList = res.questions;
			this.model = res;
		});
	}

	checkValidity(i: number) {
		const type = this.questionList[i].type;
		return (type === 'multiple' || type === 'single');
	}

	reverseCorrectness(i: number, j: number) {
		this.questionList[i].answers[j].correct = !this.questionList[i].answers[j].correct;
	}

	addAnswer(i: number) {
		// @ts-ignore
		this.questionList[i].answers.answers.push({
			body: '',
			correct: false
		});
	}


	deleteQuestion(i: number, j: number) {
		// @ts-ignore
		this.questionList[i].answers.answers.splice(j, 1);
	}


	duplicate(i: number) {
		const c = this.questionList[i - 1];
		this.addNewQuestion(i);
		// @ts-ignore
		this.questionList[i].answers.answers = c.answers.answers.map(x => this.cloneAnswers(x));
		this.questionList[i].type = c.type;
		this.questionList[i].body = c.body;
		this.questionList[i].note = c.note;
	}

	cloneAnswers(x) {
		let res = {
			body: '',
			correct: false
		};
		res.body = x.body;
		res.correct = x.correct;
		return res;
	}

	addNewQuestion(i: number) {
		this.questionList.splice(i, 0,
			{
				body: '',
				type: 'short',
				note: '1',
				answers: [
					{
						body: '',
						correct: false
					}
				]
			});
	}


	delete(i: number) {
		this.questionList.splice(i, 1);
	}


	saveExam() {

		this.model.questions = this.questionList;
		this.http.post(base_url + 'updateExamQuestions/' + this.id, this.model).subscribe(res => {
			if (res) {
				this.examSaved = true;
			}
			this.thirdPage = false;
		});

		/*this.formValues.hashed = new Md5().appendStr(new Date()+this.id).end();
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

		})*/
	}


	setDisplay(s: string) {
		this.display = s;
	}
}
