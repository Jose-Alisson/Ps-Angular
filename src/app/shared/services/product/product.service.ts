import { ImgService } from './../img/img.service';
import { Injectable, inject } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = `${SUNSHINE_API_URL}/product`;

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer)
  private imgService = inject(ImgService)

  constructor() {}

  create(product: any){
    return this.http.post<any>(`${this.API_URL}/create`, product)
  }

  update(id: number, product: any){
    return this.http.put<any>(`${this.API_URL}/${id}/update`, product)
  }

  getById(id: string) {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      map((product: any) => {
          return { ...product, photoObj: {} };
      }), tap(product => {
          this.imgService.downloadImagem(product.photoUrl).subscribe(blob => {
            product.photoObj = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
          })
      })
    );;
  }

  search(s: string) {
    let params = new HttpParams().append('s', s);
    return this.http
      .get<any[]>(`${this.API_URL}/search`, { params: params })
      .pipe(
        map((products: any[]) => {
          return products.map((item) => {
            return { ...item, photoObj: {} };
          });
        }), tap(products => {
          products.forEach(product => {
            this.imgService.downloadImagem(product.photoUrl).subscribe(blob => {
              product.photoObj = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
            })
          })
        })
      );
  }

  getSize() {
    return this.http.get<any>(
      `${this.API_URL}/size`
    );
  }

  getByOffSet(establishmentId: string, offset: number) {
    return this.http.get<any[]>(
      `${this.API_URL}/offset/${offset}`
    ).pipe(
      map((products: any[]) => {
        return products.map((item) => {
          return { ...item, photoObj: {} };
        });
      }), tap(products => {
        products.forEach(product => {
          this.imgService.downloadImagem(product.photoUrl).subscribe(blob => {
            product.photoObj = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
          })
        })
      })
    );;
  }
}
