import { Component, OnInit } from '@angular/core';
import { Ergebnisse } from '../ergebnisse';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view2-anzeige-stichproben',
  templateUrl: './view2-anzeige-stichproben.component.html',
  styleUrls: ['./view2-anzeige-stichproben.component.css']
})
export class View2AnzeigeStichprobenComponent implements OnInit {

  ErgebnisseFormGroup: FormGroup;
  inputFromBackend: Ergebnisse; //Ergebnisse

  

  constructor(newInputFromBackend: Ergebnisse, private fb: FormBuilder) { 
    this.inputFromBackend = newInputFromBackend;
    this.ErgebnisseFormGroup = this.buildForm();
  }
  

  ngOnInit(): void {
    this.inputFromBackend.
  }

  buildForm(): FormGroup{
    return this.fb.group({
      sampleType: [this.inputFromBackend.sampleType],
      explSample: [this.inputFromBackend.explSample],
      freqDist: [this.inputFromBackend.freqDist],
      z: [this.inputFromBackend.z],
      modalValue: [this.inputFromBackend.modalValue],
      meanValue: [this.inputFromBackend.meanValue],
      median: [this.inputFromBackend.median],
      quantile: [this.inputFromBackend.quantile],
      variance: [this.inputFromBackend.variance],
      standardDev: [this.inputFromBackend.standardDev],
      meanAbsoluteDeviation: [this.inputFromBackend.meanAbsoluteDeviation],
      giniValue: [this.inputFromBackend.giniValue]
    })
  }

}
