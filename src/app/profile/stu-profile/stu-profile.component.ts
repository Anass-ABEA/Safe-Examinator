import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../../environments/environment.prod';
import CheckCookies from '../../CheckCookies';
import has = Reflect.has;



@Component({
  selector: 'app-stu-profile',
  templateUrl: './stu-profile.component.html',
  styleUrls: ['./stu-profile.component.css']
})
export class StuProfileComponent implements OnInit {

  constructor(private cookie:CookieService,private http:HttpClient) { }
	password = "5f4dcc3b5aa765d61d8327deb882cf99";
  val1 = false;
	confirmChange = false;
  data = {
  	fname : "John",
		lname : 'DOE',
		groupe: 'A',
		year : '2023',
		genie: "Informatique",
		email:"johndoe@student.emi.ac.ma"
	}
	credentials = {
  	passwordOld : "",
		passwordNew : "",
		passwordNewCOnf:"",
	}
	verified = false;

  ngOnInit(): void {
  }

  // password is = "password"
	passChange() {
		// const hashedPass= new Md5().appendStr(this.credentials.passwordOld).end();
		// // @ts-ignore
		// if(hashedPass.length == this.password.length  && hashedPass.includes(this.password)){
		// 	this.val1 = true;
		// }else{
		// 	this.val1=false;
		// }
	}

	CheckPassword() {
		const id = new CheckCookies(this.cookie).getId();
			if(!this.verified){
				const hashed =  new Md5().appendStr(this.credentials.passwordOld).end();
				this.http.get(base_url+"students/connect/"+id+"/"+hashed).subscribe(res=>{
					if(res == true){
						this.verified = true;
					}else{
						this.verified = false;
					}
				})
			}else{
				const hashed =  new Md5().appendStr(this.credentials.passwordNew).end();
				this.http.post(base_url+"students/update/"+id,hashed).subscribe(res=>{
					if(res==true){
						this.confirmChange = true;
						this.hideAfterX();
					}
					this.verified = false;
					this.credentials = {
						passwordOld : "",
						passwordNew : "",
						passwordNewCOnf:"",
					}
				})
			}
	}

	hideAfterX() {
		setTimeout(()=>{this.confirmChange = false;}, 3000);
	}

	verify() {
  	if(!this.verified) return false;
		return ! (this.credentials.passwordNew.length>0 &&(this.credentials.passwordNew==this.credentials.passwordNewCOnf));
	}
}
