import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SUNSHINE_API_URL } from '../API_URL';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  private http = inject(HttpClient)
  private URL_API = `${SUNSHINE_API_URL}/file`

  uploadImage(file: File | null) {
    if (file) {
      let form = new FormData();
      form.append('file', file, file.name);

      const headers = new HttpHeaders({
        enctype: 'multipart/form-data',
        Accept: 'application/json',
      });

      const options = { headers: headers };

      return this.http.post<any>(
        this.URL_API + '/upload',
        form,
        options
      ).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error));
      }))
    }

    throw new Error('Arquivo Nulo');
  }

  downloadImagem(path: string): Observable<Blob> {
    if (path !== '' && path !== 'null' && path !==  null) {
      const params = new HttpParams().set('filePath', path);
      return this.http.get(this.URL_API + '/download', {
        params: params,
        responseType: 'blob',
      });
    }

    console.error('path vazio');
    return of();
  }
}
