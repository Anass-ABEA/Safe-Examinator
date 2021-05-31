import { Component, OnInit } from '@angular/core';
import {
	faBook,
	faCalendarAlt,
	faChalkboardTeacher, faChevronCircleLeft, faChevronCircleRight,
	faClock,
	faEnvelope,
	faGraduationCap,
	faHourglass,
	faInfo, faNeuter,

} from '@fortawesome/free-solid-svg-icons';
import {CalendarView, DAYS_OF_WEEK, MOMENT} from 'angular-calendar';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';



@Component({
  selector: 'app-stu',
  templateUrl: './stu.component.html',
  styleUrls: ['./stu.component.css']
})
export class StuComponent implements OnInit {
	calendarStyle={

	}


	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
	weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
	view: CalendarView = CalendarView.Month;
	activeDayIsOpen: boolean = true;



	constructor(private http:HttpClient,private cookie : CookieService) { }
	events = [{
		title:"examen SE",
		start:new Date(),
		time:"08:00",
		length:"1h30min",
	}]
	viewDate = new Date();

	time = moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');
	fullName="";
	homeValues={
		succeeded : 23,
		passed : 25,
		avg:14.68
	};

	icons = {
		length:faHourglass,
		starTime:faClock,
		day : faCalendarAlt,
		professor:faChalkboardTeacher,
		course: faGraduationCap,
		email:faEnvelope,
		book:faBook,
		info:faInfo,
		now:faNeuter,
		next : faChevronCircleRight,
		previous:faChevronCircleLeft
	}

	closeExams = [

	]

	top3=[
		{
			class:"Java",
			professor:"James DOE",
			email:"jamesdoe",
			length:"45:37",
			testlength:"1h",
			avg:"02:09",
			classavg:"03:17",
			mark:17.32
		},
		{
			class:"IHM",
			professor:"James DOE",
			email:"jamesdoe",
			length:"45:37",
			testlength:"1h",
			avg:"02:09",
			classavg:"03:17",
			mark:16.75

		},
		{
			class:"C",
			professor:"James DOE",
			email:"jamesdoe",
			length:"01:55:37",
			testlength:"2h",
			avg:"07:09",
			classavg:"08:17",
			mark:16.23

		}
	]
	latestExams=[
		{
			title:"Hello World",
			id:"A2EAZEAZ87AZ89DU7AZ0D9ZAD098"
		},
		{
			title:"Hello World2",
			id:"AZDDAZ87AZ89DU7AZ0D9ZAD098"
		},
		{
			title:"Hello World3",
			id:"HGBRYZ87AZ89DU7AZ0D9ZAD098"
		}
	];

	dbRes = null;

	id = new CheckCookies(this.cookie).getId();
	loadStudentData(){
		this.http.get(base_url+"students/data/"+this.id).subscribe(res=>{
			this.dbRes = res;
			this.setupData(res);
		})
	}
	load3exams(){
		console.log(base_url+"exams/3examsSorted/"+this.id);
		this.http.get(base_url+"exams/3examsSorted/"+this.id).subscribe(res=>{
			// @ts-ignore
			this.closeExams = res;
		})
	}
	loadCalendarExams(){
		this.http.get(base_url+"exams/StudentExams/"+this.id).subscribe(res=>{

			this.events=[];

			// @ts-ignore
			for(let x of res){

				const strdate=x['date']['y']+"-"+(x['date']['m']+1)+"-"+x['date']['d'];
				const da = new Date(strdate);
				this.events.push({
					title:x['title'],
					start:da,
					time:(x['startTime']['h'].length!==1? '0'+x['startTime']['h']:x['startTime']['h'])
						+":"+(x['startTime']['m'].length!==1? '0'+x['startTime']['m']:x['startTime']['m']),
					length:(x['length']['h'].length!==1? '0'+x['length']['h']:x['length']['h'])
						+":"+(x['length']['m'].length!==1? '0'+x['length']['m']:x['length']['m']),
				});
			}
		})
	}
	ngOnInit(): void {
		this.loadStudentData();
		this.load3exams();
		this.loadCalendarExams();

		setInterval(()=>{
			this.load3exams();
			this.loadCalendarExams();
		},10000)

		setInterval(() => {
			this.getDate()
		}, 1000);
	}

	setupData(res) {
		this.fullName = res.fname+" "+res.lname;
		this.homeValues = res.homevalues;

	}

	getDate() {
		this.time =  moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');
	}

	getLength(startTime: { h: number; m: number } ) {
		return ""+(startTime.h<9? '0'+startTime.h:startTime.h)+"h"+(startTime.m<9? '0'+startTime.m:startTime.m)+"min";
	}

	getDateFormat(date: { d: number; y: number; m: number }) {
		return ""+(date.d<9? '0'+date.d:date.d)+" / "+(date.m<9? '0'+date.m:date.m)+" / "+date.y;
	}

	getJoinTime(startTime: { h: number; m: number } ) {
		return ""+(startTime.h<9? '0'+startTime.h:startTime.h)+":"+(startTime.m<9? '0'+startTime.m:startTime.m)
	}

	closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	}

	displayMonth() {
		return moment(this.viewDate).lang('fr').format('MMMM YYYY');
	}

	startExam(id: any) {
		window.open("/exam/"+id,"_self");
	}
}
