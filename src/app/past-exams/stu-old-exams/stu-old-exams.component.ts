import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import CheckCookies from '../../CheckCookies';
import {base_url} from '../../../environments/environment';
import * as moment from 'moment';
import {faBars, faCheck, faHourglassHalf, faList, faSearch, faTable} from '@fortawesome/free-solid-svg-icons';

interface Exams {
	id: string,
	title: string,
	start: string,
	length: string,
	email: string,
	classe: Classe,
	isPassed: boolean,
	tFname: string,
	tLname: string,
}

interface Classe {
	year: string,
	specialty: string,
	Groups: string[]
}

@Component({
	selector: 'app-stu-old-exams',
	templateUrl: './stu-old-exams.component.html',
	styleUrls: ['./stu-old-exams.component.css']
})
export class StuOldExamsComponent implements OnInit {
	p: number;
	search = '';
	display = 3;
	icons = {
		search: faSearch,
		list: faBars,
		table: faTable,
		done: faCheck,
		notDone: faHourglassHalf
	};
	isCards = true;
	time = moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');
	data: Exams[] = [];
	exams: Exams[] = [];
	id = null;

	constructor(private cookie: CookieService, private http: HttpClient) {
	}

	ngOnInit(): void {
		this.data = this.exams;
		setInterval(() => {
			this.getDate();
		}, 1000);


		this.id = new CheckCookies(this.cookie).getId();
		this.http.get(base_url + 'exams/getExams/' + this.id).subscribe((res: Exams[]) => {
			this.exams = res;
			this.data = res;
			console.log(res);
		});
	}

	getDate() {
		this.time = moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');
	}


	show() {

	}

	searchChanged() {
		if (this.search.length == 0) {
			this.exams = this.data;
			return;
		}
		this.exams = [];
		for (let x of this.data) {

			if (x.title.toLowerCase().includes(this.search.toLowerCase()) || x.email.toLowerCase().includes(this.search.toLowerCase())) {
				this.exams.push(x);
			}
		}

	}

	openExam(id: string) {
		window.open('/exams/past_exams/' + id, '_self');
	}

	displayDate(start: string) {
		if (start.includes('WET')) {
			return moment(new Date(start.split('WET')[0] + start.split('WET')[1])).lang('fr').format('dddd Do MMMM YYYY');
		}
		return moment(new Date(start.split('WEST')[0] + start.split('WEST')[1])).lang('fr').format('dddd Do MMMM YYYY');
	}

	displayTime(start: string) {
		if (start.includes('WET')) {
			return moment(new Date(start.split('WET')[0] + start.split('WET')[1])).lang('fr').format('HH:mm');
		}
		return moment(new Date(start.split('WEST')[0] + start.split('WEST')[1])).lang('fr').format('HH:mm');
	}
}
