import {Component, OnInit} from '@angular/core';
import {faChalkboardTeacher, faCircle, faEye, faEyeSlash, faUserGraduate} from '@fortawesome/free-solid-svg-icons';
import {CookieService} from 'ngx-cookie-service';
import {base_url} from '../../../environments/environment';
import CheckCookies from '../../CheckCookies';
import {HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5';

@Component({
	selector: 'app-disco',
	templateUrl: './disco.component.html',
	styleUrls: ['./disco.component.css']
})
export class DiscoComponent implements OnInit {
	icons = {graduate: faUserGraduate, professor: faChalkboardTeacher, circle: faCircle, eye: faEye, noeye: faEyeSlash};
	screenWidth = window.innerWidth;
	isScrolled = false;
	isProf = null;
	connecting = false;
	credentials = {email: '', password: ''};
	viewPassword = false;

	constructor(private cookie: CookieService, private http: HttpClient) {
	}

	wrongList = {email: false, password: false};
	errorMessage = '';

	ngOnInit(): void {

		window.addEventListener('resize', (e) => {
			this.screenWidth = e.target['innerWidth'];
		});
		window.addEventListener('scroll', (e) => {
			if (e['path'][1]['pageYOffset'] > 0) {
				this.isScrolled = true;
			} else {
				this.isScrolled = false;
			}
		});
	}

	titleGenerator() {
		if (this.screenWidth > 500) {
			return 'Safe Exam EMI';
		}
		return 'SEE';
	}

	resetProf(bool) {
		if (this.isProf != bool) {
			this.isProf = bool;
			this.credentials.email = '';
			this.credentials.password = '';
		}
	}

	getIcon() {
		if (this.isProf) {
			return this.icons.professor;
		}
		return this.icons.graduate;

	}

	connect() {
		if (!this.isProf) {
			this.cookie.deleteAll();
			this.cookie.set('type', 'stud');
		} else {
			this.cookie.deleteAll();
			this.cookie.set('type', 'prof');
		}
		window.open('/', '_self');
	}

	getHeight() {
		return window.innerHeight;
	}

	checkChange() {
		if (this.credentials.email.includes('@emi.ac.ma')) {
			this.isProf = true;
		} else {
			if (this.credentials.email.includes('@student.emi.ac.ma')) {
				this.isProf = false;
			} else {
				this.isProf = null;
			}
		}
	}

	// qsdqs@emi.ac.ma

	authenticate() {
		this.connecting = true;
		this.errorMessage = '';
		let mail = this.credentials.email;
		mail = mail.split('@')[0];
		if (this.isProf) {
			mail = base_url + 'teachers/connect/' + mail;
		} else {
			mail = base_url + 'students/connect/' + mail;
		}
		this.http.get(mail).subscribe(res => {
			this.connecting = false;
			if (res) {
				let url = '';
				const hashedPass = new Md5().appendStr(this.credentials.password).end();
				if (this.isProf) {
					url = base_url + 'teachers/connect/' + this.credentials.email.split('@')[0] + '/' + hashedPass;
				} else {
					url = base_url + 'students/connect/' + this.credentials.email.split('@')[0] + '/' + hashedPass;
				}
				this.http.get(url).subscribe(res => {
					this.connecting = false;
					if (res != null) {
						if (this.isProf) {
							new CheckCookies(this.cookie).connectPro(this.credentials.email.split('@')[0]);
						} else {
							new CheckCookies(this.cookie).connectStudent(this.credentials.email.split('@')[0]);
						}
						window.open('/', '_self');
					} else {
						this.connecting = false;
						this.wrongList.password = true;
						this.errorMessage = 'Mot de passe incorrect';
					}
				}, (err) => {
					this.errorMessage = 'Une erreur s\'est produite merci de reessayer plustard';
				});

			} else {
				this.errorMessage = 'Cet Email n\'existe pas!';

			}
		}, (err) => {
			this.errorMessage = 'Une erreur s\'est produite merci de reessayer plustard';
			this.wrongList.email = true;
		});


		//this.emailExists(this.credentials.email);


	}

	emailExists(mail) {
		mail = mail.split('@')[0];
		if (this.isProf) {
			mail = base_url + 'teachers/connect/' + mail;
		} else {
			mail = base_url + 'students/connect/' + mail;
		}
		this.http.get(mail).subscribe(res => {
			this.connecting = false;
			if (res) {
				this.wrongList.email = false;
			} else {
				this.wrongList.email = true;
			}
		}, (err) => {
			this.errorMessage = 'Une erreur s\'est produite merci de reessayer plustard';
			this.wrongList.email = true;
		});

	}
}
