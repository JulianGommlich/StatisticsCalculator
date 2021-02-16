export class Validation {

    constructor() {}

    /**
     * Checks if Input is full and correct according to our definition (not more than 100 numbers, not more than 30 different numbers)
     * @param expl gives the element of the expl radio button
     * @param abs gives the element of the abs radio button
     * @param valueZ gives the element of the valuez input field
     */
    checkValidation(expl: HTMLInputElement, abs: HTMLInputElement, valueZ: HTMLInputElement): boolean {

        if (expl.checked === false && abs.checked === false) {
            return false;
        }
        if (valueZ.value.length === 0) {
            return false;
        }
        if (expl.checked == true){
            var types = "expl";
        } else {
            var types = "abs";
        }
        if (!this.validateSequence(types)) {
            return false;
        }
        return true;
    }
    
    validateSequence(types: string): boolean {
        var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(types);
        var rowsLength :number = relevant_table.rows.length; 
        switch (types){
            case "expl":
                var i=0;
                var row=1;
                var list=[];
                while (row!=rowsLength){
                    var cell = 0;
                    while (cell!=5){
                        var value = relevant_table.rows[row].cells.item(cell)!.getElementsByTagName("input")[0].value;
                        if (value == null){
                            break;
                        } else {
                            list.push(value);
                            i += 1;
                        }
                        cell += 1;
                    }
                    row +=1;
                }
                if (i>100){
                    return false;
                }
               return true;
            case "abs":
                var row=1;
                var scope:number = 0;
                if (rowsLength > 30){
                    return false;
                }
                // verliere ich hier die letzte row?
                while (row!=rowsLength){
                    var x = relevant_table.rows[row].cells.item(0)!.getElementsByTagName("input")[0].value
                    var y = relevant_table.rows[row].cells.item(1)!.getElementsByTagName("input")[0].value
                    if (x == null){
                        return false;
                    } if (y == null){
                        return false;
                    }
                    var xNumber:number =+x;
                    scope += xNumber;
                    row += 1;
                }
                if (scope > 100)
                    return false;
                break;
        }
        return true;
        
/*      
        if (!this.countNumbers(splittedSeq)) {
            return false;
        }
        return true; */
    }

/*     countNumbers(arraySeq: string[]): boolean {
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
    } */
}