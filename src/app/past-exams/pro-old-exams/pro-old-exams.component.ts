import {Component, OnInit} from '@angular/core';
import {
	faBars, faCheck,
	faClock, faEye, faEyeSlash,
	faGraduationCap,
	faHourglass,
	faPen,
	faPlus,
	faPlusCircle,
	faTable, faTimes,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import {base_url} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';

@Component({
	selector: 'app-pro-old-exams',
	templateUrl: './pro-old-exams.component.html',
	styleUrls: ['./pro-old-exams.component.css']
})
export class ProOldExamsComponent implements OnInit {
	id = new CheckCookies(this.cookie).getId();

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
		plus: faPlusCircle,
		pen: faPen,
		eye: faEye,
		noEye: faEyeSlash,
		check: faCheck,
		close: faTimes,


	};
	data = [];
	cardsOld = [
	];
	cardsNew = [
	];

	constructor(private http:HttpClient,private cookie:CookieService) {
	}

	ngOnInit(): void {
		this.http.get(base_url+"exams/MyProfExams/"+this.id).subscribe(res=>{
			console.log(res[1]);
			this.cardsNew = res[0];
			this.cardsOld = res[1];
		})
	}

	displayDate(start) {
		start = start.toString().split("WET").join("");
		start = start.toString().split("WEST").join("");
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
		window.open('/exams/past_exams/' + id, '_self');
	}

	changeVisibility(id: string, visible: boolean,i : number) {
		this.http.post(base_url + 'exams/visibility/' + id, visible).subscribe(
			(res) => {
				if (res) {
					this.cardsNew[i].visible = !visible;
				}
			}
		);
	}


	startExam(id: string,started:boolean,i:number) {
		this.http.post(base_url+"exams/BeginExam/"+id,!started).subscribe(
			res =>{
				if(res){
					this.cardsNew[i].started = !started;
				}
			}
		)
	}

	editExam(id: string) {

	}


}
