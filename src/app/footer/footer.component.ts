import { Component, OnInit } from '@angular/core';
import {faEnvelope, faGlobe, faMapMarkedAlt, faPhone} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	icons={
		phone:faPhone,
		email:faEnvelope,
		site:faGlobe,
		addr:faMapMarkedAlt
	};

  constructor() { }

  ngOnInit(): void {
  }

}
