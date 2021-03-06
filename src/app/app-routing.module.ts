import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginV2Component} from './login-v2/login-v2.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {PastExamsComponent} from './past-exams/past-exams.component';
import {PassedExamDetailsComponent} from './passed-exam-details/passed-exam-details.component';
import {ProfileComponent} from './profile/profile.component';
import {NewExamComponent} from './new-exam/new-exam.component';
import {InProgressExamComponent} from './in-progress-exam/in-progress-exam.component';
import {ExamResultsComponent} from './exam-results/exam-results.component';

import {StudentexamsResultsComponent} from './studentexams-results/studentexams-results.component';

import {ResultsComponent} from './results/results.component';
import {EditExamComponent} from './edit-exam/edit-exam.component';
import {NewGroupComponent} from './new-group/new-group.component';
import {ResultatsEtudiantsComponent} from './resultats-etudiants/resultats-etudiants.component';
import {CorrectExamComponent} from './correct-exam/correct-exam.component';



const routes: Routes = [
	{
		path: '*', redirectTo: '/', pathMatch: 'full'
	},
	{
		path: 'login', component: LoginV2Component
	},
	{
		path: 'signup', component: SignupComponent
	},
	{
		path: '', component: HomeComponent
	},
	{
		path: 'exams/past_exams', component: PastExamsComponent
	},
	{
		path: 'exams/past_exams/:examid', component: PassedExamDetailsComponent
	},
	{
		path: 'profile', component: ProfileComponent
	},
	{
		path: 'exams/newExam', component: NewExamComponent
	},
	{
		path: 'newGroup', component: NewGroupComponent
	},
	{
		path: 'exam/:examId', component: InProgressExamComponent
	},
	{
		path: 'examResults/:examId', component: ExamResultsComponent
	},
	{
		path: 'studentexamResults', component: StudentexamsResultsComponent
	},
	{
		path: 'results', component: ResultatsEtudiantsComponent
	},
	{
		path: 'results/:examId', component: ResultatsEtudiantsComponent
	},
	{
		path: 'updateExam/:examId', component: EditExamComponent
	},
	{
		path: 'correctExam/:examId/:studentId', component: CorrectExamComponent
	}


];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
