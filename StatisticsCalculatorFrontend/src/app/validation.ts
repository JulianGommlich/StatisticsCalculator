export class Validation {

    constructor() { }

    /**
     * Checks if Input is full and correct according to our definition (not more than 100 numbers, not more than 30 different numbers)
     * @param expl gives the element of the expl radio button
     * @param abs gives the element of the abs radio button
     * @param valueZ gives the element of the valuez input field
     */
    checkValidation(numSequence: string, expl: HTMLInputElement, abs: HTMLInputElement, valueZ: HTMLInputElement): boolean {

        if (expl.checked === false && abs.checked === false) {
            return false;
        }
        if (valueZ.value.length === 0) {
            return false;
        }
        if (expl.checked == true) {
            var types = "explizit";
        } else {
            var types = "absolut";
        }
        if (!this.validateSequence(types, numSequence)) {
            return false;
        }
        return true;
    }

    /**
     * Checks if more than 100 or if more than 30 different values
     * @param types if expl or abs
     */
    validateSequence(types: string, numSequence: string): boolean {

        switch (types) {
            case "explizit":
                let list = numSequence.split(';');
                if (!(/^(\-?\d+\;?)+$/g).test(numSequence)) { return false }
                //if more than 100 numbers
                if (list.length > 100) { return false; }
                //if more than 30
                list.sort();
                if (!this.countNumbers(list)) { return false; };
                break;
            case "absolut":
                let listOfObjects = numSequence.split('; ');
                var scope: number = 0;
                if (!(/^(\(-?\d+\;\d+\)(; )?)+$/g).test(numSequence)) { return false }
                // over 30 rows equals to over 30 different values (if typed correctly, forcing to use all cells!) 
                if (listOfObjects.length > 30) { return false; }

                let tableIsNotFull = false;
                listOfObjects.forEach(valuePair => {
                    let valuePairArray = valuePair.replace(/\(|\)/g, '').split(';');
                    let x = valuePairArray[0];
                    let y = valuePairArray[1];
                    console.log(valuePairArray);

                    if (x === "" || y === "") { // if table is not full
                        tableIsNotFull = true;
                    }

                    scope += Number(y);
                });
                // if scope bigger than 100
                if (tableIsNotFull) { return false; }
                if (scope > 100) { return false; }
                break;
        }
        return true;
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