export class Validation {

    constructor() { }

    /**
     * Checks if Input is full and correct according to our definition (not more than 100 numbers, not more than 30 different numbers)
     * @param expl gives the element of the expl radio button
     * @param abs gives the element of the abs radio button
     * @param valueZ gives the element of the valuez input field
     */
    checkValidation(numSequence: string, expl: HTMLInputElement, abs: HTMLInputElement, valueZ: HTMLInputElement): string {
        if (expl.checked === false && abs.checked === false) {
            return "form";
        }
        if (valueZ.value.length === 0) {
            return "form";
        }
        if (expl.checked == true) {
            var types = "explizit";
        } else {
            var types = "absolut";
        }
        if (numSequence==""){
            return "form";
        }
        let errorCode : string = this.validateSequence(types, numSequence);
        return (errorCode)
    }

/**
 * Checks for explizit or absolute different cases
 * @param types gives types as explizit or absolut
 * @param numSequence list of nummbers
 */
    validateSequence(types: string, numSequence: string): string {

        switch (types) {
            case "explizit":
                let list = numSequence.split(';');
                if (!(/^(\-?\d+\;?)+$/g).test(numSequence)) { return "pop-up"; }
                //if more than 100 numbers
                if (list.length > 100) { return "moreThanHundred"; }
                //if more than 30
                list.sort();
                if (!this.countNumbers(list)) { return "moreThanThirty"; };
                break;
            case "absolut":
                let listOfObjects = numSequence.split('; ');
                let scope: number = 0;
                let tableIsNotFull = false;
                listOfObjects.forEach(valuePair => {
                    let valuePairArray = valuePair.replace(/\(|\)/g, '').split(';');
                    let x = valuePairArray[0];
                    let y = valuePairArray[1];

                    if (x === "" || y === "") { // if table is not full
                        tableIsNotFull = true;
                    }

                    scope += Number(y);
                });
                if (tableIsNotFull) { return "notFull"; }
                if (!(/^(\(-?\d+\;\d+\)(; )?)+$/g).test(numSequence)) { return "pop-up"; }
                // over 30 rows equals to over 30 different values (if typed correctly, forcing to use all cells!) 
                if (listOfObjects.length > 30) { return "moreThanThirty"; }

                // if scope bigger than 100
                if (scope > 100) { return "moreThanHundred"; }
                break;
        }
        return "correct";
    }


    /**
     * Converts array to object with key as number and value as count
     * gives back boolean if more than 30 numbers false
     * @param arraySeq is our list of numbers
     */
    countNumbers(arraySeq: string[]): boolean {
        let newArraySequence: { [key: string]: number } = {};

        arraySeq.forEach(key => {
            if (Object.keys(newArraySequence).includes(String(key))) {
                newArraySequence[key] += 1;
            }
            else {
                Object.assign(newArraySequence, { [key]: 1 });
            }
        });

        return !(Object.keys(newArraySequence).length > 30);
    }
}