import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Card } from '../../app/app.component';

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

	constructor(public navCtrl: NavController) {
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
		var i = 0
			, j = 0
			, temp = null;

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
						// if (this.activeCard) {
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
						// }
						this.isRunning = false;
					}, 500);
				}
			}
		}
	};

}
