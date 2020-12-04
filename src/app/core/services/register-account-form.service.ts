import { Injectable, APP_ID } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { RegisterAccountModel } from "../models/user.model";
import { ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterAccountFormService {
  private registerAccountSubject: BehaviorSubject<RegisterAccountModel> = new BehaviorSubject<RegisterAccountModel>({} as RegisterAccountModel);
 

  cast = this.registerAccountSubject.asObservable(); 

  public registerAccountInfo = this.registerAccountSubject.pipe(
    distinctUntilChanged()
  );

  constructor(
   public _api: ApiService,
   
  ) {
    this.registerAccountSubject.subscribe((res) => {
       console.log("This is the result: ", res);
    });
  }

  setRegisterAccountInfo(value: RegisterAccountModel) {
    const currentValue = this.registerAccountSubject.value;
    this.registerAccountSubject.next({
      ...currentValue,
      ...value,
    });
  }

  submitRegisterAccountInfo(body): Observable<RegisterAccountModel> {
    const url = "/user";
    console.log(body);
    return this._api.post(url, body);
  }
}
