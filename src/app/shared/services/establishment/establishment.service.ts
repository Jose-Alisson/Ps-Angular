import { Injectable } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  private API_URL = `${SUNSHINE_API_URL}/establishment`

  constructor() { }
}
