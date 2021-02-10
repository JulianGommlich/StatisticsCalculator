import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ReplaySubject } from 'rxjs';
import { Stichprobe } from './stichprobe';
import { Ergebnisse } from './ergebnisse';



const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/',
    'Content-Type': 'application/json', 
    'Cache-Control': 'no-cache',
    'Content-Language': 'de-DE', 
  })
};

@Injectable()
export class ApiEndpointService {

  subject = new ReplaySubject<Ergebnisse>();

  constructor(private http: HttpClient) { }

  // post a sample to the java backend
  startCalculation(sample: Stichprobe): void {
    this.http.post<Ergebnisse>("/exchange", sample, httpOptions)
      .subscribe((data: Ergebnisse) => { this.subject.next(data); });
  }

  getSubject(): ReplaySubject<Ergebnisse> {
    return this.subject;
  }

}
