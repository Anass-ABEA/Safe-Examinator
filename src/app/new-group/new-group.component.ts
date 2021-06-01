import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import CheckCookies from '../CheckCookies';

@Component({
	selector: 'app-new-group',
	templateUrl: './new-group.component.html',
	styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

	id = new CheckCookies(this.cookie).getId();
	listGrpA = [];

	listGrpB = [];

	grpName = '';
	genie = 'INF';
	promo = '2021';

	grpSaved = false;

	constructor(private http: HttpClient,private cookie:CookieService) {
	}

	ngOnInit(): void {

		this.loadGroups();
	}

	genieChanged() {
		console.log(this.genie, this.promo);
		this.loadGroups();
	}


	loadGroups() {
		console.log(base_url + 'getGroups/' + this.genie + '/' + this.promo);
		this.http.get(base_url + 'getGroups/' + this.genie + '/' + this.promo).subscribe(res => {
			this.listGrpA = res[0];
			this.listGrpB = res[1];
			console.log(res);
		}, error => {
			this.listGrpA = [];
			this.listGrpB = [];
		});
	}

	getDates() {
		var d = new Date().getFullYear();
		if (new Date().getMonth() > 7) {
			d++;
		}
		return [d, d + 1, d + 2];
	}


	savGroup() {
		var listA = this.listGrpA.filter(x=>{return x.selected}).map(x => {
				return x.id;
		});
		var listB = this.listGrpB.filter(x=>{return x.selected}).map(y => {
				return y.id;
		});
		console.log(listA.concat(listB));
		console.log(base_url+"/newGroup/"+this.genie+this.promo+"/"+this.grpName+"/"+this.id);
		this.http.post(base_url+"/newGroup/"+this.genie+this.promo+"/"+this.grpName+"/"+this.id,listA.concat(listB)).subscribe(res=>{
			console.log(res);
			this.grpSaved = true;
			setTimeout(res=>{
				window.open("/","_self");
			},1000)
		})
	}

	flip(b: boolean, i: number) {
		if (b) {
			this.listGrpA[i].selected = !this.listGrpA[i].selected;
		} else {
			this.listGrpB[i].selected = !this.listGrpB[i].selected;
		}
	}
}
