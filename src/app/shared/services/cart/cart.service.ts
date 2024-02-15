import { Injectable } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private URL_API = `${SUNSHINE_API_URL}`

  constructor() { }


}
