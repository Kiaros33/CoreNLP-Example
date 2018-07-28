import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ReqHandlerService {
  constructor(private http: HttpClient) {}

  analyzeText(data) {
    let url = 'http://localhost:3001/api/' + data.mode;
    return this.http.post(url, data, httpOptions).pipe(tap(text => console.log(`analyzed`)));
  }
}
