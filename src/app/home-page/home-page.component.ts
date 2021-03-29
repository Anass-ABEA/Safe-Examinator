import {Component, HostListener, OnInit} from '@angular/core';
import {faChalkboardTeacher, faUserGraduate, faCircle, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	icons = {graduate:faUserGraduate,professor:faChalkboardTeacher,circle:faCircle, eye: faEye,noeye:faEyeSlash
	}
	screenWidth = window.innerWidth;
	isScrolled  = false;
	isProf= true;
	credentials = {email:"",password:""}
	viewPassword=false;

  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
		window.addEventListener('resize', (e) => {
			this.screenWidth = e.target['innerWidth'];
		});
		window.addEventListener('scroll',(e)=>{
			if(e['path'][1]['pageYOffset']>0){
				this.isScrolled = true;
			}else{
				this.isScrolled = false;
			}
		})
  }

	titleGenerator() {
		if(this.screenWidth>500){
			return "Safe Exam EMI";
		}
		return "SEE"
	}

	resetProf(bool){
		if (this.isProf!=bool){
			this.isProf=bool;
			this.credentials.email='';
			this.credentials.password='';
		}
	}
	getIcon(){
		if(this.isProf){
			return this.icons.professor;
		}
		return this.icons.graduate;

	}

	connect() {
		if(!this.isProf){
			this.cookie.deleteAll();
			this.cookie.set("type","stud");
		}else{
			this.cookie.deleteAll();
			this.cookie.set("type","prof");
		}
		window.open("/",'_self');
	}

	getHeight() {
		return 0;
	}
}
