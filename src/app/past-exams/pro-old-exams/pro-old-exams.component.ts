import {Component, OnInit} from '@angular/core';
import {faBars, faClock, faGraduationCap, faHourglass, faPlus, faPlusCircle, faTable, faUsers} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
	selector: 'app-pro-old-exams',
	templateUrl: './pro-old-exams.component.html',
	styleUrls: ['./pro-old-exams.component.css']
})
export class ProOldExamsComponent implements OnInit {
	isCardsOld = true;
	isCardsNew = true;
	itemsPerPageOld = 3;
	itemsPerPageNew = 3;
	pageNew = 1;
	pageOld = 1;
	icons = {
		start: faClock,
		length: faHourglass,
		class: faGraduationCap,
		group: faUsers,
		list: faBars,
		table: faTable,
		plus:faPlusCircle
	};
	data = [];
	cardsOld = [
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 15:00:29 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 13:56:29 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 14:19:55 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 15:00:29 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
	];
	cardsNew = [
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 15:00:29 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 13:56:29 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 14:19:55 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},
		{
			id: 'ABCDEF',
			title: 'JEE',
			start: 'Thu Mar 25 2021 13:00:29 GMT+0100 (GMT+01:00)',
			end: 'Thu Mar 25 2021 15:00:29 GMT+0100 (GMT+01:00)',
			class: {
				speciality: 'INF',
				year: '2020',
				groups: [
					'A', 'B'
				]
			},
			params: {
				nbrQuestions: 38,
				DisplayQuestions: 20,
				isRandom: true
			}
		},

	];

	constructor() {
	}

	ngOnInit(): void {
		console.log(moment("2021 03 30 16 30", "YYYY MM DD HH mm").fromNow());
	}

	displayDate(start) {
		return moment(new Date(start)).lang('fr').format('dddd Do MMMM YYYY @ HH:mm');
	}	

	displayLength(start, end) {
		// @ts-ignore
		let diff = new Date(end) - new Date(start);
		diff = diff / 1000;
		let res = '';
		const h = diff / 3600;
		const m = (h - Math.floor(h)) * 60;
		res = '0' + Math.floor(h) + 'h';
		if (m < 10) {
			res += '0' + m;
		} else {
			res += Math.floor(m);
		}
		return res + 'min';
	}

	openExam(id: string) {
		console.log('OPEN DETAILSSS' + id);
		window.open("/exams/past_exams/"+id,"_self");
	}
}
