import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogClose],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  }
