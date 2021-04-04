import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
 isNext = false;
	login = '';
  password = '';
  value ='';

  constructor() { }

  ngOnInit(): void {
    /*
    *
    *$('#myModal').modal('toggle');
    *$('#myModal').modal('show');
    *$('#myModal').modal('hide');
    *$('#LoginModal').modal('show');
    $('#LoginModal').modal('toggle');
    *
    * */
  }


  checkEmail() {
    if (!this.isNext){
    	this.login = this.value;
			this.value = '';
		}else{
			this.password = this.value;
			alert(this.login + '\n' + this.password);
    }
		  this.isNext = !this.isNext;
  }

  openRegister() {
    //console.log('REGSTERING');

  }
}

