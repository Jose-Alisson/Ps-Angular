
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";

@Injectable()
export class Interceptor implements HttpInterceptor {

    private router = inject(Router)

    constructor(@Inject(DOCUMENT) private document: Document) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.document.defaultView?.localStorage?.getItem('token')

        if (token != null) {
            req = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

            if (err.status === 401) {
                this.router.navigate(['a/'])
            }

            return throwError(() => err)
        }))
    }
}