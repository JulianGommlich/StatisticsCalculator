import { Component, OnInit } from '@angular/core';
import { Ergebnisse } from '../ergebnisse';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { Subject } from 'rxjs';
import { Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-view2-anzeige-stichproben',
  templateUrl: './view2-anzeige-stichproben.component.html',
  styleUrls: ['./view2-anzeige-stichproben.component.css', '../app.component.css']
})
export class View2AnzeigeStichprobenComponent implements OnInit {

  ergebnisseFormGroup: FormGroup;
  inputFromBackend = new Subject<Ergebnisse>(); //Ergebnisse
  public stichprobendaten: Stichprobe;

  constructor(private apiEndpoint: ApiEndpointService, private fb: FormBuilder, private router: Router) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.apiEndpoint.getSubject().subscribe((data: Ergebnisse) => this.inputFromBackend.next(data));
   }

  buildForm(): void{
    this.inputFromBackend.subscribe(data => {
      this.ergebnisseFormGroup = this.fb.group({
        sampleType: [data.sampleType],
        explSample: [data.explSample],
        freqDist: [data.freqDist],
        z: [data.z],
        modalValue: [data.modalValue],
        meanValue: [data.meanValue],
        median: [data.median],
        quantile: [data.quantile],
        variance: [data.variance],
        standardDev: [data.standardDev],
        meanAbsoluteDeviation: [data.meanAbsoluteDeviation],
        giniValue: [data.giniValue]
      });

      this.stichprobendaten.expliziteStichprobe = data.explSample;
      this.stichprobendaten.haeufigkeitsverteilung = data.freqDist;
      this.stichprobendaten.sampleType = data.sampleType;
      this.stichprobendaten.z = data.z;
    });
  }

  /**
   * Navigation zur Eingabeseite; nimmt die eingegebene Stichproben sowie Stichprobenart und z mit
   */
  goBackToCalculator(): void {
    const numSequence = (this.stichprobendaten.sampleType == "explizit") 
      ? this.stichprobendaten.expliziteStichprobe 
      : `${Object.keys(this.stichprobendaten.haeufigkeitsverteilung)}|${Object.values(this.stichprobendaten.haeufigkeitsverteilung)}`;
    
    this.router.navigate(['/calculator', {
      'numSequence': numSequence,
      'sampleType': this.stichprobendaten.sampleType,
      'valueZInput': this.stichprobendaten.z
    }]);
  }

}
