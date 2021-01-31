import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view2-anzeige-stichproben',
  templateUrl: './view2-anzeige-stichproben.component.html',
  styleUrls: ['./view2-anzeige-stichproben.component.css']
})
export class View2AnzeigeStichprobenComponent implements OnInit {

  public expliziteStichprobe = [15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36,
    36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98];
  public haeufigkeitsverteilung = {'15': 3, '18': 4, '20': 5, '22': 7, '23': 10, '27': 10, '36': 7, '49': 5, '72': 4, '98': 3};
  sampleType = "explizit";
  z = 25;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBackToCalculator() {
    const numSequence = (this.sampleType == "explizit") ? this.expliziteStichprobe : this.haeufigkeitsverteilung;
    this.router.navigate(['/calculator', {
      'numSequence': numSequence,
      'sampleType': this.sampleType,
      'valueZInput': this.z
    }])
  }

}
