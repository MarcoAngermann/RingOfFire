import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, addDoc, docData, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

constructor(private firestore: Firestore,private router: Router) { }

newGame() {
  const game = new Game();
  const gameCollection = collection(this.firestore, 'games');

  addDoc(gameCollection, { 
    players: game.players, 
    stack: game.stack, 
    playedCards: game.playedCards 
  })
  .then((docRef) => {
    console.log('Game created:', docRef.id);
    this.router.navigateByUrl(`/game/${docRef.id}`);
  })
  .catch((error) => {
    console.error('Error creating game: ', error);
  });
}
}



