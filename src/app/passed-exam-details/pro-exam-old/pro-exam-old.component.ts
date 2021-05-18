import {Component, OnInit, ViewChild, ElementRef, ContentChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';
import {base_url} from '../../../environments/environment';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
	selector: 'app-pro-exam-old',
	templateUrl: './pro-exam-old.component.html',
	styleUrls: ['./pro-exam-old.component.css']
})
export class ProExamOldComponent implements OnInit {
	examId = this.route.params['_value'].examid;
	id = new CheckCookies(this.cookie).getId();
	types = {
		SHORT: 0,
		LONG: 1,
		MULTIPLE: 2,
		SINGLE: 3,
		FILE: 4
	};

	exam = {
		title: 'ok',
		profName: 'YES'
	};


	questions = [];

	constructor(private http: HttpClient, private route: ActivatedRoute, private cookie: CookieService) {
	}

	ngOnInit(): void {
		this.http.get(base_url + 'exams/questions/' + this.examId).subscribe((res: Array<any>) => {
			console.log(res);
			this.questions = res;
		});

		this.http.get(base_url + 'exams/getMinDetails/' + this.examId).subscribe((res) => {
			console.log(res);
			// @ts-ignore
			this.exam = res;
		});

	}

	getString(note: number, total: number) {
		return '' + note + '/' + total;
	}

	backToExamList() {
		window.open('/exams/past_exams', '_self');
	}


	exmportExam() {

		var node = document.getElementById('ExamContent');
		var img;
		var filename = "SEE__"+this.exam.title+"__"+this.exam.profName + '.pdf';
		var newImage;

		domtoimage.toPng(node, {bgcolor: '#fff'})

			.then(function(dataUrl) {

				img = new Image();
				img.src = dataUrl;
				newImage = img.src;

				img.onload = function() {

					var pdfWidth = img.width / 2;
					var pdfHeight = img.height / 2;


					var doc;

					if (pdfWidth > pdfHeight) {
						doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
					} else {
						doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
					}


					var width = doc.internal.pageSize.getWidth();
					var height = doc.internal.pageSize.getHeight();


					doc.addImage(newImage, 'PNG', 3, 10, width, height);
					doc.save(filename);

				};


			});


	}

}
