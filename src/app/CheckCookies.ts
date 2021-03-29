import {CookieService} from 'ngx-cookie-service';

export default class CheckCookies {
	constructor(private cookie: CookieService) {
	}

	isProf() {
		if (!this.cookie.check('type')) {
			return -1;
		}
		if (this.cookie.get('type') === 'stud') {
			return 0;
		}
		return 1;

	}

	connectStudent(id){
		this.cookie.set("type","stud");
		this.cookie.set("id",id);
	}

	connectPro(id){
		this.cookie.set("type","prof");
		this.cookie.set("id",id);
	}

	getId(){
		return this.cookie.get("id");
	}

	disconnect() {
		this.cookie.deleteAll();
		return true;
	}

	isProfBoolean() :boolean {
		const c = this.isProf();
		switch (c){
			case 1:
				return true;
			case 0:
				return false;
			case -1:
				return null;
		}
	}
}
