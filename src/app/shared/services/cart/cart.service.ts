import { EventEmitter, Injectable, inject } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public addEmiter: EventEmitter<any> = new EventEmitter()
  public removeEmmiter: EventEmitter<any> = new EventEmitter()

  private URL_API = `${SUNSHINE_API_URL}/amount`
  private http = inject(HttpClient)

  constructor() {}

  create(amount: any){
    return this.http.post<any>(`${this.URL_API}/create`, amount)
  }

  delete(id: string){
    return this.http.delete<any>(`${this.URL_API}/${id}/delete`)
  }

  increment(id: string){
    return this.http.patch<any>(`${this.URL_API}/${id}/increment`, null)
  }

  decrement(id: string){
    return this.http.patch<any>(`${this.URL_API}/${id}/decrement`, null)
  }

  byAccountId(id: string){
    return this.http.get<any[]>(`${this.URL_API}/byAccountId/${id}`)
  }
}
