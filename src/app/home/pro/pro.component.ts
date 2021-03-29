import { Component, OnInit } from '@angular/core';
import {
	faBook,
	faCalendarAlt,
	faChalkboardTeacher, faChevronCircleLeft, faChevronCircleRight,
	faClock,
	faEnvelope,
	faGraduationCap,
	faHourglass, faInfo, faMinus, faNeuter, faPlus, faSchool, faTasks, faUserFriends, faUsers
} from '@fortawesome/free-solid-svg-icons';
import {CalendarView} from 'angular-calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {
	calendarDetails = {
		startHour:8,
		endHour:18,
		exclude :[0,6]
	}
	view: CalendarView = CalendarView.Week;
  constructor() { }

	viewDate = new Date();
	time = new Date().toUTCString();
	fullName="John Doe";

	date= {
		start : new Date(),
		end : new Date()
	}

	exams = [
		{
			start : new Date("Thu Mar 25 2021 08:00:31 GMT+0100 (GMT+01:00)"),
			title:"SE",
			time:"08:00",
			end:new Date("Thu Mar 25 2021 10:00:31 GMT+0100 (GMT+01:00)"),
			length:"2h",
			class:{
				speciality:"INF",
				promo:"2023",
				groups:[
					"A","B"
				]
			}
		},
		{
			start : new Date("Thu Mar 25 2021 14:00:31 GMT+0100 (GMT+01:00)"),
			title:"Cloud",
			time:"08:00",
			end:new Date("Thu Mar 25 2021 16:00:31 GMT+0100 (GMT+01:00)"),
			length:"2h",
			class:{
				speciality:"IND",
				promo:"2023",
				groups:[
					"A","B"
				]
			}
		}
	];

	icons = {
		length:faHourglass,
		starTime:faClock,
		day : faCalendarAlt,
		students:faUsers,
		course: faGraduationCap,
		email:faEnvelope,
		book:faBook,
		promo:faSchool,
		now:faNeuter,
		next : faChevronCircleRight,
		previous:faChevronCircleLeft,
		add:faPlus,
		exam:faTasks,
		minus : faMinus

	}

	closeExams = [
		{
			title:"IHM",
			isRat : false,
			professor:"James Doe",
			length:{
				h:1,
				m:30
			},
			startTime:{
				h:16,
				m:20
			},
			date:{
				d:3,
				m:3,
				y:2021
			}
		},
		{
			title:"Java",
			professor:"James Doe",
			isRat : false,
			length:{
				h:1,
				m:30
			},
			startTime:{
				h:16,
				m:20
			},
			date:{
				d:3,
				m:3,
				y:2021
			}
		},
		{
			title:"Compilation",
			isRat : true,
			professor:"James Doe",
			length:{
				h:1,
				m:30
			},
			startTime:{
				h:16,
				m:20
			},
			date:{
				d:3,
				m:3,
				y:2021
			}
		}
	]



	ngOnInit(): void {
		setInterval(() => {
			this.getDate()
		}, 1000);
	}

	getDate() {
		this.time =  new Date().toUTCString();
	}

	getLength(length: { h: number; m: number } ) {
		return ""+length.h+"h"+length.m+"min";
	}

	getDateFormat(date: { d: number; y: number; m: number }) {
		let day = ""+date.d;
		if(date.d <10) day = "0"+day;
		 let month  = ""+date.m;
		if(date.m <10) month = "0"+month;
		return ""+day+" / "+month+" / "+date.y;
	}

	getJoinTime(startTime: { h: number; m: number } ) {
		return ""+startTime.h+":"+startTime.m
	}
	formatSubtitle = (percent: number) : string => {
		if(percent >= 90){
			return "Bravo!"
		}else if(percent >= 75){
			return "Très bien "
		}else if(percent > 60){
			return "Bien"
		}else {
			return "Non Validé"
		}
	}


	show(column: any) {
		console.log(column);
	}

	showGroups(groups: {[p: string]: string}) {
		let res = "";
		// @ts-ignore
		for (let x of groups){
			res+="," +x;
		}
		return res.substr(1);
	}


	showDate() {
		const currentDate = new Date(this.viewDate);
		const firstday =  moment(new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))).lang('fr').format('Do MMMM YYYY');
		const lastday = moment(new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6))).lang('fr').format('Do MMMM YYYY');
		return firstday+" - "+lastday;
	}


	eventClicked(weekEvent: any) {
		console.log("CLICKED",weekEvent);
	}

	changeData() {
		if (this.calendarDetails.startHour==8){
			this.calendarDetails = {
				startHour:6,
				endHour:20,
				exclude :[]
			}

		}else{
			this.calendarDetails = {
				startHour:8,
				endHour:18,
				exclude :[0,6]
			}
		}
	}
}
