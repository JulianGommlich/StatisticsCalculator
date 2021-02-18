export class SampleParser {

    constructor() { }

    // Takes a String as Input and converts it to a number-Array (explSample)
    parseExplSample(inputStr: string): number[] {
        let numArr: number[] = [];

        for (let key of inputStr.split(';')) {
            if ((/.*\d+.*/gm).test(key)) {
                numArr.push(Number(key));
            }
            else { 
                continue;
            }
        }

        return numArr;
    }

    // Takes a String as Input and converts it to an object (freqDist)
    parseFreqDist(inputStr: string): { [key: string]: number } {
        let freqDist: { [key: string]: number } = {};
        let matches = inputStr.matchAll(/\((?<value>\-?\d+(\,\d+)?);(?<freq>\d+)\)/gm);

        for (let match of matches) {
            Object.assign(freqDist, { [String(match.groups?.value)]: Number(match.groups?.freq) })
        }

        return freqDist;
    }
}