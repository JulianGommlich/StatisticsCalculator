export class Validation {

    constructor() {}

    checkValidation(numSeq: string, expl: HTMLInputElement, abs: HTMLInputElement, valueZ: HTMLInputElement): boolean {

        if (expl.checked === false && abs.checked === false) {
            return false;
        }
        if (valueZ.value.length === 0) {
            return false;
        }
        if (!this.validateSequence(numSeq)) {
            return false;
        }
        return true;
    }

    validateSequence(numSeq: string): boolean {
        var symbols = /\d*[A-Za-z\:\°\^\"\§\$\%\&\{\}\[\]\=\?\´\`\+\*\#\'\:\_\<\>\|\!]\d*$/;

        if (numSeq.length === 0 || numSeq.match(symbols)) {
            return false;
        }

        var splittedSeq = numSeq.split(';', 100)
        if (!this.countNumbers(splittedSeq)) {
            return false;
        }
        return true;
    }

    countNumbers(arraySeq: string[]): boolean {
        let newArraySequence: { [key: string]: number } = {};

        arraySeq.forEach(function (key) {
            if (Object.keys(newArraySequence).includes(String(key))) {
                newArraySequence[key] += 1;
            }
            else {
                Object.assign(newArraySequence, { [key]: 1 });
            }
        });
        if (Math.max(...Object.values(newArraySequence)) >= 30) {
            return false;
        }
        return true;
    }
}