import { Injectable, inject } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';
import { HttpClient } from '@angular/common/http';

  @Injectable({
  providedIn: 'root',
})
export class ProductService {

  private API_URL = `${SUNSHINE_API_URL}/product`;

  private http = inject(HttpClient)

  constructor() {}

  getSize(establishmentId: string){
    return this.http.get<any>(`${this.API_URL}/size/establishment/${establishmentId}`)
  }

  getByOffSet(establishmentId: string, offset: number){
    return this.http.get<any[]>(`${this.API_URL}/establishment/${establishmentId}/${offset}`)
  }
}
