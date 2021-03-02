import { Injectable } from "@angular/core";
import { AdapterInterface } from '../interfaces';
import { EmployeeDetails } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserEmployeeAdapter implements AdapterInterface {
  adapt(request): EmployeeDetails {
    const {
        id,
        user_id,
        employee_number,
        position,
        office_id,
        is_enabled,
        created_at,
        updated_at,
    } = request;

    return {
        id,
        user_id,
        employee_number,
        position,
        office_id,
        is_enabled,
        created_at,
        updated_at,
    };
  }
}