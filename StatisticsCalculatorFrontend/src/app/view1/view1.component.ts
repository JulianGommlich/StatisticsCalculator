import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { SampleType, Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {

  // Statisches Objekt für Testzwecke
  testSample = new Stichprobe(SampleType.absolute, [{0: 1}, {1: 2}], 3);
  result: any;

  constructor(public apiEndpoint: ApiEndpointService) { }

  ngOnInit(): void {
  }

  // send sample to API-Endpoint-Service
  addSample(): void {
    // statisches Objekt als Parameter zu Testzwecken
    console.log("Button works");
    this.apiEndpoint.addSample1(this.testSample).subscribe(sample => this.result = sample);
  }
}