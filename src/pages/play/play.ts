import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, Headers, Response } from '@angular/http';

import { Card } from '../../app/app.component';
import { Score } from '../../app/app.component';

@Component({
	selector: 'page-play',
	templateUrl: 'play.html'
})
export class PlayPage {

	activeCard = null;
	attempts = 0;
	matches = 0;
	isRunning = false;

	CARDS: Card[] = [];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: Http) {
		this.reset();
	};

	reset() {
		this.generateCards();
		this.shuffleCards();
		this.attempts = 0;
		this.matches = 0;
	}

	generateCards() {
		this.CARDS = [];
		for (var _i = 1; _i <= 8; _i++) {
			this.CARDS.push(new Card(_i, "colour" + _i));
			this.CARDS.push(new Card(_i + 1, "colour" + _i));
		}
	};

	shuffleCards() {
		var j = 0, temp = null;

		for (var i = this.CARDS.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1));
			temp = this.CARDS[i];
			this.CARDS[i] = this.CARDS[j];
			this.CARDS[j] = temp;
		}
	}

	cardClick(card) {
		if (!this.isRunning) {
			if (!this.activeCard) {
				this.activeCard = card;
				this.activeCard.isOpen = !this.activeCard.isOpen;
			} else {
				this.attempts++;
				if (this.activeCard.id == card.id) {
					this.activeCard.isOpen = !this.activeCard.isOpen;
					this.activeCard = null;
				} else {
					this.isRunning = true;
					card.isOpen = !card.isOpen;
					setTimeout(() => {
						if (this.activeCard.color == card.color) {
							this.matches++;
							this.activeCard.isMatched = true;
							card.isMatched = true;
							this.activeCard = null;
						} else {
							this.activeCard.isOpen = false;
							card.isOpen = false;
							this.activeCard = null;
						}
						this.isRunning = false;
						if (this.matches == 8) {
							this.showPrompt();
						}
					}, 500);
				}
			}
		}
	};

	saveScores(name, email) {
		var scoreValue = 100 + this.matches - this.attempts;
		var score = new Score(name, email, scoreValue);
		let bodyString = JSON.stringify(score); 
		let headers = new Headers({ 'Content-type': 'application/json', 'Authorization': 'Basic YWJkOWQ3MjgtMzA0Yi00ZjhjLWJiZmEtOTU5NDUzZmZiYjU5OjMwYzQyYjM3LTgxMTEtNGRhZC1hYWI4LTM3Yzc0MTFiN2RlYQ==' });

		this.http.post("https://scores.restlet.net:443/v1/scores?sort=score%20DESC,", bodyString, {"headers": headers})
		.map((res:Response) => res.json())
		.subscribe(
			score => {
				console.log(score)
			}, 
			err => {
				console.log(err);
			});;
	}

	showPrompt() {
		let prompt = this.alertCtrl.create({
			title: 'Save your Score',
			message: "Enter a name and email to save your score",
			inputs: [
			{
				name: 'Name',
				placeholder: 'Jane Doe'
			},
			{
				name: 'Email',
				placeholder: 'jane.doe@gmail.com'
			}
			],
			buttons: [
			{
				text: 'Cancel',
				handler: data => {
					this.reset();
				}
			},
			{
				text: 'Save',
				handler: data => {
					if (data.Name) {
						this.saveScores(data.Name, data.Email);
					}
					this.reset();
				}
			}
			]
		});
		prompt.present();
	}


}
