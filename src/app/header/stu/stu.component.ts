import { Component, OnInit } from '@angular/core';
import {faBell, faBellSlash, faEnvelopeOpenText, faHome, faPowerOff, faTasks, faUser, faVial} from '@fortawesome/free-solid-svg-icons';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-stu-header',
  templateUrl: './stu.component.html',
  styleUrls: ['./stu.component.css']
})
export class StuComponentHeader implements OnInit {
	screenWidth = window.innerWidth;
	userName: Object = "";
	time = moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');

	imageSrc: string = "assets/person.png";

	icons = {
		disconnect : faPowerOff,
		user: faUser,
		home:faHome,
		devoirs: faTasks,
		test : faVial,
		requests : faEnvelopeOpenText
	}
	active=0;
	constructor(private cookie : CookieService,private http:HttpClient) {
	}

	ngOnInit(): void {
		setInterval(() => {
			this.time = moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');
		}, 1000);

		window.addEventListener('resize', (e) => {
			this.screenWidth = e.target['innerWidth'];
		});
		const url = base_url+"students/name/"+new CheckCookies(this.cookie).getId();

		this.http.get(url).subscribe(res=>{
			this.userName = res['name'];
			this.imageSrc = res['pic'];
		})

		if(window.location.pathname.includes("exams/past_exams")){
			this.active=1;
		}else{
			if(window.location.pathname.includes("examResults")){
				this.active=2;
			}else{
				if(window.location.pathname.length<2){
					this.active=0;
				}else{
					this.active=-1;
				}
			}
		}

	}

	titleGenerator() {
		if (this.screenWidth > 1000) {
			return 'Safe Exam EMI';
		}
		if(this.screenWidth<762){
			return 'SEE';
		}
		return '';
	}

	disconnect() {
		if(new CheckCookies(this.cookie).disconnect()){
			window.open("/","_self");
		}

	}
}
