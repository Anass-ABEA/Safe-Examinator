import {Component, OnInit} from '@angular/core';
import {
	faBook,
	faCalendarAlt,
	faChalkboardTeacher, faChevronCircleLeft, faChevronCircleRight,
	faClock,
	faEnvelope, faEye, faEyeSlash,
	faGraduationCap,
	faHourglass, faInfo, faMinus, faNeuter, faPen, faPlus, faSchool, faTasks, faUserFriends, faUsers
} from '@fortawesome/free-solid-svg-icons';
import {CalendarView} from 'angular-calendar';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../../environments/environment';
import CheckCookies from '../../CheckCookies';
import {CookieService} from 'ngx-cookie-service';

@Component({
	selector: 'app-pro',
	templateUrl: './pro.component.html',
	styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {
	calendarDetails = {
		startHour: 8,
		endHour: 18,
		exclude: [0, 6]
	};
	view: CalendarView = CalendarView.Week;
	loaders =[false,false,false];
	constructor(private http: HttpClient, private cookie: CookieService) {
	}

	viewDate = new Date();
	time = new Date().toUTCString();
	fullName = 'John Doe';

	date = {
		start: new Date(),
		end: new Date()
	};

	exams = [
		/*{
			promo: 'INF',
			length: {
				'h': '01',
				'm': '00'
			},
			start: 'Thu Apr 01 11:52:43 WEST 2021',
			groups: 'A',
			startTime: {
				h: '11',
				m: '52'
			},
			end: 'Thu Apr 01 12:52:43 WEST 2021',
			id: '70647bb1b46cf31e5d439e10b6759aze',
			dept: 'INF',
			title: 'Gestion de Projet'
		},
		{
			start: new Date('Thu Mar 25 2021 08:00:31 GMT+0100 (GMT+01:00)'),
			title: 'SE',
			time: '08:00',
			end: new Date('Thu Mar 25 2021 10:00:31 GMT+0100 (GMT+01:00)'),
			class: {
				speciality: 'INF',
				promo: '2023',
				groups: [
					'A', 'B'
				]
			},
			length: {
				h: 1,
				m: 30
			}
		},
		{
			start: new Date('Thu Mar 25 2021 14:00:31 GMT+0100 (GMT+01:00)'),
			title: 'Cloud',
			time: '08:00',
			end: new Date('Thu Mar 25 2021 16:00:31 GMT+0100 (GMT+01:00)'),
			class: {
				speciality: 'IND',
				promo: '2023',
				groups: [
					'A', 'B'
				]
			},
			length: {
				h: 1,
				m: 30
			}

		},
		{
			start: new Date('Thu Mar 25 2021 14:00:31 GMT+0100 (GMT+01:00)'),
			title: 'MAHA',
			time: '08:00',
			end: new Date('Thu Mar 25 2021 16:00:31 GMT+0100 (GMT+01:00)'),
			class: {
				speciality: 'IND',
				promo: '2023',
				groups: [
					'A', 'B'
				]
			},
			length: {
				h: 1,
				m: 30
			},
		}*/
	];

	icons = {
		length: faHourglass,
		starTime: faClock,
		day: faCalendarAlt,
		students: faUsers,
		course: faGraduationCap,
		email: faEnvelope,
		book: faBook,
		visible: faEye,
		invisible:faEyeSlash,
		now: faNeuter,
		next: faChevronCircleRight,
		previous: faChevronCircleLeft,
		add: faPlus,
		exam: faTasks,
		minus: faMinus,
		pen : faPen,

	};


	id = '';

	ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();
		setInterval(() => {
			this.getDate();
		}, 1000);

		this.http.get(base_url + 'exams/TeacherExams3/' + this.id).subscribe(res => {
			// @ts-ignore
			this.exams = res;
			console.log(res);
			for(let e of this.exams){
				e.start = new Date(this.displayDate(e.start));
				e.end   = new Date(this.displayDate(e.end));
			}

		}, error => {

		});
	}

	getDate() {
		this.time = new Date().toUTCString();
	}

	getLength(length: { h: number; m: number }) {
		return '' + length.h + 'h' + length.m + 'min';
	}

	getDateFormat(date) {
		return moment(date).lang('fr').format('DD/MM/YYYY HH:mm');
	}

	getJoinTime(startTime: { h: number; m: number }) {
		return '' + startTime.h + ':' + startTime.m;
	}

	formatSubtitle = (percent: number): string => {
		if (percent >= 90) {
			return 'Bravo!';
		} else if (percent >= 75) {
			return 'Très bien ';
		} else if (percent > 60) {
			return 'Bien';
		} else {
			return 'Non Validé';
		}
	};


	show(column: any) {
		console.log(column);
	}

	showGroups(groups: { [p: string]: string }) {
		let res = '';
		// @ts-ignore
		for (let x of groups) {
			res += ',' + x;
		}
		return res.substr(1);
	}


	showDate() {
		const currentDate = new Date(this.viewDate);
		const firstday = moment(new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))).lang('fr').format('Do MMMM YYYY');
		const lastday = moment(new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6))).lang('fr').format('Do MMMM YYYY');
		return firstday + ' - ' + lastday;
	}



	changeData() {
		if (this.calendarDetails.startHour == 8) {
			this.calendarDetails = {
				startHour: 6,
				endHour: 20,
				exclude: []
			};

		} else {
			this.calendarDetails = {
				startHour: 8,
				endHour: 18,
				exclude: [0, 6]
			};
		}
	}
	displayDate(start: string) {
		if(start.includes("WET")){
			return new Date(start.split("WET")[0]+start.split("WET")[1])
		}
		return new Date(start.split("WEST")[0]+start.split("WEST")[1])
	}

	getFutureExams() {
		let res = []
		for (let x of this.exams){
			if (x.start > new Date()){
				res.push(x);
				if(res.length==3){
					break;
				}
			}
		}
		return res.slice(0,3);
	}

	showDifference(start: Date) {
		const a = moment(start);
		const b = moment(new Date());

		const days = a.diff(b,'days');
		const hours= a.diff(b,'hours') - (days *24);
		const minuts= a.diff(b,'minutes') - (days*24*60 + hours*60);
		let res = "";
		if(days != 0){
			res += days + "J "
		}
		if(hours != 0){
			res += hours +"h "
		}
		res += minuts+"m"
		return res;
	}

	changeVisibility(id: any,i) {
		this.loaders[i] = true;
		this.http.post(base_url+"exams/visibility/"+id,!this.exams[i].isVisible).subscribe(
			res =>{
				if(res){
					this.exams[i].isVisible = !this.exams[i].isVisible;
				}
				this.loaders[i] = false;
			}
		)
	}

	openExam(id: any) {
		window.open("/exams/past_exams/"+id,"_self");
	}

	StartExam(id: any, i: number) {
		this.loaders[i] = true;
		console.log(base_url+"exams/BeginExam/"+id);
		this.http.post(base_url+"exams/BeginExam/"+id,!this.exams[i].isStarted).subscribe(
			res =>{
				if(res){
					this.exams[i].isStarted = !this.exams[i].isStarted;
				}
				this.loaders[i] = false;
			}
		)
	}
}
