import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private userService : UserService) { }

  isProf : any;
  
  ngOnInit(): void {
    this.isProf = this.userService.isProf;
  }

  
}
