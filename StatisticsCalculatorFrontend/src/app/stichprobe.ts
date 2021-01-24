export enum SampleType {
  explicit, 
  absolute
}

export class Stichprobe {

  sampleType: SampleType;
  values: object[];
  z: number;

  constructor(newSampleType: SampleType, newValues: object[], newZ: number) {
    this.sampleType = newSampleType;
    this.values = newValues;
    this.z = newZ;
  }

}