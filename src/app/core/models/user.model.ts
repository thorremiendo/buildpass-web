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

export interface UserModel{
   id:string,
   firebase_uid:string;
   first_name:string;
   middle_name:string;
   last_name:string;
   suffix_name:string;
   birthdate:string;
   gender:string;
   marital_status_id:string;

   contact_number:string;
   email_address:string, 
   emailVerified:boolean;
  
   home_address:string;
   barangay:string;

   employee_no:string;
   department:string;
   position:string;

   photo_path:string;
   id_photo_path:string;
   id_type: string,
   id_number: string,

   is_admin:string,
   is_evaluator:boolean;

}