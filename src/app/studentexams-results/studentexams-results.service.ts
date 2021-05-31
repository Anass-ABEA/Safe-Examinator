import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExamRes} from "./ExamType";

@Injectable({
  providedIn: 'root'
})
export class StudentexamsResultsService {

	private apiUrl = environment.apiBaseUrl;
	constructor(private http: HttpClient) { }
	public getPassedExams(idStudent: string): Observable<ExamRes>{
		return this.http.get<ExamRes>(`${this.apiUrl}/student/Scores/${idStudent}`);
	}
}
