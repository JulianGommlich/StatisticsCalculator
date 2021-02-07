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

  absoluteHaeufigkeitsverteilung: string;

  // Response vom Backend
  inputData = new Stichprobe(SampleType.explicit, [], {}, 0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { inputData: Stichprobe },
    private router: Router,
    public apiEndpoint: ApiEndpointService
  ) {
    this.inputData = data.inputData;

    this.absoluteHaeufigkeitsverteilung = "";
    const keys = Object.keys(this.inputData.haeufigkeitsverteilung);
    for (let i = 0; i < keys.length; i++) {
      this.absoluteHaeufigkeitsverteilung += `(${keys[i]}; ${this.inputData.haeufigkeitsverteilung[keys[i]]})`;
      if (i < keys.length-1) {
        this.absoluteHaeufigkeitsverteilung += ';';
      }
    }
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
    this.apiEndpoint.startCalculation(this.inputData);
  }

}
