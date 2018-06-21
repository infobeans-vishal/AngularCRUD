import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import {NgForm} from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private httpClient: HttpClient) { }
	name: string = '';
	certificationName: string = '';
	found: boolean = false;
	uri: string;
	responseData: any[];
	certificationTypes: any[];
	ceuId: number;
	isPostData:boolean = false;
	isCount:string = 'count';
	result:string ;


	onNameKeyUp(event: any) {
		this.name = event.target.value;
		this.found = false;
	}

	getData() {
		this.result = '';
		this.isPostData = false;
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNeUlDQyIsImF1ZCI6IkFQSSIsImlhdCI6MTUwMDYxNzYzMH0.jL96etqwcsfiWKP1-klT3DUTTbwiiPDgTvVOYgQc0Ws');
		this.isCount = this.name;
		console.log(this.name);
		this.httpClient.get(`http://localhost/trex/web/app_dev.php/api/v1/member/376336/candidate-ceus?action=${this.name}&expired=false`, { headers: headers })
			.subscribe(
			(data: any[]) => {
				this.found = true;
				
				if ('list' == this.isCount) {
					this.certificationTypes = data[0].candidateceu;
				} else if('count' == this.isCount){
					this.certificationTypes = data;
				}
				console.log(this.certificationTypes);

			}
			)
	}

	postData() {
		this.isPostData = true;
		this.found = false;
	}

	deleteCeus(val) {
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNeUlDQyIsImF1ZCI6IkFQSSIsImlhdCI6MTUwMDYxNzYzMH0.jL96etqwcsfiWKP1-klT3DUTTbwiiPDgTvVOYgQc0Ws');

		this.httpClient.delete(`http://localhost/trex/web/app_dev.php/api/v1/member/376336/candidate-ceu?ceu_id=${val}&deleted_by=vishal@infobeans.com`, { headers: headers })
			.subscribe(
			(val) => {

				console.log("DELETE call successful value returned in body",
					val);
				this.getData();
			},
			response => {
				console.log("DELETE call in error", response);
			},
			() => {
				console.log("The DELETE observable is now completed.");
			});

	}

	register (myForm: NgForm) {
		console.log(myForm.value);
		console.log('Successful registration');
		console.log(myForm.value.ceuId);

		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNeUlDQyIsImF1ZCI6IkFQSSIsImlhdCI6MTUwMDYxNzYzMH0.jL96etqwcsfiWKP1-klT3DUTTbwiiPDgTvVOYgQc0Ws');
		this.httpClient.post(`http://localhost/trex/web/app_dev.php/api/v1/member/376336/candidate-ceu`,
			{
				"ceu_id": myForm.value.ceuId,
				"activity_type_id": myForm.value.activityTypeId,
				"ceu_role": myForm.value.ceuRole,
				"activity_name": myForm.value.activityName,
				"provider_name": myForm.value.providerName,
				"activity_date": myForm.value.activityDate,
				"activity_quantity": myForm.value.activityQuantity,
				"ceus_remained": myForm.value.ceusRemained,
				"created_by": myForm.value.createdBy
			}, { headers: headers })
			.subscribe(
			(val) => {
				console.log("POST call successful value returned in body",
					val);
			this.result = "POST call successful value returned in body";
			},
			response => {
				
				console.log("POST call in error", response);
				this.result = response.error.response.Notifications.message;
			},
			() => {
				console.log("The POST observable is now completed.");
				this.result = "The POST observable is now completed.";
			});
	  }
}
