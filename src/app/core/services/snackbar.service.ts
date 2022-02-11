import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root',
  })

export class SnackBarService {

    constructor(
      public snackBar: MatSnackBar,
    ) {}

    public open(message, action, duration?) {
        if(duration){
            this.snackBar.open(message, action, { duration: duration * 1000 });
        }
        else{
            this.snackBar.open(message, action );
        }
           
     
    }
}