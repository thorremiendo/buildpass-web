import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(url: string, params: HttpParams = null): Observable<any> {
    const completeUrl = this.generateUrl(url);

    return this.httpClient.get(completeUrl, {
      params,
    });
  }

  post(url, body): Observable<any> {
    const completeUrl = this.generateUrl(url);
    const formData = this.createFormData(body);
    console.log(completeUrl, formData)
;    return this.httpClient.post(completeUrl, formData);
  }
  delete(url: string, params: HttpParams = null): Observable<any> {
    const completeUrl = this.generateUrl(url);

    return this.httpClient.delete(completeUrl, {
      params,
    });
  }
  put() {}

  generateUrl(url): string {
    const apiUrl = environment.api_url;

    return `${apiUrl}${url}`;
  }

  createFormData(
    object: Object,
    form?: FormData,
    namespace?: string
  ): FormData {
    const formData = form || new FormData();

    for (let property in object) {
      if (
        !object.hasOwnProperty(property) &&
        object[property] == null &&
        object[property] === undefined
      ) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === 'object' &&
        !(object[property] instanceof File) &&
        !(object[property] instanceof Blob)
      ) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }
}
