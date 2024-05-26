import { Injectable, inject } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private URL_API = `${SUNSHINE_API_URL}/addresses`

  private http = inject(HttpClient)

  constructor() { }

  create(address: any){
    return this.http.post<any>(`${this.URL_API}/create`, address)
  }

  createBylogged(address: any){
    return this.http.post<any[]>(`${this.URL_API}/create/byLogged`, address)
  }

  update(id: string, address: any){
    return this.http.put<any>(`${this.URL_API}/${id}/update`, address)
  }

  delete(id:string){
    return this.http.delete<any>(`${this.URL_API}/${id}/delete`)
  }

  getByLogged(){
    return this.http.get<any[]>(`${this.URL_API}/byLogged`)
  }

  isDelivery(address: any){
    let params = new HttpParams();

    Object.keys(address).forEach(key => {
      params = params.append(key, address[key])
    })
    
    return this.http.get<any>(`${this.URL_API}/isDelivery`, {params: params})
  }
}
