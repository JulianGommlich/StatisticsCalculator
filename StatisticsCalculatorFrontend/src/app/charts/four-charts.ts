import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { Stichprobe } from '../stichprobe';

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

  stichprobendaten: Stichprobe;
  expliziteStichprobe: number[];
  haeufigkeitsverteilung: { [key: string]: number };

  constructor(private apiEndpoint: ApiEndpointService) {}

  ngOnInit() {
    this.stichprobendaten = this.apiEndpoint.getSample();

    // Stichproben sortieren, damit die Werte in der richtigen Reihenfolge im Diagramm angezeigt werden
    this.expliziteStichprobe = this.stichprobendaten.expliziteStichprobe.sort();
    this.haeufigkeitsverteilung = this.sortObject(this.stichprobendaten.haeufigkeitsverteilung);

    const freqDistKeys = Object.keys(this.haeufigkeitsverteilung);
    const freqDistValues = Object.values(this.haeufigkeitsverteilung);

    this.setBarAndPieChartValues(freqDistKeys, freqDistValues);
    this.setEmpiricalDistributionChartValues(freqDistKeys, freqDistValues);
    this.setLorenzChartValues(freqDistKeys, freqDistValues)
  }

  /**
   * Methode zum Sortieren eines Objekts nach key
   * @param object { [key: string]: number }    Objekt mit absoluter Häufigkeitsverteilung
   * @returns { [key: string]: number }
   */
  sortObject(object: { [key: string]: number }): { [key: string]: number } {
    let returnObject: { [key: string]: number } = {};
    const objectKeys = Object.keys(object);
    let objectKeysNumeric: number[] = [];

    objectKeys.forEach((key: string) => { objectKeysNumeric.push(Number(key));} );
    objectKeysNumeric.sort((first, second) => first - second);

    objectKeysNumeric.forEach((key: number) => {
      Object.assign(returnObject, { [key]: object[key] });
    });

    return returnObject;
  }

  /**
   * Methode zum Setzen der Werte für das Säulen- und das Kreisdiagramm
   * @param freqDistKeys   number[]   Liste aller Stichprobenwerte
   * @param freqDistValues number[]   Liste der absoluten Häufigkeiten oben genannter Stichprobenwerte
   */
  setBarAndPieChartValues(freqDistKeys: string[], freqDistValues: number[]): void {
    // Durch sämtliche Wertepaare der absoluten Häufigkeitsverteilung iterieren und dann Key und Value
    // als Parameter ('name' und 'value') in das Diagramm einsetzen
    for (let index = 0; index < freqDistKeys.length; index++) {
      this.barAndPieChartValues.push({
        'name': freqDistKeys[index],
        'value': freqDistValues[index]
      });
    }
  }

  /**
   * Methode zum Berechnen und Setzen der Werte für die empirische Verteilungsfunktion
   * @param freqDistKeys   number[]   Liste aller Stichprobenwerte
   * @param freqDistValues number[]   Liste der absoluten Häufigkeiten oben genannter Stichprobenwerte
   */
  setEmpiricalDistributionChartValues(freqDistKeys: string[], freqDistValues: number[]): void {
    // Am Anfang wird "eine Linie" gezogen, die den Wert 0 hat.
    this.empiricalDistributionChartValues.push({
      'name': '0',
      'series': [
        {
          'name': (Number(freqDistKeys[0]) - 10).toString(),    // x-Koordinate, die um 10 kleiner ist als der kleineste Stichprobenwert
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

    const numberOfKeys = freqDistKeys.length;    // Wird mehrfach verwendet

    // Durch alle Wertepaare der absoluten Häufigkeitsverteilung (bis auf das letzte) iterieren, um
    // die "Linien" der empirischen Verteilungsfunktion zu "zeichnen"
    for (let index = 0; index < numberOfKeys - 1; index++) {

      // Eine relative Häufigkeit ergibt sich aus der Division der absoluten Häufigkeit durch die Gesamtanzahl an Stichprobenwerte 
      sumOfRelativeFrequencies += freqDistValues[index]/this.expliziteStichprobe.length;
      this.empiricalDistributionChartValues.push({
        'name': (index + 1).toString(),
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
      'name': (numberOfKeys).toString(),
      'series': [
        {
          'name': freqDistKeys[numberOfKeys - 1],
          'value': 1
        },
        {
          'name': (Number(freqDistKeys[numberOfKeys - 1]) + 10).toString(),    // x-Koordinate, die um 10 größer ist als der größte Stichprobenwert
          'value': 1
        }
      ]
    });
  }

  /**
   * Methode zum Berechnen und Setzen der Werte für die Lorenzkurve
   * @param freqDistKeys   number[]   Liste aller Stichprobenwerte
   * @param freqDistValues number[]   Liste der absoluten Häufigkeiten oben genannter Stichprobenwerte
   */
  setLorenzChartValues(freqDistKeys: string[], freqDistValues: number[]): void {
    // In der Variable valueSeries wird der Verlauf der Lorenzkurve beschrieben. Sie wird hier initial erstellt.
    // Die Lorenzkurze beginnt im Punkt (0|0)
    let valueSeries = [{
      'name': '0',
      'value': 0
    }];

    // sumOfAbsoluteFrequencies beinhaltet die Summe der absoluten Häufigkeiten der Stichprobenwerte, 
    // die kleiner oder gleich dem Wert in der aktuellen Iteration sind
    let sumOfAbsoluteFrequency = 0;
    let characteristicSum = 0;

    // Durch alle Wertepaare der absoluten Häufigkeitsverteilung iterieren, um
    // den Verlauf der Lorenzkurve zu "zeichnen"
    for (let index = 0; index < freqDistKeys.length; index++) {

      // Eine absolute Häufigkeit stellt dar, wie oft ein bestimmter Stichprobenwert in einer Stichprobe vorkommt
      sumOfAbsoluteFrequency += freqDistValues[index];
      // Hier wird diese mit dem Stichprobenwert multipliziert, um den kumulierten Anzeil an der Merkmalssumme zu berechnen
      characteristicSum += freqDistValues[index] * Math.abs(Number(freqDistKeys[index]));
      valueSeries.push({
        'name': (Math.round(sumOfAbsoluteFrequency/this.expliziteStichprobe.length * 1000)/1000).toString(),
        'value': Math.round(characteristicSum/this.expliziteStichprobe.reduce((a, b) => Math.abs(a) + Math.abs(b), 0) * 1000)/1000
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
}
