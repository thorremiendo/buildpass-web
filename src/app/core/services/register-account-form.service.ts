import { Injectable, APP_ID } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { RegisterAccountModel } from "../models/user.model";
//import { ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterAccountFormService {
  private registerAccountSubject: BehaviorSubject<RegisterAccountModel> = new BehaviorSubject<RegisterAccountModel>({} as RegisterAccountModel);
  public currentPageSubject = new BehaviorSubject<number>(1)

  cast = this.registerAccountSubject.asObservable(); 

  public registerAccountInfo = this.registerAccountSubject.pipe(
    distinctUntilChanged()
  );

  constructor(
   
  ) {
    this.registerAccountSubject.subscribe((res) => {
       console.log("This is the result: ", res);
    });
  }

  setCurrentPage(newCurrentPage){
    this.currentPageSubject.next(newCurrentPage)
  }

  setRegisterAccountInfo(value: RegisterAccountModel) {
    const currentValue = this.registerAccountSubject.value;
    this.registerAccountSubject.next({
      ...currentValue,
      ...value,
    });
  }

  // submitRegisterAccountInfo(body): Observable<RegisterAccountModel> {
  //   const url = "/user-info";
  //   return this.api.post(url, body);
  // }
}
