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


// Wie kriegen wir die Daten aus der View in die stichprobe.ts
// händisch auf IDs zugreifen 
// Daten aus Form als Model rausholen 
