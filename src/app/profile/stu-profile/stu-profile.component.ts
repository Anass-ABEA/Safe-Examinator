import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { base_url } from '../../../environments/environment';
import CheckCookies from '../../CheckCookies';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import has = Reflect.has;
import {log} from 'util';



@Component({
	selector: 'app-stu-profile',
	templateUrl: './stu-profile.component.html',
	styleUrls: ['./stu-profile.component.css']
})
export class StuProfileComponent implements OnInit {
	progress  = 0;
	file = null;
	id = "";
	title = 'myNewApp';
	imageSrc: string = "assets/person.png";
	constructor(private cookie: CookieService, private http: HttpClient) { }
	password = "5f4dcc3b5aa765d61d8327deb882cf99";
	val1 = false;
	confirmChange = false;
	data = {
		fname: "N/A",
		lname: 'N/A',
		pic: 'N/A',
		groupe: 'N/A',
		year: 'N/A',
		genie: "N/A",
		email: "N/A"
	}
	credentials = {
		passwordOld: "",
		passwordNew: "",
		passwordNewCOnf: "",
	}

	verified = false;

	ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();
		console.log(this.id);
		this.http.get(base_url + "student/profileDetails/" + this.id).subscribe(res => {
			// @ts-ignore
			this.data = res;
			//this.imageSrc ='assets/person.png';
			this.imageSrc = this.data.pic;

		})
	}
	addForm = new FormGroup({
		image: new FormControl('', Validators.required),
		imageSrc: new FormControl('', Validators.required)
	});

	get f() {
		return this.addForm.controls;
	}

	onFileChange(event) {
		var files = event.target.files;
		this.file = files[0];
		if (files && this.file) {
			document.getElementById("mainLoader").style.display = "block";
			var reader = new FileReader();
			const [image] = event.target.files;
			reader.readAsDataURL(image);
			reader.onprogress = function(ev){
				if(ev.lengthComputable){
					var pourcent = ev.loaded*100/ev.total;
					console.log(pourcent+"%");
					document.getElementById("loader").style.width = pourcent+"%";
				}
			}
			reader.onload = () => {
				document.getElementById("mainLoader").style.display = "none";
				this.imageSrc = reader.result as string;
				this.addForm.patchValue({
					imageSrc: reader.result
				});
			};
		}
	}
	setProgress(val){
		this.progress = val;
	}


	getBase64(event) {
		let me = this;
		let file = this.file;
		let reader = new FileReader();
		reader.readAsDataURL(file);


		reader.onload = function () {

			console.log(reader.result);
			const id = new CheckCookies(me.cookie).getId();
			me.http.post(base_url + "students/connect/" + id, reader.result)
				.subscribe(res => {
					console.log(res, reader.result);
					alert('Uploaded Successfully.');
					window.location.reload();
				})
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);

		};
	}

	onSubmit() {
		document.getElementById("mainLoader").style.display = "block";
		this.getBase64(this);

		document.getElementById("mainLoader").style.display = "none";
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
		if (!this.verified) {
			const hashed = new Md5().appendStr(this.credentials.passwordOld).end();
			this.http.get(base_url + "students/connect/" + id + "/" + hashed).subscribe(res => {
				if (res == true) {
					this.verified = true;
				} else {
					this.verified = false;
				}
			})
		} else {
			const hashed = new Md5().appendStr(this.credentials.passwordNew).end();
			this.http.post(base_url + "students/update/" + id, hashed).subscribe(res => {
				if (res == true) {
					this.confirmChange = true;
					this.hideAfterX();
				}
				this.verified = false;
				this.credentials = {
					passwordOld: "",
					passwordNew: "",
					passwordNewCOnf: "",
				}
			})
		}
	}

	hideAfterX() {
		setTimeout(() => { this.confirmChange = false; }, 3000);
	}

	verify() {
		if (!this.verified) return false;
		return !(this.credentials.passwordNew.length > 0 && (this.credentials.passwordNew == this.credentials.passwordNewCOnf));
	}
}
