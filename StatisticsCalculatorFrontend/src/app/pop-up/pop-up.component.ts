import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { SampleType, Stichprobe } from '../stichprobe';
import { View1Component } from '../view1/view1.component'; 

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fix: boolean, absolute: number[], explicite?: number[] }, 
    private router: Router, 
    public apiEndpoint: ApiEndpointService, 
    private view1: View1Component
  ) {
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
    let newSampleType: SampleType = this.view1.inputForm.get('sampleType')?.value;
    let newExplSample: number[] = this.view1.inputForm.get('numSequence')?.value;
    let newFreqDist: { [key: string]: number } = this.view1.inputForm.get('meanDeviation')?.value;
    let newZ: number = this.view1.inputForm.get('valueZInput')?.value;
    
    let inputData = new Stichprobe(newSampleType, newExplSample, newFreqDist, newZ);
    
    if (inputData.sampleType == "explicit") {
      inputData.setFreqDistribution();
    }
    else if (inputData.sampleType == "absolute") {
      inputData.setExpSample();
    }

    this.apiEndpoint.startCalculation(inputData).subscribe(sample => this.result = sample);
  }

}
