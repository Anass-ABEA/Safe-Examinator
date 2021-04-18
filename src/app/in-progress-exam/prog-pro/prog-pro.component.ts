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
		},1000);
  }

  loadData(){
  	this.http.get(base_url+"exam/getExamInfo/"+this.examId).subscribe(res=>{
  		// @ts-ignore
			this.exam = res;
  		// @ts-ignore
			this.exam.dateTime = new Date(this.exam.dateTime.split("WET ").join(""))

		})
	}

	calculateNote(note) {
  	const val = Math.floor(note*10000/this.exam.noteGlobal)/100;
		return `${note} / ${this.exam.noteGlobal} (${val} %)`
	}

	getStartDate(d) {
		return moment(d).lang("fr").fromNow();
	}

	getEnd(end) {
		if(end==null){
			return "En cours...";
		}
		return moment(end).lang("fr").fromNow()
	}

	banStudent(id: string,i) {
  	this.connectedStud[i].isbanned = true;
		console.log("BANNING STUDENT "+id);
	}

	getExamDate() {
		return moment(this.exam.dateTime).lang("fr").format("Do MMMM YYYY, hh:mm")
	}

	loadExamDetails() {
		this.http.get(base_url+"exam/getCoStudents/"+this.examId).subscribe(res=>{
			console.log(res);
			// @ts-ignore
			this.connectedStud = res;
		})
	}
}
