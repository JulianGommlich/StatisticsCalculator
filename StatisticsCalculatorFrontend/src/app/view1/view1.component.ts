import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { SampleType, Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {

  // Response vom Backend
  result: any;

  constructor(public apiEndpoint: ApiEndpointService) { }

  ngOnInit(): void {
  }

  // send sample to API-Endpoint-Service
  startCalculation(): void {
    // Für STICHPROBENOBJEKT müssen die Daten aus der View eingefügt werden (Issue 16) 
    this.apiEndpoint.startCalculation(this.STICHPROBENOBJEKT).subscribe(sample => this.result = sample);
  }
}