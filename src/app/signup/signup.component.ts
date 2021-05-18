import { Component, OnInit } from '@angular/core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {base_url} from '../../environments/environment';
import {Md5} from 'ts-md5';

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
		email:"",//id
		student:{
			fname:"",
			lname:"",
			password:"",
			pic:"",
			classe:{
				year:"Promotion...",
				specialty:"Génie...",
				Groups :[]
			},
		},
		confPassword:"",
		groupsAffichage:"Groupe...",
		type:"",
	};

	genie = [
		'INF',
		'IND',
		'CIV',
		'MEC',
		'ELEC',
		'MIS',
		'RT'
	];

	errorList = {email: false, password:false, nom:false, prenom:false, genie:false, groupe: false, promo:false};
	constructor(private http:HttpClient,private _router : Router) { }

	ngOnInit(): void {
	}

	signUp(){
		this.errorList = {email: false, password:false, nom:false, prenom:false, genie:false, groupe: false, promo:false};
		this.credentials.student.pic="assets/person.png"
		if(this.credentials.confPassword == this.credentials.student.password){
			if(this.isProf){
				this.credentials.type="teacher";
				this.credentials.email = this.credentials.email.toLowerCase();
				// @ts-ignore

				this.SignUpBackend_prof(this.credentials).subscribe(res=>{
					if(res){
						console.log("registration done");
						alert("Inscription réussite\nVous pouvez vous connecter");
						this._router.navigate(['/']);
					}else{
						this.errorList.email = true;
					}

				})
			}else{
				this.credentials.type="student";
				this.credentials.student.classe.Groups.push(this.credentials.groupsAffichage);
				this.credentials.email = this.credentials.email.toLowerCase();
				// @ts-ignore

				var genie = this.getGenie(this.credentials.student.classe.specialty);
				this.credentials.student.classe.specialty = genie;
				this.SignUpBackend_stud(this.credentials).subscribe(res=>{
					if(res){
						console.log("registration done");
						alert("Inscription réussite\nVous pouvez vous connecter");
						this._router.navigate(['/']);
					}else{
						this.errorList.email = true;
					}

				})

			}

		}else{
			this.errorList.password = true;
		}
	}

	SignUpBackend_stud(Inscription :any):Observable<any>{
		const value = JSON.parse(JSON.stringify(Inscription));
		value.student.password = new Md5().appendStr(Inscription.student.password).end();
		return this.http.post<any>(base_url+'students/Register/'+Inscription.groupsAffichage,{id:Inscription.email.split("@")[0], student:value.student});
	}

	SignUpBackend_prof(Inscription :any):Observable<any>{
		const value = JSON.parse(JSON.stringify(Inscription));
		value.student.password = new Md5().appendStr(Inscription.student.password).end();
		return this.http.post<any>(base_url+'profs/Register/',{id:Inscription.email.split("@")[0], teacher:value.student});
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
		if (this.credentials.student.password.length==0 || this.credentials.confPassword.length==0){
			return false;
		}
		return this.credentials.student.password != this.credentials.confPassword;
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
				return this.credentials.groupsAffichage.includes("...");
			case 'genie':
				return this.credentials.student.classe.specialty.includes("...");
			case 'promo':
				return this.credentials.student.classe.year.includes("...");
		}
	}

	private getGenie(specialty: string) {
		for (let i = 0; i < this.genie.length; i++) {
			if(specialty.toUpperCase().includes(this.genie[i])){
				return this.genie[i];
			}
		}
	}
}
