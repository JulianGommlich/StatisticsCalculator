import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { SampleType, Stichprobe } from '../stichprobe';

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
  inputData: Stichprobe = new Stichprobe(SampleType.absolute, [], {}, 0);



  constructor(@Inject(MAT_DIALOG_DATA) public data: { fix: boolean, absolute: number[], explicite?: number[], inputData: Stichprobe }, 
    private router: Router, 
    public apiEndpoint: ApiEndpointService
  ) {
    this.fix = data.fix;
    this.absolute = data.absolute;
    if (data.explicite) {
      this.explicite = data.explicite;
    }
    this.inputData = data.inputData;
  }
  getResults() {
    // Create logic to get data
    this.router.navigate(['/results']);;
  }

  ngOnInit(): void {
  }

  // send sample to API-Endpoint-Service
  startCalculation(): void {

    // explizite Stichprobe wird als String übergeben aufgrund des input-Feldes. Dennoch muss das Input Feld hier zu einem gecastet werden, da das Objekt sonst
    // einen Fehler wirft, da für die explizite Stichprobe ein number-Array vorgegeben ist. 
    this.getNumArray(String(this.inputData.explSample));

    if (this.inputData.sampleType == "explicit") {
      this.inputData.setFreqDistribution();
    }
    else if (this.inputData.sampleType == "absolute") {
      this.inputData.setExpSample();
    }

    this.apiEndpoint.startCalculation(this.inputData).subscribe(sample => this.result = sample);
  }

  // Takes a String as Input and converts it to a number-Array
  getNumArray(inputStr: String): void {
    let numArr: number[] = [];
     
    for(let key in inputStr.split(";")) {
      numArr.push(Number(inputStr.split(";")[key]));
    }

    this.inputData.explSample = numArr;

    console.log(this.inputData.explSample)
  }

}
