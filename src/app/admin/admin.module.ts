import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.service';
import { AdminDashboardRoutingModule } from './dashboard-layout/admin-dashboard-layout.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';
import { AdminUsersModule } from './admin-users/admin-user.module';
import { AdminDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { MaterialModule } from '../material-module';
import { QuillModule } from 'ngx-quill';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { EmployeeResetPasswordComponent } from './employee-reset-password/employee-reset-password.component';
import { AdminNewsEditorComponent } from './admin-news-announcement-editor/admin-news-editor.component';
import { EditDialogComponent } from './admin-news-announcement-editor/edit-dialog/edit-dialog.component';
import { PreviewDialogComponent } from './admin-news-announcement-editor/preview-dialog/preview-dialog.component';
import { AdminApplicationListComponent } from './admin-application-list/admin-application-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ 
    AdminSignInComponent, 
    EmployeeResetPasswordComponent, 
    AdminNewsEditorComponent,
    EditDialogComponent,
    PreviewDialogComponent,
    AdminApplicationListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    DashboardLayoutModule,
    RouterModule,
    LayoutModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ImageCropperModule,
    QuillModule.forRoot(),
    
    AdminRoutingModule,
    AdminDashboardRoutingModule,
    AdminUsersModule,
    AdminDashboardModule,
    MaterialModule,
  ],

  providers: [
    AdminRoutingModule,
  ]
})
export class AdminModule { }
