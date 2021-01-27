import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  fix = false;
  absolute: number[] = [];
  explicite: number[] = [];
  // Response vom Backend
  result: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fix: boolean, absolute: number[], explicite?: number[] }, private router: Router, public apiEndpoint: ApiEndpointService) {
    this.fix = data.fix;
    this.absolute = data.absolute;
    if (data.explicite) {
      this.explicite = data.explicite;
    }
  }
  getResults() {
    // Create logic to get data
    this.router.navigate(['/results']);;
  }

  ngOnInit(): void {
  }

  // send sample to API-Endpoint-Service
  startCalculation(): void {
    // Für STICHPROBENOBJEKT müssen die Daten aus der View eingefügt werden (Issue 16) --> Auskommentiert um Fehler zu vermeiden. 
    //this.apiEndpoint.startCalculation(this.STICHPROBENOBJEKT).subscribe(sample => this.result = sample);
  }

}
