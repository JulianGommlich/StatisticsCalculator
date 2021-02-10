export enum SampleType {
    explicit = "explicit",
    absolute = "absolute"
  }

export class Ergebnisse {
    sampleType: SampleType;
    expliziteStichprobe: number[];
    freqDist: { [key: string]: number };
    z: number;
    modalwert: number;
    mittelwert: number;
    median: number;
    quantile: { [key: string]: number };
    varianz: number;
    standardabweichung: number;
    mittlereAbweichungZuZ: number;
    giniKoeffizient: number;

    constructor(newSampleType: SampleType, newExplSample: number[], newFreqDist: { [key: string]: number }, newZ: number, newModalValue: number, newMeanValue: number, 
        newMedian: number, newQuantile: { [key: string]: number }, newVariance: number, newStandardDev: number, newMeanAbsoluteDeviation: number, newGiniValue: number){
        this.sampleType = newSampleType;
        this.expliziteStichprobe = newExplSample;
        this.freqDist = newFreqDist;
        this.z = newZ;
        this.modalwert = newModalValue;
        this.mittelwert = newMeanValue;
        this.median = newMedian;
        this.quantile = newQuantile;
        this.varianz = newVariance;
        this.standardabweichung = newStandardDev;
        this.mittlereAbweichungZuZ = newMeanAbsoluteDeviation;
        this.giniKoeffizient = newGiniValue;
      }    
}  