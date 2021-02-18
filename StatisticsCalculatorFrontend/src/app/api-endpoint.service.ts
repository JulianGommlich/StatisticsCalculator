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
  sample: Stichprobe;

  constructor(private http: HttpClient) { }

  /**
   * Funktion zum Start des Backend-Requests
   * @param sample Stichprobe    Stichprobendaten, die verrechnet werden sollen
   */
  startCalculation(sample: Stichprobe): void {
    this.sample = sample;
    this.http.post<Ergebnisse>("/exchange", sample, httpOptions)
      .subscribe((data: Ergebnisse) => { this.subject.next(data); });
  }


  /**
   * Funktion, um die Ergebnisse aus der Berechnung der statistischen Kennzahlen abzurufen
   */
  getSubject(): ReplaySubject<Ergebnisse> {
    return this.subject;
  }


  /**
   * Funktion, um die Stichprobendaten abzurufen
   * Verwendung bei den Diagrammen
   */
  getSample(): Stichprobe {
    return this.sample;
  }

}
