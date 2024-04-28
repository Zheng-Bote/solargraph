import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphdataService {
  urlYear = '../assets/json/year.json';
  urlData = '../assets/json/';
  constructor(private http: HttpClient) {}

  getGraphs(): Observable<any> {
    return this.http.get(this.urlYear, {
      headers: { Accept: 'application/json' },
    });
  }

  getGraphData(year: string, month: string): Observable<any> {
    this.urlData += `${year}-${month}.json`;
    console.log('service: ', this.urlData);
    return this.http.get(this.urlData, {
      headers: { Accept: 'application/json' },
    });
  }

  setUrlData() {
    this.urlData = '../assets/json/';
  }
}
