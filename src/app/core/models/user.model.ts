import { EmployeeDetails } from "./employee-details-model";
import { UserBuilder } from '../builders/user.builder';

export interface User {
    firebase_uid:string;
    email:string;
    first_name:string;
    last_name:string;
    emailVerified:boolean;
    is_evaluator:boolean;

   
 }

 export interface RegisterAccountModel{
    firebase_uid:string;
    first_name:string;
    middle_name:string;
    last_name:string;
    suffix_name:string;
    birthdate:string;
    gender:string;
    marital_status_id:string;
    nationality:string;
    contact_number:string;
    email:string,
    emailVerified:boolean;
    is_evaluator:boolean;
    home_address:string;
    barangay:string;

    photo: string 
    

 }

 export interface RegisterAccountEvaluatorModel{
   firebase_uid:string;
   first_name:string;
   middle_name:string;
   last_name:string;
   suffix_name:string;
   birthdate:string;
   gender:string;
   marital_status_id:string;

   mobile_no:string;
   email_address:string, 
   emailVerified:boolean;
   is_evaluator:boolean;
   home_address:string;
   barangay:string;

   employee_number:string;
   department:string;
   position:string;

   photo:string;

}

export class UserModel{
   id:number;
   firebase_uid:string;
   first_name:string;
   middle_name:string;
   last_name:string;
   suffix_name:string;
   birthdate:string;
   gender:string;
   marital_status_id:number;

   contact_number:string;
   email_address:string;
   emailVerified:boolean;
  
   home_address:string;
   barangay:string;

   employee_no:string;
   department:string;
   position:string;

   photo_path:string;
   id_photo_path:string;
   id_type: number;
   id_number: string;

   is_admin:number;
   is_evaluator:boolean;

   employee_details: EmployeeDetails[]

   get fullName(): string {
      return `${this.first_name ? this.first_name : ''} ${this.last_name ? this.last_name : ''}`;
    }
  

   constructor(
      private userBuilder: UserBuilder,
    ){
      this.id = this.userBuilder.id;
      this.first_name = this.userBuilder.first_name;
      this.middle_name = this.userBuilder.middle_name;
      this.last_name = this.userBuilder.last_name;
      this.suffix_name = this.userBuilder.suffix_name;
      this.marital_status_id = this.userBuilder.marital_status_id;
      this.gender = this.userBuilder.gender;
      this.birthdate = this.userBuilder.birthdate;
      this.contact_number = this.userBuilder.contact_number;
      this.email_address = this.userBuilder.email_address;
      this.home_address = this.userBuilder.home_address;
     //this.barangay = this.userBuilder.barangay;
      this.photo_path = this.userBuilder.photo_path;
      this.id_type = this.userBuilder.id_type;
      this.id_photo_path = this.userBuilder.id_photo_path;
      this.id_number = this.userBuilder.id_number;
      this.is_admin = this.userBuilder.is_admin;
      this.employee_details = this.userBuilder.employee_details;

      

    }

}

export interface UserCredential {
   id: string;
   user: string;
   firebaseUid: string;
   emailVerifiedAt: string;
   createdAt: string;
 }
 