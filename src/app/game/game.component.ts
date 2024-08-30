import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor() {
    this.game = new Game();
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      console.log('picking card', this.currentCard);
  
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
    }

}
