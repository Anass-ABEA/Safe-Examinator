import { Component, OnInit } from '@angular/core';
import { faUserGraduate,faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../environments/environment';
import {Md5} from 'ts-md5';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';
@Component({
  selector: 'app-login-v2',
  templateUrl: './login-v2.component.html',
  styleUrls: ['./login-v2.component.css']
})
export class LoginV2Component implements OnInit {
	icons = {graduate:faUserGraduate,professor:faChalkboardTeacher}
	isProf = null;
	isPassword = false;
	value : string = "";
	credentials = {email:"",password:"",type : ""};
	wrongList = {email: false,password:false};
	const // @ts-ignore

  constructor(private http : HttpClient,private cookie : CookieService) { }

  ngOnInit(): void {


		// anassaitbenelarbi@student.emi.ac.ma
  }

	nextButton(){
  		if (this.isProf){
				this.credentials.type="teachers";

				if(this.isPassword){
					// @ts-ignore
					this.credentials.password= new Md5().appendStr(this.value).end(); // hashing the password
					this.authenticate();
				}else{
					this.credentials.email=this.value;
					this.emailExists(this.credentials.email)
				}

			}

  		if (!this.isProf){
				this.credentials.type="students";
				if(this.isPassword){
					// @ts-ignore
					this.credentials.password= new Md5().appendStr(this.value).end(); // hashing the password :-D

					this.authenticate();
				}else{
					this.credentials.email=this.value;
					this.emailExists(this.credentials.email)
				}
			}


	}

	authenticate(){
  	var url = base_url+this.credentials.type+"/connect/"+this.credentials.email.split("@")[0]+"/"+this.credentials.password;
		this.http.get(url).subscribe(res=>{
			if(res!=null){
				if(this.isProf){
					new CheckCookies(this.cookie).connectPro(this.credentials.email.split("@")[0]);
				}else{
					new CheckCookies(this.cookie).connectStudent(this.credentials.email.split("@")[0]);
				}
				window.open("/","_self");
			}else{
				this.wrongList.password = true;
			}
		})
	}

	emailExists(mail){
  	mail = mail.split("@")[0];
		mail = base_url+this.credentials.type+"/connect/"+mail;


  	this.http.get(mail).subscribe(res=>{
  		if(res){
				this.wrongList.email = false;
				this.isPassword = true;
				this.value = "";
			}else{
  			this.wrongList.email = true;
			}
		});

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

	getIcon(){
  	if(this.isProf){
  		return this.icons.professor;
		}
		return this.icons.graduate;

	}

	checkEmail() {
		if(this.isPassword){
			return false;
		}
		if(this.isProf){
			return  !this.value.includes('@emi.ac.ma')
		}else{
			return  !this.value.includes('@student.emi.ac.ma')
		}
	}

	contentChanged() {
		if(this.isPassword) return ;
		if(this.value.includes("@emi.ac.ma")){
			this.isProf = true;
		}else{
			if(this.value.includes("@student.emi.ac.ma")){
				this.isProf = false;
			}else{
				this.isProf = null;
			}
		}
	}
}
