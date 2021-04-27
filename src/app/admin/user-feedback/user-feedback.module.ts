import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDialogComponent, UserFeedbackComponent } from './user-feedback.component';
import { MaterialModule } from 'src/app/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [UserFeedbackComponent, FeedbackDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],

})
export class UserFeedbackModule { }
