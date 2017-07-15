import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, Response } from '@angular/http';

import { Card } from '../../app/app.component';
import { Score } from '../../app/app.component';

@Component({
	selector: 'page-play',
	templateUrl: 'play.html'
})
export class PlayPage {

	activeCard = null;
	clicks = 0;
	matches = 0;
	isRunning = false;

	CARDS: Card[] = [];

	constructor(public navCtrl: NavController, private http: Http) {
		this.reset();
	};

	reset() {
		this.generateCards();
		this.shuffleCards();
		this.clicks = 0;
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
				this.clicks++;
			} else {
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
							this.saveScores();
						}
					}, 500);
				}
			}
		}
	};

	saveScores() {
		var score = new Score(1, "John Doe", "john.doe@gmail.com", 10);
		let bodyString = JSON.stringify(score); 
		let headers = new Headers({ 'Content-type': 'application/json', 'Authorization': 'Basic YWJkOWQ3MjgtMzA0Yi00ZjhjLWJiZmEtOTU5NDUzZmZiYjU5OjMwYzQyYjM3LTgxMTEtNGRhZC1hYWI4LTM3Yzc0MTFiN2RlYQ==' });

		this.http.post("https://scores.restlet.net:443/v1/scores/", bodyString, {"headers": headers})
                         .map((res:Response) => res.json())
                         .subscribe(
                                score => {
                                    console.log(score)
                                }, 
                                err => {
                                    console.log(err);
                                });;
	}

}
