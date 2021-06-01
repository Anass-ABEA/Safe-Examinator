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
	invisibleCss={
		"box-shadow": "#dedede 2px 2px 10px 5px",
	}
	visibleCss={
		"box-shadow": "#dedede 2px 2px 10px 5px",
		"opacity":"0.5"
	}
	myList = [];
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
		eye: faEye


	};


	id = '';

	ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();
		setInterval(() => {
			this.getDate();
		}, 1000);

		this.load3Exams();
	}
	load3Exams(){
		this.http.get(base_url + 'exams/TeacherExams3/' + this.id).subscribe(res => {
			// @ts-ignore
			this.exams = res;

			for(let e of this.exams){
				e.start = new Date(this.displayDate(e.start));
				e.end   = new Date(this.displayDate(e.end));
			}
			this.getMyList();

		}, error => {

		});

	}

	getMyList(){
		let mres = []
		let index = 0;
		for (let x of this.exams){
			if (x.start > new Date()){
				x["i"] = index;
				mres.push(x);
				if(mres.length==3){
					break;
				}
			}
			index ++;
		}
		this.myList =  mres.slice(0,3);
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
		// console.log(column);
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



	showDifference(start: Date) {
		const a = moment(start);
		const b = moment(new Date());

		const days = a.diff(b,'days');
		const hours= a.diff(b,'hours') - (days *24);
		const minuts= a.diff(b,'minutes') - (days*24*60 + hours*60);
		let res = [];
		if(days != 0){
			res.push( days + " jour")
		}else{
			res.push("  ")
		}
		if(hours != 0){
			res.push(hours +" heures ")
		}else{
			res.push("  ")
		}
		res.push(minuts+" minutes");
		return res;
	}

	changeVisibility(id: any,i) {
		this.loaders[i] = true;
		this.http.post(base_url+"exams/visibility/"+this.myList[i].id,!this.myList[i].isVisible).subscribe(
			(res) =>{

				if(res){
					this.exams[this.myList[i].i].isVisible = !this.exams[this.myList[i].i].isVisible;
					this.getMyList();
				}
				this.loaders[i] = false;
			}
		)
	}

	openExam(id: any) {
		window.open("/updateExam/"+id,"_self");
	}

	StartExam(id: any, i: number) {
		this.loaders[i] = true;
		this.http.post(base_url+"exams/BeginExam/"+this.myList[i].id,!this.myList[i].isStarted).subscribe(
			res =>{
				if(res){
					this.exams[this.myList[i].i].isStarted = !this.exams[this.myList[i].i].isStarted;
					this.getMyList();
				}
				this.loaders[i] = false;
			}
		)
	}

	superviseExam(id: any) {
		window.open("/exam/"+id,"_self");
	}
}
