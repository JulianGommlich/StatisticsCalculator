import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { SampleType, Stichprobe } from '../stichprobe';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})

export class View1Component {
  
  inputForm: FormGroup = new FormGroup ({
    numSequence: new FormControl(),
    meanDeviation: new FormControl(),
    sampleType: new FormControl(),
    valueZInput: new FormControl()
  });
  
  
  constructor(
    public dialog: MatDialog, 
    private router: Router,
  ) {}

  onSubmit(){
    this.router.navigate(['/calculator'])
  }

  openDialog() {
    let newSampleType: SampleType = this.inputForm.get('sampleType')?.value;
    let newExplSample: number[] = this.inputForm.get('numSequence')?.value;
    let newFreqDist: { [key: string]: number } = this.inputForm.get('meanDeviation')?.value;
    let newZ: number = this.inputForm.get('valueZInput')?.value;

    let inputData = new Stichprobe(newSampleType, newExplSample, newFreqDist, newZ);
    
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: { fix: true, absolute: [1,2,3,4], inputData }  //Auffang für Daten aus dem Backend
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}