import { Component, OnInit } from '@angular/core';

import { MessagingService } from './../core/services/messaging.service';
@Component({
  selector: 'app-test-notification',
  templateUrl: './test-notification.component.html',
  styleUrls: ['./test-notification.component.scss']
})
export class TestNotificationComponent implements OnInit {
  title = 'push-notification';
  public message;

  constructor(
    private _messagingService: MessagingService,
  ) { 
    
  }

  ngOnInit(): void {
    this._messagingService.requestPermission()
    this._messagingService.receiveMessage()
    this.message = this._messagingService.currentMessage
    
    console.log(this.message);
  }

}
