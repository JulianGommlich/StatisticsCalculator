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
    this.inputFromBackend.subscribe((data : Ergebnisse) => {
      console.log(data);
      this.ergebnisseFormGroup = this.fb.group({
        sampleType: [data.sampleType],
        explSample: [data.expliziteStichprobe],
        freqDist: [data.freqDist],
        z: [data.z],
        modalValue: [data.modalwert],
        meanValue: [data.mittelwert],
        median: [data.median],
        quantile005: [data.quantile[0]],
        quantile01: [data.quantile[1]],
        quantile025: [data.quantile[2]],
        quantile075: [data.quantile[3]],
        quantile09: [data.quantile[4]],
        quantile095: [data.quantile[5]],
        variance: [data.varianz],
        standardDev: [data.standardabweichung],
        meanAbsoluteDeviation: [data.mittlereAbweichungZuZ],
        giniValue: [data.giniKoeffizient]
      });
      
      this.stichprobendaten = new Stichprobe(data.sampleType, data.expliziteStichprobe, data.freqDist, data.z);
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
