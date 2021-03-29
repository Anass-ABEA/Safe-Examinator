import { Component, OnInit } from '@angular/core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	viewPassword = false;
	isProf = true;
	isPassword = false;
	value : string = "";
	icons= {eye:faEye,noeye:faEyeSlash};
	credentials = {
		email:"",
		password:"",
		confPassword:"",
		nom:"",
		prenom:"",
		type:"",
		promotion:"Promotion...",
		genie:"Génie...",
		groupe:"Groupe...",
	};
	errorList = {email: false, password:false, nom:false, prenom:false, genie:false, groupe: false, promo:false};
	constructor() { }

	ngOnInit(): void {
	}

	signUp(){
		if(this.credentials.confPassword == this.credentials.password){
			if(this.isPasswordCorrect()){
				if(this.isProf){
					this.credentials.type="teacher";
				}else{
					this.credentials.type="student";
				}
				alert(JSON.stringify(this.credentials));
			}else{
			}

		}else{
			alert("different password");
		}
		if(!this.isPassword ){
			this.credentials.email=this.value;
			if(this.emailExists()){
				this.isPassword = true;
				this.value="";
			}else{
				this.errorList.password = true;
			}
		}

	}
	emailExists(){
		return true;
	}
	isPasswordCorrect(){
		return true;
	}
	resetProf(bool){
		if (this.isProf!=bool){
			this.isProf=bool;
			this.isPassword=false;
			this.value=''
		}
	}

	validateEmail(){
		if(this.credentials.email.length==0){
			return false;
		}

		if(this.isProf){
			return !this.credentials.email.includes("@emi.ac.ma");
		}
		return !this.credentials.email.includes("@student.emi.ac.ma");
	}
	validatePassword(){
		if (this.credentials.password.length==0 || this.credentials.confPassword.length==0){
			return false;
		}
		return this.credentials.password != this.credentials.confPassword;
	}

	getDates() {
		var d = new Date().getFullYear();
		if(new Date().getMonth()>7){
			d++;
		}
		return [d,d+1,d+2];
	}

	validate(element:string) {
		switch(element){
			case 'groupe':
				return this.credentials.groupe.includes("...");
			case 'genie':
				return this.credentials.genie.includes("...");
			case 'promo':
				return this.credentials.promotion.includes("...");
		}
	}
}
