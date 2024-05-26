import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { SUNSHINE_API_URL } from '../API_URL';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)

  private URL = `${SUNSHINE_API_URL}/account`

  constructor(@Inject(DOCUMENT) private document: Document) { }

  login(email: string, password: string) {
    let params = new HttpParams().append("email", email).append("password", password)
    return this.http.post<any>(`${this.URL}/login`, null, { params: params }).pipe(tap((data) => {
      this.document.defaultView?.localStorage?.setItem("token", data.access)
    }));
  }

  create(account: any) {
    return this.http.post<any>(`${this.URL}/create`, account)
  }

  sendCodeNumber(value: any) {
    return of()
  }

  isExist(email: string) {
    let params = new HttpParams().append("email", email)
    return this.http.get<any>(`${this.URL}/isExist`, { params: params })
  }
}
