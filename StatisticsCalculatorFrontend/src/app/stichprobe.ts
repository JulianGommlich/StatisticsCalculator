import { ValueConverter } from "@angular/compiler/src/render3/view/template";



export enum SampleType {
  explicit = "explicit",
  absolute = "absolute"
}



export class Stichprobe {
  sampleType: SampleType;
  explSample: number[];
  freqDist: { [key: string]: number };
  z: number;



  constructor(newSampleType: SampleType, newExplSample: number[], newFreqDist: { [key: string]: number }, newZ: number) {
    this.sampleType = newSampleType;
    this.explSample = newExplSample;
    this.freqDist = newFreqDist;
    this.z = newZ;
  }


  // converts the explicit sample to frequency distribution
  setFreqDistribution(): void {
    let newFreqDist: { [key: string]: number } = {};

    // für jeden Wert im Array wird ein neuer key angelegt, falls noch nicht vorhanden, oder der value(die Anzahl) um eins erhöht:
    this.explSample.forEach(function (key) {
      if (Object.keys(newFreqDist).includes(String(key))) {
        newFreqDist[key] += 1;
      }
      else {
        Object.assign(newFreqDist, { [key]: 1 });
      }
    });

    // set the property "freqDist" to the new calulated frequency distribution & set "explSample" to new sorted "explSample"-Array
    this.freqDist = newFreqDist;
    // explSample sollte auch sortiert werden, falls die Eingabe von User nicht geordnet erfolgt ist
    this.explSample = this.explSample.sort((n1, n2) => n1 - n2);
  }


  // converts the frequency distribution to explicit sample
  setExpSample(): void {
    let newExplSample: number[] = [];

    // für jeden key in der Häufigkeitsverteilung (Object) wird jeweils die Häufigkeit (values) an Werten (keys) in das Array gepusht. 
    for (let key in this.freqDist) {
      for (let i = this.freqDist[key]; i > 0; i--) {
        newExplSample.push(Number(key));
      }
    }

    // set the property "explSample" to the new calulated explicit Sample, which is sorted in ascending order
    this.explSample = newExplSample.sort((n1, n2) => n1 - n2);
  }

}