import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormControl, FormGroup } from "@angular/forms";
import { Stichprobe } from '../stichprobe';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';
import { ActivatedRoute } from '@angular/router';
import { delay, sample, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SampleType } from '../sampleType';
import { Validation } from "../validation";
import { SampleParser } from '../sampleParser';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css', '../app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class View1Component implements OnInit {

  sampleType: boolean | null = null;
  inputForm: FormGroup = new FormGroup({
    numSequence: new FormControl(),
    sampleType: new FormControl(),
    valueZInput: new FormControl()
  });

  savedValues$: Observable<any>;

  constructor( public dialog: MatDialog, private route: ActivatedRoute ) { }
  /**
   * Changes the SampleType to Expl to show the right table
   */
  changeTypeToExpl(){
    this.sampleType = true;
  }  
  /**
   * Changes the Sampletype to Abs to show the right table
   */
  changeTypeToAbs() {
    this.sampleType = false;
  }
  /**
   * Creates a new row in selected table
   * @param types gives eather type "expl" of "abs" for selection of the right table
   */
  createNewRow(types: string){
    var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(types);
    var row = relevant_table.insertRow(-1);
/*     var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    var cell5 = row.insertCell(-1); */

    switch (types) {
      case "abs":
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        cell1.innerHTML = "<input class='table1' type='number'>";
        cell2.innerHTML = "<input class='table1' type='number'>";
        break;
      case "expl":
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        var cell4 = row.insertCell(-1);
        var cell5 = row.insertCell(-1);
        cell1.innerHTML = "<input  class='table1' type='number'>";
        cell2.innerHTML = "<input  class='table1' type='number'>";
        cell3.innerHTML = "<input  class='table1' type='number'>";
        cell4.innerHTML = "<input  class='table1' type='number'>";
        cell5.innerHTML = "<input  class='table1' type='number'>";
        break;
    }
  }
  /**
   * Removes a row in selected table, but doesnt allow entire deletion.
   * @param types gives eather type "expl" of "abs" for selection of the right table
   */
  removeRow(types : string){
    var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(types);

    if (relevant_table.rows.length > 2){   
      relevant_table.deleteRow(-1);
    } else {
      alert("Es kann keine weitere Reihe gelöscht werden!")
    }
  }
  /**
   * on init the inside of components is removed
   */
  ngOnInit() {
    // Eingabefelder leeren
    this.inputForm.setValue({
      numSequence: '',
      sampleType: '',
      valueZInput: ''
    });

    // Gespeicherte Werte aus den Parametern der URL erhalten
    this.savedValues$ = this.route.paramMap.pipe(
      switchMap(params => {
        let numSequence = params.get('numSequence');
        let sampleType = params.get('sampleType');
        let valueZInput = params.get('valueZInput');
        return [{ 'numSequence': numSequence, 'sampleType': sampleType, 'valueZInput': valueZInput }];
      })
    );

    // Gespeicherte Werte in die Eingabefelder einsetzen
    this.savedValues$.subscribe(values => {
      let expliziteStichprobe;
      let absoluteStichprobe;
      const inputValues: string[] = Object.values(values);
      let numSequence = '';
      if (inputValues[1] === 'absolut') {
        let firstSplit = inputValues[0].split('|');
        let secondSplit = [];
        secondSplit.push(firstSplit[0].split(','));
        secondSplit.push(firstSplit[1].split(','));
        for (let index = 0; index < secondSplit[0].length; index++) {
          numSequence += `(${secondSplit[0][index].replace('.', ',')};${secondSplit[1][index]})`;
          if (index < secondSplit[0].length - 1) {
            numSequence += '; ';
          }
        }
      } else if (inputValues[1] === 'explizit') {
        numSequence = inputValues[0]?.replace(/,/gi, ';');
      }

      this.inputForm.setValue({
        numSequence: numSequence,
        sampleType: inputValues[1],
        valueZInput: inputValues[2]
      });
    });
  }

  openDialog(): void {
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    const valueZ = document.getElementById('valueZInput') as HTMLInputElement;

    let tempType = '';

    if(this.sampleType){
      tempType = 'expl';
    } else {
      tempType = 'abs';
    }

    var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(tempType);

    let temp_string = '';

    if(tempType == 'expl'){
      for(let i=1; i < relevant_table.rows.length; i++){
        for(let j=0; j < relevant_table.rows[i].cells.length; j++){
          if(relevant_table.rows[i].cells.item(j)!.getElementsByTagName("input")[0].value){
            console.log(relevant_table.rows[0]);
            temp_string += String(relevant_table.rows[i].cells.item(j)!.getElementsByTagName("input")[0].value)+';';
          }        
        }
      }
    } else {
      for(let i=1; i < relevant_table.rows.length; i++){
        const temp_stichprobenWert = relevant_table.rows[i].cells.item(0)!.getElementsByTagName("input")[0].value;
        const temp_absHäufigkeit = relevant_table.rows[i].cells.item(1)!.getElementsByTagName("input")[0].value;
        if(temp_stichprobenWert && temp_absHäufigkeit){
          temp_string += '('+ temp_stichprobenWert + ';' + temp_absHäufigkeit + ');';
        }        
      }
    }


    let inputData = this.buildFormModel();
    const validation = new Validation();

    if (validation.checkValidation( expl, abs, valueZ)) {
      this.inputForm.patchValue({numSequence: temp_string});

      let inputData = this.buildFormModel();
      this.dialog.open(PopUpComponent, { data: { inputData } });
    } else {
      this.dialog.open(PopUpInvalidComponent, { data: { case: 'form' } });
    }

  }

  buildFormModel(): Stichprobe {
    let newSampleType: SampleType = this.inputForm.get('sampleType')?.value;
    let newZ: number = this.inputForm.get('valueZInput')?.value;

    let stichprobe = new Stichprobe(newSampleType, [], {}, newZ);

    const sampleParser = new SampleParser();

    if (newSampleType === 'explizit') {
      stichprobe.expliziteStichprobe = sampleParser.parseExplSample(this.inputForm.get('numSequence')?.value);
      stichprobe.setFreqDistribution();
    }
    else if (newSampleType === 'absolut') {
      stichprobe.haeufigkeitsverteilung = sampleParser.parseFreqDist(this.inputForm.get('numSequence')?.value);
      stichprobe.setExpSample();
    }
    // else... Fehlerhandling

    return stichprobe;
  }

  openDeleteDialog(): void {
    this.dialog.open(PopUpDeleteComponent, {});
  }




  /**
   * Importiert eine CSV-Datei und schreibt die Werte in die Eingabe-Tabelle.
   * @param $event 
   */
  async uploadFile($event: any) {
    let explSample: Number[] = [];
    let absSample: { [key: string]: number } = {};
    let newSampleType: String;

    // Funktion, die ein paar MS wartet, bis der Code weiter ausgeführt wird
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /* Liest die Werte aus der CSV-Datei aus. */
    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split("\n");

      if ((/explizite Stichprobe/gm).test(csvRecordsArray[0])) {
        newSampleType = "explizit";
        this.sampleType = true;
        for (let line of csvRecordsArray) {
          if ((/\d+/gm).test(line)) {
            explSample.push(Number(line));
          }
          else {
            continue;
          }
        }
      }
      else if ((/Absolute Häufigkeitsverteilung/gm).test(csvRecordsArray[0])) {
        newSampleType = "absolut";
        this.sampleType = false;
        for (let line of csvRecordsArray) {
          if ((/\d+\;\d+/gm).test(line)) {
            let splittedLine = line.split(";");
            Object.assign(absSample, { [String(splittedLine[0])]: Number(splittedLine[1]) });
          }
          else {
            continue;
          }
        }
      }
      // Falls eine nicht stimmige CSV übergeben wurde, wird das invalid Pop-Up gestartet.
      else {
        this.dialog.open(PopUpInvalidComponent, { data: { case: 'form' } });
      }
      this.inputForm.setValue({
        numSequence: "",            // kann nach dem Entfernen des Input-Feldes gelöscht werden.
        sampleType: newSampleType,
        valueZInput: ""             // Soll über die GUI eingegeben werden. 
      });      
    };

    // Wartet 400ms und führt dann den restlichen Code aus. Ansonsten wird der Code ausgeführt, bevor die HTML Elemente erstellt wurden. 
    await delay(400);

    /* Schreibt die Werte in die Eingabe-Tabelle hinein. */
    // Wenn eine explizite Stichprobe gegeben ist:
    if (this.sampleType) {
      let table: HTMLTableElement = <HTMLTableElement> document.getElementById("expl");
      let tableCell: HTMLInputElement;
      let rowNum = Math.ceil(explSample.length / 5);
      for (let r = 1; r <= rowNum; r++) {
        if (r != 1) {
          this.createNewRow("expl");
        }
        for (let c = 0; c < 5; c++) {
          tableCell = table.rows[r].cells.item(c)!.getElementsByTagName("input")[0]
          tableCell.valueAsNumber = Number(explSample[c+5*(r-1)]);
        }
      }
    }
    // Sonst wenn eine abs. Stichprobe gegeben ist:
    else if (!this.sampleType) {
      let table: HTMLTableElement = <HTMLTableElement> document.getElementById("abs");
      let tableCellKey, tableCellValue: HTMLInputElement;
      let rowNum = Math.ceil(Object.keys(absSample).length / 5);
      let i = 0;
      for (let i = 0; i < Object.keys(absSample).length; i++) {
        if (i != 0) {
          this.createNewRow("abs");
        }
        tableCellKey = table.rows[i+1].cells.item(0)!.getElementsByTagName("input")[0];
        tableCellKey.valueAsNumber = Number(Object.keys(absSample)[i]);
        tableCellValue = table.rows[i+1].cells.item(1)!.getElementsByTagName("input")[0];
        tableCellValue.valueAsNumber = Number(Object.values(absSample)[i]);
      }
    }
  }
}