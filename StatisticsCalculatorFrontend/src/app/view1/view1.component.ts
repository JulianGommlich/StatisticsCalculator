import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormControl, FormGroup } from "@angular/forms";
import { Stichprobe } from '../stichprobe';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { table } from 'console';
import { SampleType } from '../sampleType';
import { Validation } from "../validation";
import { SampleParser } from '../sampleParser';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css', '../app.component.css']
})

export class View1Component implements OnInit{

  sampleType: boolean|null = null;
  inputForm: FormGroup = new FormGroup({
    numSequence: new FormControl(),
    sampleType: new FormControl(),
    valueZInput: new FormControl()
  });

  savedValues$: Observable<any>;


  constructor( public dialog: MatDialog, private route: ActivatedRoute ) { }

  changeTypeToExpl(){
    this.sampleType = true;
  }  

  changeTypeToAbs() {
    this.sampleType = false;
  }

  createNewRow(types: string){
    var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(types);
    var row = relevant_table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    var cell5 = row.insertCell(-1);

    switch (types){
      case "abs":
        cell1.innerHTML = "<input type='number'>";
        cell2.innerHTML = "<input type='number'>";
        break;
      case "expl":
        cell1.innerHTML = "<input type='number'>";
        cell2.innerHTML = "<input type='number'>";
        cell3.innerHTML = "<input type='number'>";
        cell4.innerHTML = "<input type='number'>";
        cell5.innerHTML = "<input type='number'>";
        break;
    }
  }
  removeRow(types : string){
    var relevant_table: HTMLTableElement = <HTMLTableElement> document.getElementById(types);
    if (relevant_table.rows.length > 2){ 
       /*       console.log(relevant_table.rows[2].cells.item(0)!.getElementsByTagName("input")[0].value);
      let pp: HTMLInputElement;
      pp = relevant_table.rows[2].cells.item(0)!.getElementsByTagName("input")[0];
      if (pp.value==""){
        console.log("Value ist ''")
      }
      pp.valueAsNumber = 8;
      console.log(pp.type); */
      relevant_table.deleteRow(-1);
    } else {
      alert("Es kann keine weitere Reihe gelöscht werden!")
    }

  }
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
        return [{ 'numSequence': numSequence, 'sampleType': sampleType, 'valueZInput': valueZInput}];
      })
    );

    // Gespeicherte Werte in die Eingabefelder einsetzen
    this.savedValues$.subscribe(values => {
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
    const numSeq: string = (<HTMLInputElement>document.getElementById('numSequence')).value;
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

    if (validation.checkValidation(temp_string, expl, abs, valueZ)) {
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

  uploadFile($event: any): void {
    let newNumSeq: String;
    let newSampleType: String;
    let newZ: Number;
 
    let input = $event.target;  
    let reader = new FileReader();  
    reader.readAsText(input.files[0]); 

    reader.onload = () => {  
      let csvData = reader.result;  
      let csvRecordsArray = (<string>csvData).split(","); 
      if ((/\((\d*); ?(\d*)\)/gm).test(csvRecordsArray[0])) {
        newNumSeq = csvRecordsArray[0].replace(/\"/g, "")
        newSampleType = "absolut";
      }
      else if ((/\"(\d+\;{0,1} {0,1})+\"$/gm).test(csvRecordsArray[0])) {
        newNumSeq = csvRecordsArray[0].replace(/\"/g, "")
        newSampleType = "explizit";
      }

      newZ = Number(csvRecordsArray[1].replace(/\"/g, ""));

      this.inputForm.setValue({
        numSequence: newNumSeq,
        sampleType: newSampleType,
        valueZInput: newZ
      });
    };
  }
}