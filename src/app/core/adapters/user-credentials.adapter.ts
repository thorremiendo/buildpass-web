import { Injectable } from "@angular/core";
import { AdapterInterface } from '../interfaces';
import { UserCredential } from '../models';
import { UserAdapter } from './user.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserCredentialAdapter implements AdapterInterface {
  constructor(
    private userAdapter: UserAdapter
  ) {}

  adapt(request){
    const {
      user: credentialUser,
      firebase_uid,
      id,
      created_at,
      user_id,
      username,
      login_provider,
      updated_at,
  
    } = request;

    const user = this.userAdapter.adapt(credentialUser);

    const userCredential = {
      user,
      firebase_uid: firebase_uid,
      id,
      created_at,
      user_id,
      username,
      login_provider,
      updated_at,
    };
    
    return userCredential;
  }
}