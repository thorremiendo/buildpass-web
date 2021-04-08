import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class ChatBotService {
  constructor(
    public apiService: ApiService,
    public httpClient: HttpClient,
  ) {}


 
}