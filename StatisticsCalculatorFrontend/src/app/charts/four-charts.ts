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

  view: [number, number] = [600, 400];

  // options
  barAndPieChartValues: any[] = [];
  empiricalDistributionChartValues: any[] = [];
  lorenzChartValues: any[] = [];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Stichprobenwert';
  showYAxisLabel = true;
  yAxisLabel = 'Absolute Häufigkeit';
  timeline: boolean = true;
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    const freqDistKeys = Object.keys(freqDist);
    const freqDistValues = Object.values(freqDist);

    this.setBarAndPieChartValues(freqDistKeys, freqDistValues);
    this.setEmpiricalDistributionChartValues(freqDistKeys, freqDistValues);
    this.setLorenzChartValues(freqDistKeys, freqDistValues);
  }

  setBarAndPieChartValues(freqDistKeys: string[], freqDistValues: number[]) {
    for (let index = 0; index < Object.keys(freqDist).length; index++) {
      this.barAndPieChartValues.push({
        'name': freqDistKeys[index],
        'value': freqDistValues[index]
      });
    }
    console.log(this.barAndPieChartValues);
  }

  setEmpiricalDistributionChartValues(freqDistKeys: string[], freqDistValues: number[]) {
    this.empiricalDistributionChartValues.push({
      'name': '0',
      'series': [
        {
          'name': '0',
          'value': 0
        },
        {
          'name': freqDistKeys[0],
          'value': 0
        }
      ]
    });
    let sumOfRelativeFrequency = 0;
    for (let index = 0; index < Object.keys(freqDist).length-1; index++) {
      sumOfRelativeFrequency += freqDistValues[index]/explSample.length;
      this.empiricalDistributionChartValues.push({
        'name': (index + 1).toString(),
        'series': [
          {
            'name': freqDistKeys[index],
            'value': Math.round(sumOfRelativeFrequency * 1000)/1000
          },
          {
            'name': freqDistKeys[index+1],
            'value': Math.round(sumOfRelativeFrequency * 1000)/1000
          }
        ]
      });
    }
    this.empiricalDistributionChartValues.push({
      'name': (Object.keys(freqDist).length + 1).toString(),
      'series': [
        {
          'name': freqDistKeys[freqDistKeys.length-1],
          'value': 1
        },
        {
          'name': (Number(freqDistKeys[freqDistKeys.length-1]) + 10).toString(),
          'value': 1
        }
      ]
    });
    console.log(this.empiricalDistributionChartValues);
  }

  setLorenzChartValues(freqDistKeys: string[], freqDistValues: number[]) {
    let valueSeries = [{
      'name': "0",
      'value': 0
    }];
    let sumOfAbsoluteFrequency = 0;
    for (let index = 0; index < Object.keys(freqDist).length; index++) {
      sumOfAbsoluteFrequency += freqDistValues[index] * Number(freqDistKeys[index]);
      valueSeries.push({
        'name': freqDistKeys[index],
        'value': Math.round(sumOfAbsoluteFrequency/explSample.reduce((a, b) => a + b, 0) * 1000)/1000
      });
    }
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
            'name': freqDistKeys[freqDistKeys.length-1],
            'value': 1
          }
        ]
      }
    );
    console.log(this.lorenzChartValues);
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
