
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: "root",
})

export class AdminService  {
  constructor(

    private api:ApiService,
  
  ) {}

  fetchAllApplication(){
    const url = `/application`;

    return this.api.get(url);
  }

  fetchApplicationbyId(id){
      const url = `/application/${id}`;

      return this.api.get(url);
    
  }

}