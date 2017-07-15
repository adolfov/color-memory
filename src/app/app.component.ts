import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

export class Card {
  id: number;
  color: string;
  isOpen: boolean;
  isMatched: boolean;

  constructor(id: number, color: string) {
    this.id = id;
    this.color = color;
    this.isOpen = false;
    this.isMatched = false;
  }
}

export class Score {
  id: number;
  name: string;
  email: string;
  score: number;

  constructor(id: number, name: string, email: string, score: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.score = score;
  }

}
