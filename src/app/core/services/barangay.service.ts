import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class BarangayService {
  constructor(
    public apiService: ApiService,
    public httpClient: HttpClient,
  ) {}


  getBarangayInfo(){
    const url = "/barangays";
    return this.apiService.get(url).pipe(
      map(res => res.data)
    );

   
  }
}