import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import {faEnvelopeOpenText, faHome, faPowerOff, faTasks, faUser, faVial} from '@fortawesome/free-solid-svg-icons';
import CheckCookies from '../../CheckCookies';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../../environments/environment';
import * as moment from 'moment';
@Component({
	selector: 'app-pro-header',
	templateUrl: './pro.component.html',
	styleUrls: ['./pro.component.css']
})
export class ProComponentHeader implements OnInit {
	screenWidth = window.innerWidth;
	userName: Object = "--";
	time = moment().lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');

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
		const url = base_url+"teachers/name/"+new CheckCookies(this.cookie).getId();
		console.log(url)
		this.http.get(url).subscribe(res=>{
			this.userName = res['name'];
		})

		if(window.location.pathname.includes("exams/past_exams")){
			this.active=1;
		}else{
			if(window.location.pathname.includes("results")){
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
