import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent,MatIconModule,MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) {
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
      
      console.log('New card: ' + this.currentCard);
      console.log('Game is', this.game);
  
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
    }


    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    
      dialogRef.afterClosed().subscribe(name => {
        this.game.players.push(name);
      });
    }
    

}


