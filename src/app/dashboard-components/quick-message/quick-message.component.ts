import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-quick-message',
  templateUrl: './quick-message.component.html',
  styleUrls: ['./quick-message.component.scss']
})
export class QuickMessageComponent{


  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;
  // tslint:disable-next-line - Disables all


  constructor(
    @Inject(MAT_DIALOG_DATA) public data) {
      this.selectedMessage = this.data;
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef = Object.create(null);

  isOver(): boolean {
      return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message: Object[]): void {
      this.selectedMessage = message;
      console.log(this.selectedMessage);
  
  }

  OnAddMsg(): void {
      this.msg = this.myInput.nativeElement.value;

      if (this.msg !== '') {
          this.selectedMessage.push({
              type: 'even',
              msg: this.msg,
              date: new Date()
          });
      }

      this.myInput.nativeElement.value = '';
  }

}
