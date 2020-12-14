import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'



@Injectable()


export class MessagingService {
    currentMessage = new BehaviorSubject(null);
    constructor(private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messages.subscribe(
            (_messaging: AngularFireMessaging) => {
              _messaging.onMessage = _messaging.onMessage.bind(_messaging);
              _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
            }
          )
        
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                console.log(token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log("new message received. ", payload);
                this.currentMessage.next(payload);
                this.showCustomNotiFication(payload);
            })
        
    }

    showCustomNotiFication(payload){
        let notify_data = payload['notification'];
        let title = notify_data['title'];
        let options={
            body:notify_data['body'],
            icon: "../../../assets/images/cbao-cartoon.png",
            image:"../../../assets/images/cbao-cartoon.png",
            badge: "../../../assets/images/cbao-cartoon.png",

        };
        console.log("new messages " + notify_data);
        let notify: Notification = new Notification(title,options)

        notify.onclick = event =>{
            event.preventDefault();
            window.location.href= 'http://127.0.0.1:4200/test-notification';
        }

        

    }

   
}