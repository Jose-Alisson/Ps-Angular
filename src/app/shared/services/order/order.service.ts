import { Injectable, inject } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = `${SUNSHINE_API_URL}/order`
  private http = inject(HttpClient)

  constructor() { }

  create(order: any){
    return this.http.post<any>(`${this.URL}/create`, order)
  }

  getByLogged(){
    return this.http.get<any[]>(`${this.URL}/byLogged`)
  }
}
