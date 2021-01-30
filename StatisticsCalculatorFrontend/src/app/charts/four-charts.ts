import { Component, OnInit } from '@angular/core';

const explSample = [15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23,
  23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36,
  36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98];
const freqDist = {'15': 3, '18': 4, '20': 5, '22': 7, '23': 10, '27': 10, '36': 7, '49': 5, '72': 4, '98': 3};

@Component({
  selector: 'app-four-charts',
  templateUrl: './four-charts.html',
  styleUrls: ['./four-charts.css']
})
export class FourCharts implements OnInit {

  // Größe der Diagramme
  view: [number, number] = [600, 400];

  // Farbschemata der Diagramme
  bcColorScheme = {
    domain: ['#0404B4']
  };
  pcColorScheme = {
    domain: ['#0404B4', '#3494B4', '#84B4A4', '#B4C472', '#D1A442', '#C38212', '#BB3B0A', '#A9245A', '#A21790', '#8024A2']
  };
  lceColorScheme = {
    domain: ['#000000']
  };
  lclColorScheme = {
    domain: ['#A10A28', '#0404B4']
  };

  // Werte für die Diagramme
  barAndPieChartValues: any[] = [];
  empiricalDistributionChartValues: any[] = [];
  lorenzChartValues: any[] = [];

  // barChart (bc)
  bcGradient = true;
  bcShowXAxis = true;
  bcShowYAxis = true;
  bcShowLegend = false;
  bcShowXAxisLabel = true;
  bcShowYAxisLabel = true;
  bcXAxisLabel = 'Stichprobenwert';
  bcYAxisLabel = 'Absolute Häufigkeit';

  // pieChart (pc)
  pcGradient = true;
  pcShowLegend = false;
  pcLegendPosition = 'right';
  pcShowLabels = true;
  pcIsDoughnut = false;

  // lineChart (lc)
  lcShowXAxisLabel = true;
  lcShowYAxisLabel = true;
  lcShowXAxis = true;
  lcShowYAxis = true;
  lcTimeline = true;

  // lineChart - empirical distribution function (lce) 
  lceLegend = false; 
  lceXAxisLabel = 'Stichprobenwert';
  lceYAxisLabel = 'Relative Häufigkeit';

  // lineChart - lorenz curve (lcl)
  lclLegend = false;
  lclXAxisLabel = 'Stichprobenwert';
  lclYAxisLabel = 'Gewicht';
  

  constructor() {
    const freqDistKeys = Object.keys(freqDist);
    const freqDistValues = Object.values(freqDist);

    this.setBarAndPieChartValues(freqDistKeys, freqDistValues);
    this.setEmpiricalDistributionChartValues(freqDistKeys, freqDistValues);
    this.setLorenzChartValues(freqDistKeys, freqDistValues);
  }

  setBarAndPieChartValues(freqDistKeys: string[], freqDistValues: number[]) {
    // Durch sämtliche Wertepaare der absoluten Häufigkeitsverteilung iterieren und dann Key und Value
    // als Parameter ('name' und 'value') in das Diagramm einsetzen
    for (let index = 0; index < Object.keys(freqDist).length; index++) {
      this.barAndPieChartValues.push({
        'name': freqDistKeys[index],
        'value': freqDistValues[index]
      });
    }
  }

  setEmpiricalDistributionChartValues(freqDistKeys: string[], freqDistValues: number[]) {
    // Am Anfang wird "eine Linie" gezogen, die den Wert 0 hat.
    this.empiricalDistributionChartValues.push({
      'name': '0',
      'series': [
        {
          'name': Number(freqDistKeys[0]) - 10,    // x-Koordinate, die um 10 kleiner ist als der kleineste Stichprobenwert
          'value': 0
        },
        {
          'name': freqDistKeys[0],
          'value': 0
        }
      ]
    });

    // sumOfRelativeFrequencies beinhaltet die Summe der relativen Häufigkeiten der Stichprobenwerte, 
    // die kleiner oder gleich dem Wert in der aktuellen Iteration sind
    let sumOfRelativeFrequencies = 0;

    // Durch alle Wertepaare der absoluten Häufigkeitsverteilung (bis auf das letzte) iterieren, um
    // die "Linien" der empirischen Verteilungsfunktion zu "zeichnen"
    for (let index = 0; index < Object.keys(freqDist).length-1; index++) {

      // Eine relative Häufigkeit ergibt sich aus der Division der absoluten Häufigkeit durch die Gesamtanzahl an Stichprobenwerte 
      sumOfRelativeFrequencies += freqDistValues[index]/explSample.length;
      this.empiricalDistributionChartValues.push({
        'name': index + 1,
        'series': [
          {
            'name': freqDistKeys[index],
            'value': Math.round(sumOfRelativeFrequencies * 1000)/1000
          },
          {
            'name': freqDistKeys[index+1],
            'value': Math.round(sumOfRelativeFrequencies * 1000)/1000
          }
        ]
      });
    }

    // Am Ende wird "eine Linie" gezogen, die den Wert 1 hat.
    this.empiricalDistributionChartValues.push({
      'name': Object.keys(freqDist).length + 1,
      'series': [
        {
          'name': freqDistKeys[freqDistKeys.length-1],
          'value': 1
        },
        {
          'name': Number(freqDistKeys[freqDistKeys.length-1]) + 10,    // x-Koordinate, die um 10 größer ist als der größte Stichprobenwert
          'value': 1
        }
      ]
    });
  }

  setLorenzChartValues(freqDistKeys: string[], freqDistValues: number[]) {
    // In der Variable valueSeries wird der Verlauf der Lorenzkurve beschrieben. Sie wird hier initial erstellt.
    // Die Lorenzkurze beginnt im Punkt (0|0)
    let valueSeries = [{
      'name': '0',
      'value': 0
    }];

    // sumOfAbsoluteFrequencies beinhaltet die Summe der absoluten Häufigkeiten der Stichprobenwerte, 
    // die kleiner oder gleich dem Wert in der aktuellen Iteration sind
    let sumOfAbsoluteFrequency = 0;

    // Durch alle Wertepaare der absoluten Häufigkeitsverteilung iterieren, um
    // den Verlauf der Lorenzkurve zu "zeichnen"
    for (let index = 0; index < Object.keys(freqDist).length; index++) {

      // Eine absolute Häufigkeit stellt dar, wie oft ein bestimmter Stichprobenwert in einer Stichprobe vorkommt
      // Hier wird diese mit dem Stichprobenwert multipliziert, um den kumulierten Anzeil an der Merkmalssumme zu berechnen
      sumOfAbsoluteFrequency += freqDistValues[index] * Number(freqDistKeys[index]);
      valueSeries.push({
        'name': ((index + 1)/Object.keys(freqDist).length).toString(),
        'value': Math.round(sumOfAbsoluteFrequency/explSample.reduce((a, b) => a + b, 0) * 1000)/1000
      });
    }

    // Hier wird die Variable valueSeries in das Diagramm eingesetzt.
    // Danach wird die Referenzgerade "gezeichnet"
    this.lorenzChartValues.push({
        'name': 'Lorenzkurve',
        'series': valueSeries
      },
      {
        'name': 'Referenz',
        'series': [
          {
            'name': '0',
            'value': 0
          },
          {
            'name': '1',
            'value': 1
          }
        ]
      }
    );
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {
  }

}
