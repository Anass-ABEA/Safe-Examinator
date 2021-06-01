import { Component, OnInit } from '@angular/core';
import {faEye, faPen} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import jspdf from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resultats-etudiants',
  templateUrl: './resultats-etudiants.component.html',
  styleUrls: ['./resultats-etudiants.component.css']
})
export class ResultatsEtudiantsComponent implements OnInit {
	selectedExam = -1;
	id = new CheckCookies(this.cookie).getId();

	export = false;

	studentsList = [
	]

	icons = {
		eye:faEye,
		pen:faPen
	}

	examList=[

	]

  constructor(private http:HttpClient,private cookie:CookieService,private route :ActivatedRoute) { }

  ngOnInit(): void {
		this.http.get(base_url+"ExamsProfsCartes/"+this.id).subscribe(res=>{
			// @ts-ignore
			this.examList = res;
			// @ts-ignore
			this.examList = this.examList.map(X =>{
				const list = X.date.split(" WEST");
				X.date =  moment(list[0]+ list[1]).lang('fr').format('dddd Do MMMM YYYY, HH:mm:ss');
				console.log(X.date);
				return X;
			})


			const id_exam = this.route.params['_value'].examId;
			if(id_exam){
				let i = 0;
				for(let x of this.examList){
					if(x.id===id_exam){
						this.setSelectedExam(i);

					}
					i++;
				}
			}
		})

  }

	setSelectedExam(i: number) {
		this.selectedExam = i;
		this.http.get(base_url+"getStudents/"+this.examList[i].id).subscribe(res=>{
			console.log(res);
			// @ts-ignore
			this.studentsList = res;
			this.studentsList.sort((x,y)=>{
				return x.lname.toUpperCase().localeCompare(y.lname.toUpperCase())
			})
		})
	}

	openCorrection(id: string) {
		window.open("/correctExam/"+this.examList[this.selectedExam].id+"/"+id,"_self");
	}

	downloadResults(){
		this.export = true;
		var element = document.getElementById('tableToDownload');
		html2canvas(element).then((canvas) => {
			var doc = new jspdf();
			console.log(canvas);
			var imgData = canvas.toDataURL('image/png');
			var imgHeight = canvas.height * 208 / canvas.width;
			doc.addImage(imgData, 10, 10, 190, imgHeight);
			doc.save(this.examList[this.selectedExam].title+"_"+this.examList[this.selectedExam].promo+'.pdf');
			setTimeout(()=>{
				this.export = false;
			},2000);
		});

	}




}
