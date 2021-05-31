import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import CheckCookies from '../../CheckCookies';
import {Observable, Subscription} from 'rxjs';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {base_url} from '../../../environments/environment';

interface NotesExam {
	nom: any,
	note_total: any,
}


@Component({
	selector: 'app-profresult',
	templateUrl: './profresult.component.html',
	styleUrls: ['./profresult.component.css']
})
export class ProfresultComponent implements OnInit {
	QuestionsExam: any;
	NoteTotalExam: any; //note_total_exam
	showMarks: boolean = false;
	ExamsPasse: Subscription;//subscription to sub and unsub
	ExamsPasseData: any;//données de l'exam ( id + connected stud etc ..)
	NotesExamArray: NotesExam[] = [];//liste des notes de chaque exam
	constructor(private http: HttpClient,
							private cookie: CookieService) {
	}

	id: any;

	ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();
		console.log(this.id);
		this.ExamsPasse = this.getExamsDone(this.id).subscribe(
			res => this.ExamsPasseData = res
		);
	}

	getExamsDone(id: any): Observable<any> {
		console.log(base_url + 'examsss/' + id);
		return this.http.get<any>(base_url + 'examsss/' + id);
	}

	AffichageNote(examdata: any) { //quand on click sur note, le systeme fait appel a cette fonction pour afficher le tableau des notes
		this.NotesExamArray = [];
		var note_tot = 0;
		var note_tot_exam = 0;
		//console.log(examdata.exam.connectedStudents[0].id);
		var i = 0;
		while (i < examdata.exam.connectedStudents.length) {
			examdata.exam.connectedStudents[i].reponses.forEach(element => {
				note_tot += element.total;
				note_tot_exam += element.note;
			});
			var obj: NotesExam = {
				nom: examdata.exam.connectedStudents[i].id,
				note_total: note_tot
			};
			//console.log(obj);
			this.NotesExamArray.push(obj);
			i++;
		}
		this.NoteTotalExam = note_tot_exam;
		//console.log(this.NotesExamArray);
		this.showMarks = true;
		this.showNotesMeth(this.NotesExamArray);
	}

	downladPdf() { //transformer le tableau en un doc pdf
		var element = document.getElementById('tabletopdf');
		html2canvas(element).then((canvas) => {
			var doc = new jspdf();
			console.log(canvas);
			var imgData = canvas.toDataURL('image/png');
			var imgHeight = canvas.height * 208 / canvas.width;
			doc.addImage(imgData, 10, 10, 190, imgHeight);
			doc.save('noteINFO.pdf');
		});
	}

	showNotesMeth(notes: any) { //trier la liste des note
		this.showMarks = true;
		this.NotesExamArray = notes.sort(function(a, b) {
			var nameA = a.nom.toUpperCase();
			var nameB = b.nom.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			// names must be equal
			return 0;
		});
		;
		//console.log(this.NotesExamArray);
	}



}
