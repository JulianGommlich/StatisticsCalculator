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
  stichprobendaten: Stichprobe;

  constructor(private apiEndpoint: ApiEndpointService, private fb: FormBuilder, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.apiEndpoint.getSubject().subscribe((data: Ergebnisse) => this.inputFromBackend.next(data));
  }

  buildForm(): void {
    this.inputFromBackend.subscribe((data: Ergebnisse) => {
      this.ergebnisseFormGroup = this.fb.group({
        sampleType: [data.sampleType],
        explSample: [data.expliziteStichprobe],
        freqDist: [data.haeufigkeitsverteilung],
        z: [data.z],
        modalValue: [data.modalwert.toString().replace(',', ', ')],
        meanValue: [data.mittelwert.toLocaleString("de-DE")],
        median: [data.median.toLocaleString("de-DE")],
        quantile005: [data.quantile[0].toLocaleString("de-DE")],
        quantile01: [data.quantile[1].toLocaleString("de-DE")],
        quantile025: [data.quantile[2].toLocaleString("de-DE")],
        quantile075: [data.quantile[3].toLocaleString("de-DE")],
        quantile09: [data.quantile[4].toLocaleString("de-DE")],
        quantile095: [data.quantile[5].toLocaleString("de-DE")],
        variance: [data.varianz.toLocaleString("de-DE")],
        standardDev: [data.standardabweichung.toLocaleString("de-DE")],
        meanAbsoluteDeviation: [data.mittlereAbweichungZuZ.toLocaleString("de-DE")],
        giniValue: [data.giniKoeffizient.toLocaleString("de-DE")]
      });

      this.stichprobendaten = new Stichprobe(data.sampleType, data.expliziteStichprobe, data.haeufigkeitsverteilung, data.z);
    });
  }

  /**
   * Navigation zur Eingabeseite; nimmt die eingegebene Stichproben sowie Stichprobenart und z mit
   */
  goBackToCalculator(): void {
    const numSequence = this.stichprobendaten.sampleType === 'explizit'
      ? this.stichprobendaten.expliziteStichprobe
      : `${Object.keys(this.stichprobendaten.haeufigkeitsverteilung)}|${Object.values(this.stichprobendaten.haeufigkeitsverteilung)}`;

    this.router.navigate(['/calculator', {
      'numSequence': numSequence,
      'sampleType': this.stichprobendaten.sampleType,
      'valueZInput': this.stichprobendaten.z
    }]);
  }
}
