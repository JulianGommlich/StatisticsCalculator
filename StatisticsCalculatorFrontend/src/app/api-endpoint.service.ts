import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Stichprobe } from './stichprobe';



const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/',
    'Content-Type': 'application/json', 
    'Cache-Control': 'no-cache',
    'Content-Language': 'de-DE', 
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  constructor(private http: HttpClient) { }

  // post a sample to the java backend
  startCalculation(sample: Stichprobe): Observable<Stichprobe>{
    return this.http.post<Stichprobe>("/a811b01f-c4cc-43af-ab08-55c0112f2707", sample, httpOptions);
  }

}
