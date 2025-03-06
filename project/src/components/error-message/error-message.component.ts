import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit {
@Input() message: string = '';

constructor(private snackBar: MatSnackBar) {}
ngOnInit() {
  this.showError();
}
showError() {
  this.snackBar.open(this.message, '❌', {
    duration: 5000, 
    panelClass: ['error-snackbar'] 
  });
}
}
