export interface User {
    uid:string;
    email:string;
    first_name:string;
    last_name:string;
    emailVerified:boolean;
    is_evaluator:boolean;

   
 }

 export interface RegisterAccountModel{
    uid:string;
    first_name:string;
    middle_name:string;
    last_name:string;
    suffix_name:string;
    birthdate:string;
    gender:string;
    marital_status:number;
    nationality:string;
    contact_number:string;
    email:string,
    emailVerified:boolean;
    is_evaluator:boolean;
    home_address:string;
    barangay:string;

 }

 export interface RegisterAccountEvaluatorModel{
   uid:string;
   first_name:string;
   middle_name:string;
   last_name:string;
   suffix_name:string;
   birthdate:string;
   gender:string;
   marital_status:number;

   contact_number:string;
   email:string,
   emailVerified:boolean;
   is_evaluator:boolean;
   home_address:string;
   barangay:string;

   employee_number:string;
   department:string;
   position:string;

}