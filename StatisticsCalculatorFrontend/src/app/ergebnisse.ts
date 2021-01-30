export enum SampleType {
    explicit = "explicit",
    absolute = "absolute"
  }

export class Ergebnisse {
    sampleType: SampleType;
    explSample: number[];
    freqDist: { [key: string]: number };
    z: number;
    modalValue: number;
    meanValue: number;
    median: number;
    quantile: { [key: string]: number };
    variance: number;
    standardDev: number;
    meanAbsoluteDeviation: number;
    giniValue: number;

    constructor(newSampleType: SampleType, newExplSample: number[], newFreqDist: { [key: string]: number }, newZ: number, newModalValue: number, newMeanValue: number, 
        newMedian: number, newQuantile: { [key: string]: number }, newVariance: number, newStandardDev: number, newMeanAbsoluteDeviation: number, newGiniValue: number){
        this.sampleType = newSampleType;
        this.explSample = newExplSample;
        this.freqDist = newFreqDist;
        this.z = newZ;
        this.modalValue = newModalValue;
        this.meanValue = newMeanValue;
        this.median = newMedian;
        this.quantile = newQuantile;
        this.variance = newVariance;
        this.standardDev = newStandardDev;
        this.meanAbsoluteDeviation = newMeanAbsoluteDeviation;
        this.giniValue = newGiniValue;
      }

}  