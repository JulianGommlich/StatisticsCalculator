export class Stichprobe {

  sampleType: string;
  values: object[];
  z: number;

  constructor(newSampleType: string, newValues: object[], newZ: number) {
    this.sampleType = newSampleType;
    this.values = newValues;
    this.z = newZ;
  }

}