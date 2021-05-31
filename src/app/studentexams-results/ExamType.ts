export interface ExamRes {

	nomEtud: string;
	listeExamens: Array<{
		note: number;
		idConnectedStu: string;
		idExam: string;
		nomeeaxam: string;
		prof: string;
		bareme: number;
		dateexam: Date;
	}>;
}
