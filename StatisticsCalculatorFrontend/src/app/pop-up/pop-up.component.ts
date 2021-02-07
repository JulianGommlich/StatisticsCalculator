import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiEndpointService } from '../api-endpoint.service';
import { SampleType, Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css', '../app.component.css']
})
export class PopUpComponent implements OnInit {

  fix: BehaviorSubject<boolean>;
  absolute: number[] = [];
  explicite: number[] = [];

  // Response vom Backend
  result: any;
  inputData = new Stichprobe(SampleType.explicit, [], {}, 0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { fix: boolean, absolute: number[], explicite?: number[], inputData: Stichprobe },
    private router: Router,
    public apiEndpoint: ApiEndpointService
  ) {
    this.fix = new BehaviorSubject(data.fix);
    this.absolute = data.absolute;
    if (data.explicite) {
      this.explicite = data.explicite;
    }
    this.inputData = data.inputData;
  }
  
  getResults() {
    // Create logic to get data
    this.router.navigate(['/results']);
    this.startCalculation();
  }

  ngOnInit(): void {
  }

  // send sample to API-Endpoint-Service
  startCalculation() {

    if (this.inputData.sampleType == "explizit") {
      this.inputData.setFreqDistribution();
    }
    else if (this.inputData.sampleType == "absolut") {
      this.inputData.setExpSample();
    }

    this.apiEndpoint.startCalculation(this.inputData).subscribe(sample => console.log(sample));
  }

}
