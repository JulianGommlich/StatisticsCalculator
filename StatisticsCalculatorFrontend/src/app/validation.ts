import { preserveWhitespacesDefault } from "@angular/compiler";

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
    /**
     * Checks if more than 100 or if more than 30 different values
     * @param types if expl or abs
     */
    validateSequence(types: string): boolean {
        var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(types);
        var rowsLength :number = relevant_table.rows.length; 
        switch (types){
            case "expl":
                var i=0;
                var row=1;
                var list=[];
                //check each row if each cell has number. if yes, add to i.
                while (row!=rowsLength){
                    var cell = 0;
                    while (cell!=5){
                        var value = relevant_table.rows[row].cells.item(cell)!.getElementsByTagName("input")[0].value;
                        if (value == ""){
                        } else {
                            list.push(value);
                            i += 1;
                        }
                        cell += 1;
                    }
                    row +=1;
                }
                console.log("Werte insgesammt sind:" +i);
                //if more than 100 numbers
                if (i>100){
                    return false;
                }
                //if more than 30
                list.sort();
                if (!this.countNumbers(list)){
                    return false;
                };
               return true;
            case "abs":
                var row=1;
                var scope:number = 0;
                // over 30 rows equals to over 30 different values (if typed correctly, forcing to use all cells!) 
                if (rowsLength > 30){
                    return false;
                }
                // verliere ich hier die letzte row?
                while (row!=rowsLength){
                    var x = relevant_table.rows[row].cells.item(0)!.getElementsByTagName("input")[0].value
                    var y = relevant_table.rows[row].cells.item(1)!.getElementsByTagName("input")[0].value
                    if (x == ""){ //if table is not full
                        return false;
                    } if(y == ""){ // if table is not full
                        return false;
                    }
                    // convert x to number
                    var yNumber:number =+y;
                    scope += yNumber;
                    row += 1;
                }
                // if scope bigger than 100
                if (scope > 100)
                    return false;
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

        arraySeq.forEach(function (key) {
            if (Object.keys(newArraySequence).includes(String(key))) {
                newArraySequence[key] += 1;
            }
            else {
                Object.assign(newArraySequence, { [key]: 1 });
            }
        });
        if (Object.keys(newArraySequence).length > 30) {
            return false;
        }
        return true;
    }
}
//Math.max(...Object.values(newArraySequence)) >= 30