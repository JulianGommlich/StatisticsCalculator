export enum SampleType {
  explicit = "explizit",
  absolute = "absolut"
}


export class Stichprobe {
  sampleType: SampleType;
  expliziteStichprobe: number[];
  haeufigkeitsverteilung: { [key: string]: number };
  z: number;



  constructor(newSampleType: SampleType, newExplSample: number[], newFreqDist: { [key: string]: number }, newZ: number) {
    this.sampleType = newSampleType;
    this.expliziteStichprobe = newExplSample;
    this.haeufigkeitsverteilung = newFreqDist;
    this.z = newZ;
  }


  // converts the explicit sample to frequency distribution
  setFreqDistribution(): void {
    let newFreqDist: { [key: string]: number } = {};

    // für jeden Wert im Array wird ein neuer key angelegt, falls noch nicht vorhanden, oder der value(die Anzahl) um eins erhöht:
    this.expliziteStichprobe.forEach(function (key) {
      if (Object.keys(newFreqDist).includes(String(key))) {
        newFreqDist[key] += 1;
      }
      else {
        Object.assign(newFreqDist, { [key]: 1 });
      }
    });

    // set the property "freqDist" to the new calulated frequency distribution & set "explSample" to new sorted "explSample"-Array
    this.haeufigkeitsverteilung = newFreqDist;
    // explSample sollte auch sortiert werden, falls die Eingabe von User nicht geordnet erfolgt ist
    this.expliziteStichprobe = this.expliziteStichprobe.sort((n1, n2) => n1 - n2);
  }


  // converts the frequency distribution to explicit sample
  setExpSample(): void {
    let newExplSample: number[] = [];

    // für jeden key in der Häufigkeitsverteilung (Object) wird jeweils die Häufigkeit (values) an Werten (keys) in das Array gepusht. 
    for (let key in this.haeufigkeitsverteilung) {
      for (let i = this.haeufigkeitsverteilung[key]; i > 0; i--) {
        newExplSample.push(Number(key));
      }
    }

    // set the property "explSample" to the new calulated explicit Sample, which is sorted in ascending order
    this.expliziteStichprobe = newExplSample.sort((n1, n2) => n1 - n2);
  }
}