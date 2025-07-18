import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private readonly http: HttpClient) {}

  getImageByUrl(url: string) {
    return this.http
      .get(url, { observe: 'response', responseType: 'blob' })
      .pipe(
        tap(() => {}),
        switchMap((response) => {
          if (response.status === 302 && response.headers.has('Location')) {
            const redirectUrl = response.headers.get('Location')!;
            return this.http.get(redirectUrl, { responseType: 'blob' });
          }
          return of(response.body as Blob);
        })
      );
  }
}
