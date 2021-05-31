import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {faBan} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../../CheckCookies';
import {ActivatedRoute} from '@angular/router';
import {base_url} from '../../../environments/environment';
@Component({
  selector: 'app-prog-pro',
  templateUrl: './prog-pro.component.html',
  styleUrls: ['./prog-pro.component.css']
})
export class ProgProComponent implements OnInit {
	icons = {
		ban : faBan,
	}
	iter = [];

	examId= this.route.params['_value'].examId;

	exam={
		title:"Java",
		target:{
			promo:"2020",
			genie:"INF",
			grps:"A",
		},
		dateTime:moment().lang("fr").format('LLLL'),
		qstCount:6,
		noteGlobal : 30
	}
	connectedStud=[
	];
	id= "";
  constructor(private route :ActivatedRoute,private http:HttpClient,private cookie :CookieService) { }

  ngOnInit(): void {
  	this.id = new CheckCookies(this.cookie).getId();
  	this.loadData(); //SET INTERVAL ON IT
		setInterval(()=>{
			this.loadExamDetails();
		},400);
  }

  loadData(){
  	this.http.get(base_url+"exam/getExamInfo/"+this.examId).subscribe(res=>{
  		// @ts-ignore
			this.exam = res;
			// @ts-ignore
			for(let x= 0; x <res.qstCount;x++){
				this.iter.push(0);
			}
  		// @ts-ignore
			this.exam.dateTime = new Date(this.exam.dateTime.split("WET ").join(""))

		})
	}

	calculateNote(note) {
  	const val = Math.floor(note*10000/this.exam.noteGlobal)/100;
		return `${note} / ${this.exam.noteGlobal} (${val} %)`
	}

	getStartDate(d) {
		var list = d.split("WEST ");
		d = list[0] + list[1];
		return moment(d).lang("fr").fromNow();
	}

	getEnd(end) {
		if(end==null){
			return "En cours...";
		}

		var list = end.split("WEST ");
		end = list[0] + list[1];
		return moment(end).lang("fr").fromNow()
	}

	banStudent(id: string,i) {

  	this.connectedStud[i].isbanned = true;
		this.http.get(base_url+"exams/ban/"+id+"/"+this.examId).subscribe(res =>{

		});
		console.log("banning student ", base_url+"exams/ban/"+id+"/"+this.examId);
	}

	getExamDate() {
		return moment(this.exam.dateTime).lang("fr").format("Do MMMM YYYY, hh:mm")
	}

	loadExamDetails() {
		this.http.get(base_url+"exam/g/"+this.examId).subscribe(res=>{
			console.log(res);
			// @ts-ignore
			this.connectedStud = res;
		})
	}

	check(element: any) {
		if(element){
			return element.isFraud;
		}else{
			return false;
		}
	}
}
