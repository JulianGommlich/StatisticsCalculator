import { Component, OnInit } from '@angular/core';
import { Ergebnisse } from '../ergebnisse';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiEndpointService } from '../api-endpoint.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view2-anzeige-stichproben',
  templateUrl: './view2-anzeige-stichproben.component.html',
  styleUrls: ['./view2-anzeige-stichproben.component.css', '../app.component.css']
})
export class View2AnzeigeStichprobenComponent implements OnInit {

  ergebnisseFormGroup: FormGroup;
  inputFromBackend = new Subject<Ergebnisse>(); //Ergebnisse

  

  constructor(private apiEndpoint: ApiEndpointService, private fb: FormBuilder, private router: Router) { 
    this.buildForm();
  }
  
  // Testdaten
  public expliziteStichprobe = [15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36,
    36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98];
  public haeufigkeitsverteilung = {'15': 3, '18': 4, '20': 5, '22': 7, '23': 10, '27': 10, '36': 7, '49': 5, '72': 4, '98': 3};
  sampleType = "explizit";
  z = 25;

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
    });
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
