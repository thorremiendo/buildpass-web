import { Injectable } from "@angular/core";
import { UserBuilder } from '../builders/user.builder';
import { AdapterInterface } from '../interfaces';
import { UserEmployeeAdapter } from './user-employee.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements AdapterInterface {
  constructor(
    public userEmployeeAdapter: UserEmployeeAdapter,
  ) {}

  adapt(request) {
    const {
       id,
       first_name,
       middle_name,
       last_name,
       suffix_name,
       birthdate,
       gender,
       marital_status_id,
       contact_number,
       home_address,
       email_address,
       photo_path,
       id_photo_path,
       id_type,
       id_number,
       is_admin,
       created_at,
       updated_at,
       employee_details = [],
    
    } = request;

    let roles = [];

    if(employee_details && employee_details.length) {
      roles = employee_details.map(role => {
        return this.userEmployeeAdapter.adapt(role.role);
      });
    }

    roles = employee_details.map(role => {
      return this.userEmployeeAdapter.adapt(role.role);
    });

    const user = new UserBuilder()
      .setId(id)
      .setFirst_name(first_name)
      .setMiddle_name(middle_name)
      .setLast_name(last_name)
      .setSuffix_name(suffix_name)
      .setMarital_status(marital_status_id)
      .setContact_number(contact_number)
      .setGender(gender)
      .setBirthdate(birthdate)
      .setHome_address(home_address)
      .setEmail_address(email_address)
      .setPhoto_path(photo_path)
      .setId_photo_path(id_photo_path)
      .setId_type(id_type)
      .setId_number(id_number)
      .setIs_admin(is_admin)
      .setCreated_at(created_at)
      .setUpdated_at(updated_at)
      .setEmployee_details(employee_details)
      .build();

    return user;
  }
}
