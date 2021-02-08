import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormControl, FormGroup } from "@angular/forms";
import { SampleType, Stichprobe } from '../stichprobe';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


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
          numSequence += `(${secondSplit[0][index]};${secondSplit[1][index]})`;
          if (index < secondSplit[0].length - 1) {
            numSequence += ';';
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


  openDialog() {
    let dialogRef;
    var fixData = null;
    var validationTrue = this.checkValidation();
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    if (validationTrue == true) {
      if (expl.checked == true && abs.checked == false) {
        fixData = true;
      } else if (expl.checked == false && abs.checked == true) {
        fixData = false;
      }

      let inputData = this.buildFormModel();

      dialogRef = this.dialog.open(PopUpComponent, {
        data: { inputData }
      });
    } else {
      dialogRef = this.dialog.open(PopUpInvalidComponent, {
        data: {}
      })
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  buildFormModel() {
    let newSampleType: SampleType = this.inputForm.get('sampleType')?.value;
    let newZ: number = this.inputForm.get('valueZInput')?.value;
    console.log(newSampleType);

    let stichprobe = new Stichprobe(newSampleType, [], {}, newZ);

    if (newSampleType == "explizit") {
      stichprobe.expliziteStichprobe = this.parseExplSample(this.inputForm.get('numSequence')?.value);
      stichprobe.setFreqDistribution();
    }
    
    else if (newSampleType == "absolut") {
      stichprobe.haeufigkeitsverteilung = this.parseFreqDist(this.inputForm.get('numSequence')?.value);
      stichprobe.setExpSample();
    }

    return stichprobe;
  }

  checkValidation() {
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    const valueZ = document.getElementById('valueZInput') as HTMLInputElement;
    if (expl.checked == false && abs.checked == false) {
      return false;
    } else if (valueZ.value.length == 0) {
      return false;
    } else if (this.validateSequence() == false) {
      return false;
    } else {
      return true;
    }
  }

  validateSequence() {
    let numSeq: string = (<HTMLInputElement>document.getElementById("numSequence")).value;
    var letters = /\d*[A-Za-z\:\°\^\"\§\$\%\&\{\}\[\]\=\?\´\`\+\*\#\'\:\_\<\>\|]\d*$/;

    if (numSeq.length == 0) {
      return false;
    } else if (numSeq.match(letters)) {
      return false;
    }
    var splittedSeq = numSeq.split(";", 100)
    //var numbers = splittedSeq.match(/(?<number>\d*)/g);
    if (this.countNumbers(splittedSeq) == false) {
      return false;
    } else {
      return true;
    }
  }

  countNumbers(arraySeq: string[]) {
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
    } else {
      return true
    }
  }

  // Takes a String as Input and converts it to a number-Array (explSample)
  parseExplSample(inputStr: string): number[] {
    let numArr: number[] = [];

    for (let key in inputStr.split(";")) {
      numArr.push(Number(inputStr.split(";")[key]));
    }

    return numArr;
  }

  // Takes a String as Input and converts it to an object (freqDist)
  parseFreqDist(inputStr: string): { [key: string]: number } {
    let freqDist: { [key: string]: number } = {};
    let matches = inputStr.matchAll(/\((?<value>\d*); ?(?<freq>\d*)\)/gm);

    for (let match of matches) {
      Object.assign(freqDist, { [String(match[1])]: Number(match[2]) })
    }

    return freqDist;
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}