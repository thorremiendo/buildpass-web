export interface User {
    uid:string;
    email:string;
    displayName:string;
    photoURL:string;
    emailVerified:boolean;

   
 }

 export interface RegisterAccountModel{

    first_name:string;
    middle_name:string;
    last_name:string;
    suffix_name:string;
    birthdate:string;
    gender:string;
    marital_status:number;
    nationality:string;
    contact_number:string;

    home_address:string;
    barangay:string;


 }