import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatButtonComponent } from './chat-button.component';
import { MaterialModule } from 'src/app/material-module';



@NgModule({
  declarations: [ChatBodyComponent, ChatButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],

  exports:[
    ChatBodyComponent,
    ChatButtonComponent,
  ]
})
export class ChatModule { }
