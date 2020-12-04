// import { Injectable } from "@angular/core";
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { JwtService } from '../services';

// @Injectable()

// export class HttpInterceptorService implements HttpInterceptor {
//   constructor(private jwtService: JwtService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let newHeaders = req.headers;
//     newHeaders = newHeaders.append('Accept', 'application/json');
//     const token = this.jwtService.getToken();

//     if (token) {
//       newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
//     }

//     const authReq = req.clone({headers: newHeaders});
//     return next.handle(authReq);
//   }
// }