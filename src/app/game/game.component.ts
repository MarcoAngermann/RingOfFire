import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore, docData, doc , updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game: Game;
  players: string[] = [];
  stack: string[] = [];
  playedCards: string[] = [];
  games$!: Observable<Game[]>;
  gameId: string | undefined;

  constructor(private route: ActivatedRoute,private firestore: Firestore , public dialog: MatDialog) {
    this.game = new Game();
    this.newGame();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gameId = params['gameId']; 
      if (gameId) {
        this.gameId = gameId; 
        const gameDocRef = doc(this.firestore, 'games', gameId);
        const gameData$ = docData(gameDocRef, { idField: 'id' }) as Observable<Game & { id: string }>;
        gameData$.subscribe((game: Game & { id: string }) => {
          if (game) {
            if(this.game.currentCard !== game.currentCard) {
              this.game.pickCardAnimation = true;
              setTimeout(() => {
                this.game.pickCardAnimation = false;
              }, 1000);
            }
            this.game = game;
            this.players = game.players;
            this.stack = game.stack;
            this.playedCards = game.playedCards;
            this.game.pickCardAnimation = game.pickCardAnimation;
            this.game.currentCard = game.currentCard;
          } 
        });
      } else {
        console.error('No gameId found in route');
      }
    });
  }
  
  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      console.log('New card: ' + this.game.currentCard);
      console.log('Game is', this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 1000);
    }
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe(name => {
        if(name && name.length > 0) {
          this.game.players.push(name);
          this.updateGame();
        }
      });
    }

    updateGame() {
      if (this.gameId) {
        const gameDocRef = doc(this.firestore, 'games', this.gameId);
        const gameData = {
          players: this.game.players,
          stack: this.game.stack,
          playedCards: this.game.playedCards,
          currentPlayer: this.game.currentPlayer,
          currentCard: this.game.currentCard,
          pickCardAnimation: this.game.pickCardAnimation,
        };
        const sanitizedData = JSON.parse(JSON.stringify(gameData));
        updateDoc(gameDocRef, sanitizedData)
          .then(() => {
            console.log('Game updated successfully');
          })
          .catch((error) => {
            console.error('Error updating game: ', error);
          });
      } else {
        console.error('gameID is undefined. Cannot update game.');
      }
    }
  }



