import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import CheckCookies from '../../CheckCookies';
import {base_url} from '../../../environments/environment';
import {Md5} from 'ts-md5';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faHourglass, faHourglassStart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pro-profile',
  templateUrl: './stu-professor.component.html',
  styleUrls: ['./stu-professor.component.css']
})
export class StuProfessorComponent implements OnInit {
	icons={
		hourglass : faHourglassStart
	}
	data = {
		fname: "N/A",
		lname: 'N/A',
		pic: 'N/A',
		nbrExam: "N/A",
		email: "N/A"
	}
	credentials = {
		passwordOld: "",
		passwordNew: "",
		passwordNewCOnf: "",
	}
	verified = false;

	file = null;
	id = "";
	title = 'myNewApp';
	imageSrc: string = "assets/person.png";
	constructor(private cookie: CookieService, private http: HttpClient) { }
	password = "5f4dcc3b5aa765d61d8327deb882cf99";
	val1 = false;
	confirmChange = false;
	uploadingImage = false;

  ngOnInit(): void {
		this.id = new CheckCookies(this.cookie).getId();
		this.http.get(base_url + "professor/profileDetails/" + this.id).subscribe(res => {
			// @ts-ignore
			this.data = res;
			//this.imageSrc ='assets/person.png';
			this.imageSrc = this.data.pic;

		})
  }

	onFileChange(event) {
		var files = event.target.files;
		this.file = files[0];
		if (files && this.file) {
			var reader = new FileReader();
			const [image] = event.target.files;
			reader.readAsDataURL(image);
			reader.onload = () => {
				this.imageSrc = reader.result as string;
				this.addForm.patchValue({
					imageSrc: reader.result
				});
			};
		}
	}

	addForm = new FormGroup({
		image: new FormControl('', Validators.required),
		imageSrc: new FormControl('', Validators.required)
	});

	get f() {
		return this.addForm.controls;
	}

	getBase64() {
		let me = this;
		let file = this.file;
		let reader = new FileReader();
		reader.readAsDataURL(file);




		reader.onload = function () {

			console.log(reader.result);
			const id = new CheckCookies(me.cookie).getId();
			document.getElementById("loading").style.display="block";
			me.http.post(base_url + "teachers/updateImage/" + id, reader.result)
				.subscribe(res => {
					console.log(res, reader.result);
					document.getElementById("loading").style.display="none";
					window.location.reload();
				})
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);

		};
	}


	onSubmit() {
		this.getBase64();
	}

	CheckPassword() {
		const id = new CheckCookies(this.cookie).getId();
		if (!this.verified) {
			const hashed = new Md5().appendStr(this.credentials.passwordOld).end();
			this.http.get(base_url + "teachers/connect/" + id + "/" + hashed).subscribe(res => {
				if (res == true) {
					this.verified = true;
				} else {
					this.verified = false;
				}
			})
		} else {
			const hashed = new Md5().appendStr(this.credentials.passwordNew).end();
			this.http.post(base_url + "teachers/update/" + id, hashed).subscribe(res => {
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
