import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css', '../app.component.css']
})
export class PopUpComponent implements OnInit {

  absoluteHaeufigkeitsverteilung: string;

  // Response vom Backend
  inputData: Stichprobe;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { inputData: Stichprobe },
    public apiEndpoint: ApiEndpointService,
    private router: Router    
  ) {
    this.inputData = data.inputData;

    this.absoluteHaeufigkeitsverteilung = '';
    const keys = Object.keys(this.inputData.haeufigkeitsverteilung);
    for (let index = 0; index < keys.length; index++) {
      this.absoluteHaeufigkeitsverteilung += `(${keys[index]}; ${this.inputData.haeufigkeitsverteilung[keys[index]]})`;
      if (index < keys.length-1) {
        this.absoluteHaeufigkeitsverteilung += '; ';
      }
    }
  }

  ngOnInit(): void {}
  
  getResults(): void {
    // Create logic to get data
    this.router.navigate(['/results']);
    //send sample data to backend
    this.apiEndpoint.startCalculation(this.inputData);
  }  
}
