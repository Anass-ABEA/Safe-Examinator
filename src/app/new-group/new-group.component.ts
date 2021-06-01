import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {base_url} from '../../environments/environment';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

	listGrpA= [
		{
			id:"OK",
			name:"X Y"
		},{
			id:"OK2",
			name:"X Y"
		}
	]

	listGrpB= [
		{
			id:"OK4",
			name:"X Y"
		},{
			id:"OK3",
			name:"X Y"
		}
	]

	grpName="";
	genie = "INF";
	promo = "2021";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

		this.loadGroups();
  }

	genieChanged() {
		this.loadGroups()
	}


	loadGroups() {
			this.http.get(base_url+"getGroups/"+this.genie+"/"+this.promo).subscribe(res=>{
				this.listGrpA = res[0];
				this.listGrpB = res[1];
			})
	}

	getDates() {
		var d = new Date().getFullYear();
		if(new Date().getMonth()>7){
			d++;
		}
		return [d,d+1,d+2];
	}


}
