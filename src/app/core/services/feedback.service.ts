import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
    constructor(
        private api: ApiService
    ) {}

    fetchFeedbacks() {
        const url = `/feedback`;
        return this.api.get(url);
    }

    fetchModules(){
        const url = `/module`;
        return this.api.get(url);

    }

    fetchApplicationNumber(id){
        const url = `/user/${id}/application-numbers`;
        return this.api.get(url);

    }
    
    submitFeedback(data) {
        const url = `/feedback`;
        return this.api.post(url, data);
    }

    submitReportIssue(data){
        const url = `/issue`;
        return this.api.post(url, data);


    }


}