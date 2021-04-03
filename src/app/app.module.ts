import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

import {LoginV2Component} from './login-v2/login-v2.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SignupComponent} from './signup/signup.component';
import {FooterComponent} from './footer/footer.component';
import {ProfComponent} from './prof/prof.component';
import {CookieService} from 'ngx-cookie-service';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {DiscoComponent} from './home/disco/disco.component';
import {StuComponent} from './home/stu/stu.component';
import {ProComponent} from './home/pro/pro.component';
import {StuComponentHeader} from './header/stu/stu.component';
import {ProComponentHeader} from './header/pro/pro.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { HttpClientModule } from '@angular/common/http';
import { PastExamsComponent } from './past-exams/past-exams.component';
import { StuOldExamsComponent } from './past-exams/stu-old-exams/stu-old-exams.component';
import { ProOldExamsComponent } from './past-exams/pro-old-exams/pro-old-exams.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PassedExamDetailsComponent } from './passed-exam-details/passed-exam-details.component';
import { StuExamOldComponent } from './passed-exam-details/stu-exam-old/stu-exam-old.component';
import { ProExamOldComponent } from './passed-exam-details/pro-exam-old/pro-exam-old.component';
import { ProfileComponent } from './profile/profile.component';
import { StuProfileComponent } from './profile/stu-profile/stu-profile.component';
import { StuProfessorComponent } from './profile/stu-professor/stu-professor.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAnimationsModule } from 'ngx-animations';
import { NewExamComponent } from './new-exam/new-exam.component';
import { InProgressExamComponent } from './in-progress-exam/in-progress-exam.component';
import { ProgStuComponent } from './in-progress-exam/prog-stu/prog-stu.component';
import { ProgProComponent } from './in-progress-exam/prog-pro/prog-pro.component';

export function momentAdapterFactory() {
	return adapterFactory(moment);
};


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LoginV2Component,
		SignupComponent,
		FooterComponent,
		ProfComponent,
		HeaderComponent,
		HomeComponent,
		DiscoComponent,
		StuComponent,
		ProComponent,
		ProComponentHeader,
		StuComponentHeader,
		PastExamsComponent,
		StuOldExamsComponent,
		ProOldExamsComponent,
		PassedExamDetailsComponent,
		StuExamOldComponent,
		ProExamOldComponent,
		ProfileComponent,
		StuProfileComponent,
		StuProfessorComponent,
		NewExamComponent,
		InProgressExamComponent,
		ProgStuComponent,
		ProgProComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		FontAwesomeModule,
		NgCircleProgressModule.forRoot({
			radius: 100,
			outerStrokeWidth: 8,
			innerStrokeWidth: 3,
			outerStrokeColor: '#1b3868',
			innerStrokeColor: '#0edc00',
			animationDuration: 300,
		}),
		CalendarModule.forRoot({provide: DateAdapter, useFactory: momentAdapterFactory}),
		NgxPaginationModule,
		BrowserAnimationsModule,
		NgxAnimationsModule,


	],
	providers: [CookieService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
