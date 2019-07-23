import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  gameName: String = 'Example game'
  gamePasswordProtected: boolean = false

  constructor() { }

  ngOnInit() {
  }

}
