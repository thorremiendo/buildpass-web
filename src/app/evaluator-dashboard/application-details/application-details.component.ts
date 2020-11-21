import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2'

//map
import { environment } from '../../../environments/environment'
import { ChangeDetectorRef } from '@angular/core';
import { Map } from 'mapbox-gl/dist/mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Marker } from 'mapbox-gl/dist/mapbox-gl'
@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  public evaluatorDetails;
  public user;
  public role_id = "2"
  public pdfSrc;
  public formName;
  public isCompliant;
  public selectedForm;
  public formDetails: FormGroup
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
 //map
 map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 16.4136559;
  lng = 120.5893339;
  marker: mapboxgl.Marker
  public lnglat; 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formDetails = this.fb.group({
      is_compliant: new FormControl("")
    })
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
      this.authService.getFireBaseData(this.user.user.uid).subscribe(result =>{
        this.evaluatorDetails = result.data();
        console.log(this.evaluatorDetails)
      })
    });
    //map
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new Map({
      container: 'map',
      style: this.style,
      zoom: 16,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.marker = new Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map); //

    this.map.addControl(new mapboxgl.NavigationControl());

    this.marker.on('dragend', this.onDragEnd);
  }
  onDragEnd() {
    console.log(this.marker)
  }
  handleForm(value){
    this.selectedForm = value
    if(value == 'zoning') {
      this.pdfSrc = 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf'
      this.formName = "Zoning Clearance Application Form"
    }
    else if (value == 'building'){
      this.pdfSrc = 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Unified_Application_for_Building_Permit.pdf'
      this.formName = "Building Permit Application Form"
    }
    else if (value == 'electric'){
      this.pdfSrc = 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Electrical_Permit.pdf'
      this.formName = "Electrical Permit Application Form"
    }else if (value == 'sanitary'){
      this.pdfSrc = 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Sanitary_Plumbing_Permit.pdf'
      this.formName = "Sanitary Permit Application Form"
    } else if (value == 'buildingPlan'){
      this.pdfSrc = ''
      this.formName = "Building Plan"
    } else if (value == 'copyOfTitle'){
      this.pdfSrc = ''
      this.formName = "Certified True Copy of Title"
    }
    else if (value == 'zoningClearance'){
      this.pdfSrc = 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Certificate+of+Zoning+Compliance+Form-BLANK+FORM.doc.pdf'
      this.formName = "Certificate of Zoning Clearance"
    }
    
  }

  handleSubmit(value){
    console.log(value,this.isCompliant)
    if(value == 'zoning'){
      if(this.isCompliant == 'Yes'){
        this.zoningPermit.is_compliant = "Yes"
        console.log(this.zoningPermit.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.zoningPermit.is_compliant = "No"
      }
    }
    else if(value == 'building'){
      if(this.isCompliant == 'Yes'){
        this.buildingPermit.is_compliant = "Yes"
        console.log(this.buildingPermit.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.buildingPermit.is_compliant = "No"
      }
    }
    else if(value == 'electric'){
      if(this.isCompliant == 'Yes'){
        this.electricPermit.is_compliant = "Yes"
        console.log(this.electricPermit.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.electricPermit.is_compliant = "No"
      }
    }else if(value == 'sanitary'){
      if(this.isCompliant == 'Yes'){
        this.sanitaryPermit.is_compliant = "Yes"
        console.log(this.sanitaryPermit.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.sanitaryPermit.is_compliant = "No"
      }
    }
    else if(value == 'buildingPlan'){
      if(this.isCompliant == 'Yes'){
        this.buildingPlan.is_compliant = "Yes"
        console.log(this.buildingPlan.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.buildingPlan.is_compliant = "No"
      }
    }else if(value == 'copyOfTitle'){
      if(this.isCompliant == 'Yes'){
        this.copyOfTitle.is_compliant = "Yes"
        console.log(this.copyOfTitle.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.copyOfTitle.is_compliant = "No"
      }
    }else if(value == 'zoningClearance'){
      if(this.isCompliant == 'Yes'){
        this.zoningClearance.is_compliant = "Yes"
        console.log(this.zoningClearance.is_compliant)
      } else if (this.isCompliant == 'No'){
        this.zoningClearance.is_compliant = "No"
      }
    }
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
}
