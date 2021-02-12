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
import { SampleType } from '../sampleType';


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css', '../app.component.css']
})

export class View1Component implements OnInit{

  inputForm: FormGroup = new FormGroup({
    numSequence: new FormControl(),
    sampleType: new FormControl(),
    valueZInput: new FormControl()
  });

  savedValues$: Observable<any>;

  constructor( public dialog: MatDialog, private route: ActivatedRoute ) { }


  ngOnInit(): void {
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
    if (this.checkValidation()) {
      let inputData = this.buildFormModel();
      this.dialog.open(PopUpComponent, { data: { inputData } });
    } else {
      this.dialog.open(PopUpInvalidComponent, { data: {} });
    }
  }

  buildFormModel(): Stichprobe {
    let newSampleType: SampleType = this.inputForm.get('sampleType')?.value;
    let newZ: number = this.inputForm.get('valueZInput')?.value;

    let stichprobe = new Stichprobe(newSampleType, [], {}, newZ);

    if (newSampleType === 'explizit') {
      stichprobe.expliziteStichprobe = this.parseExplSample(this.inputForm.get('numSequence')?.value);
      stichprobe.setFreqDistribution();
    }
    else if (newSampleType === 'absolut') {
      stichprobe.haeufigkeitsverteilung = this.parseFreqDist(this.inputForm.get('numSequence')?.value);
      stichprobe.setExpSample();
    }
    // else... Fehlerhandling

    return stichprobe;
  }

  checkValidation(): boolean {
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    const valueZ = document.getElementById('valueZInput') as HTMLInputElement;
    if (expl.checked === false && abs.checked === false) {
      return false;
    }
    if (valueZ.value.length === 0) {
      return false;
    } 
    if (!this.validateSequence()) {
      return false;
    }
    return true;
  }

  validateSequence(): boolean {
    let numSeq: string = (<HTMLInputElement>document.getElementById('numSequence')).value;
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

  // Takes a String as Input and converts it to a number-Array (explSample)
  parseExplSample(inputStr: string): number[] {
    let numArr: number[] = [];

    for (let key of inputStr.split(";")) {
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
    let matches = inputStr.matchAll(/\((?<value>\d*[.,]\d*); ?(?<freq>\d*)\)/gm);

    for (let match of matches) {
      Object.assign(freqDist, { [String(match[1])]: Number(match[2]) })
    }

    return freqDist;
  }

  openDeleteDialog(): void {
    this.dialog.open(PopUpDeleteComponent, {});
  }

  /* Importiert eine CSV-Datei und schreibt die Werte in das Eingabeformular. */
  uploadFile($event: any): void {
    let explSample: Number[] = [];
    let absSample: { [key: string]: number } = {};
    let newSampleType: String;
 
    let input = $event.target;  
    let reader = new FileReader();  
    reader.readAsText(input.files[0]); 

    reader.onload = () => {  
      let csvData = reader.result; 
      let csvRecordsArray = (<string>csvData).split("\n"); 

      if ((/explizite Stichprobe/gm).test(csvRecordsArray[0])) {
        newSampleType = "explizit";
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

      // this.inputForm.setValue({
      //   numSequence: newNumSeq,
      //   sampleType: newSampleType,
      //   valueZInput: newZ
      // });
    };
  }
}