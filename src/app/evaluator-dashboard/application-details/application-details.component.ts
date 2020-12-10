import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  public isLoading: boolean = true;
  public evaluatorDetails;
  public department = "cbao"
  public user;
  public role_id = "2"
  public pdfSrc;
  public formName;
  public isCompliant;
  public selectedForm;
  public formDetails: FormGroup;
  public clearanceForm;
  public zoningPermit = {
    is_compliant: ""
  };
  public buildingPermit = {
    is_compliant: ""
  };
  public electricPermit = {
    is_compliant: ""
  };
  public sanitaryPermit = {
    is_compliant: ""
  };
  public buildingPlan = {
    is_compliant: ""
  };public copyOfTitle = {
    is_compliant: ""
  };
  public zoningClearance = {
    is_compliant: ""
  };
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1000px',
      data: {
        department: this.department
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    // this.formDetails = this.fb.group({
    //   is_compliant: new FormControl("")
    // })
    // this.authService.currentUser.subscribe((currentUser) => {
    //   this.user = currentUser;
    //   this.authService.getFireBaseData(this.user.user.uid).subscribe(result =>{
    //     this.evaluatorDetails = result.data();
    //     this.isLoading = false;
    //   })
    // });
  
  }
  
  handleForward(){
    Swal.fire('Success!', 'Application Forwarded to CPDO', 'success').then((result) => {
      if(result.isConfirmed){
        this.router.navigateByUrl('evaluator/home/table')
      }
    })
  }
  
  handleProceed(){
    Swal.fire('Success!', 'Certificate of Zoning Clearance Released!', 'success').then((result) => {
      if(result.isConfirmed){
        this.router.navigateByUrl('evaluator/home/table')
      }
    })
  }
  generateClearance(){
    this.clearanceForm = "1"
  }
}
