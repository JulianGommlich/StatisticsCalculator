import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { SampleParser } from '../sampleParser';
import { Stichprobe } from '../stichprobe';
import { Validation } from '../validation';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css', '../app.component.css']
})
export class PopUpComponent implements OnInit {

  expliziteStichprobe: string;
  absoluteHaeufigkeitsverteilung: string;
  error = false;

  // Response vom Backend
  inputData: Stichprobe;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { inputData: Stichprobe },
    public apiEndpoint: ApiEndpointService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.inputData = data.inputData;

    this.expliziteStichprobe = this.inputData.expliziteStichprobe.join(';');
    this.absoluteHaeufigkeitsverteilung = '';
    const keys = Object.keys(this.inputData.haeufigkeitsverteilung);
    for (let index = 0; index < keys.length; index++) {
      this.absoluteHaeufigkeitsverteilung += `(${keys[index]};${this.inputData.haeufigkeitsverteilung[keys[index]]})`;
      if (index < keys.length - 1) {
        this.absoluteHaeufigkeitsverteilung += '; ';
      }
    }
  }

  ngOnInit(): void { }

  getResults(): void {
    const validation = new Validation();
    const sampleInput = this.inputData.sampleType === 'explizit'
      ? (<HTMLInputElement>document.getElementById('explicitSample')).value
      : (<HTMLInputElement>document.getElementById('absoluteFrequency')).value;

    if (validation.validateSequence(this.inputData.sampleType, sampleInput)) {
      const calculationData = new Stichprobe(this.inputData.sampleType, [], {}, this.inputData.z);

      const sampleParser = new SampleParser();
      if (this.inputData.sampleType === 'explizit') {
        calculationData.expliziteStichprobe = sampleParser.parseExplSample(sampleInput);
        calculationData.setFreqDistribution();
      }
      else if (this.inputData.sampleType === 'absolut') {
        calculationData.haeufigkeitsverteilung = sampleParser.parseFreqDist(sampleInput);
        calculationData.setExpSample();
      }

      // Create logic to get data
      this.router.navigate(['/results']);
      //send sample data to backend
      this.apiEndpoint.startCalculation(calculationData);
    } else {
      this.dialog.open( PopUpInvalidComponent, { data: { case: 'pop-up' } } );
    }
  }
}
