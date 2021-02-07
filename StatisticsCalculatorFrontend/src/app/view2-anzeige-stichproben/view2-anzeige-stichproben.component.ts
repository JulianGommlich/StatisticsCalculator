import { Component, OnInit } from '@angular/core';
import { Ergebnisse } from '../ergebnisse';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view2-anzeige-stichproben',
  templateUrl: './view2-anzeige-stichproben.component.html',
  styleUrls: ['./view2-anzeige-stichproben.component.css', '../app.component.css']
})
export class View2AnzeigeStichprobenComponent implements OnInit {

  ErgebnisseFormGroup: FormGroup;
  inputFromBackend: Ergebnisse; //Ergebnisse

  

  constructor(newInputFromBackend: Ergebnisse, private fb: FormBuilder, private router: Router) { 
    this.inputFromBackend = newInputFromBackend;
    this.ErgebnisseFormGroup = this.buildForm();
  }
  
  // Testdaten
  public expliziteStichprobe = [15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36,
    36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98];
  public haeufigkeitsverteilung = {'15': 3, '18': 4, '20': 5, '22': 7, '23': 10, '27': 10, '36': 7, '49': 5, '72': 4, '98': 3};
  sampleType = "explizit";
  z = 25;

  ngOnInit(): void { }

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

  /**
   * Navigation zur Eingabeseite; nimmt die eingegebene Stichproben sowie Stichprobenart und z mit
   */
  goBackToCalculator() {
    const numSequence = (this.sampleType == "explizit") ? this.expliziteStichprobe : `${Object.keys(this.haeufigkeitsverteilung)}|${Object.values(this.haeufigkeitsverteilung)}`;
    
    this.router.navigate(['/calculator', {
      'numSequence': numSequence,
      'sampleType': this.sampleType,
      'valueZInput': this.z
    }]);
  }

}
