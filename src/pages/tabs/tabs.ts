import { Component } from '@angular/core';

import { PlayPage } from '../play/play';
import { ScoresPage } from '../scores/scores';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabPlayRoot = PlayPage;
  tabScoresRoot = ScoresPage;

  constructor() {

  }
}
