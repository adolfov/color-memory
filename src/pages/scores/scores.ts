import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Headers, Response } from '@angular/http';

import { Score } from '../../app/app.component';

//import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-scores',
	templateUrl: 'scores.html'
})
export class ScoresPage implements OnInit {

	scores: Score[];

	constructor(public navCtrl: NavController, private http: Http) {
	}

	getScores() {
		let headers = new Headers({ 'Authorization': 'Basic YWJkOWQ3MjgtMzA0Yi00ZjhjLWJiZmEtOTU5NDUzZmZiYjU5OjMwYzQyYjM3LTgxMTEtNGRhZC1hYWI4LTM3Yzc0MTFiN2RlYQ==' });
		return this.http.get("https://scores.restlet.net:443/v1/scores/", {"headers": headers}).map(
			(res:Response) => res.json()
			).subscribe(
			scores => this.scores = scores,
			err => {
				console.log(err);
			}
			);
		}

		ngOnInit() {
			this.getScores();
		}

	}
