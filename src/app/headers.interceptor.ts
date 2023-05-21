import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: any;
  omitCalls = ['auth'];
  skipInterceptor = false;
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });
    console.log('this.skipInterceptor : ', this.skipInterceptor );
  

      this.token = localStorage.getItem('token')||null;
 
    if (this.token || this.skipInterceptor) {
      const tokenizedReq = req.clone({ headers: req.headers.set('token', this.token) });
      console.log('tokenizedReq: ', tokenizedReq);
      return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event instanceof HttpResponse: ', event instanceof HttpResponse);
          console.log('event: ', event);
          if (event.status === 401) {
            
            this.router.navigateByUrl('');
            Swal.fire({
              icon: 'error',
              title: 'please login',
             
            })
            
          }
        }
        return event;
      }));
    } 
    
    
    
    else {
     console.log();
      this.router.navigateByUrl('');
     
    }
    return next.handle(req);
  }
}