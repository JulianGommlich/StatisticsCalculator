import { Component, OnInit } from '@angular/core';
import { ApiEndpointService } from '../api-endpoint.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpInvalidComponent } from '../pop-up-invalid/pop-up-invalid.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})

export class View1Component {
  // Response vom Backend
  result: any;

  constructor(public dialog: MatDialog, private router: Router, public apiEndpoint: ApiEndpointService) {
  }

  onSubmit(){
    this.router.navigate(['/calculator'])
  }

  openDialog() {
    //console.log("test");
    var fixData = null;
    var validationTrue = this.checkValidation();
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    if (validationTrue == true){
      if (expl.checked == true && abs.checked == false){
        fixData = true;
      } else if (abs.checked == true && expl.checked == false){
        fixData = false;
      } 
      const dialogRef = this.dialog.open(PopUpComponent, {
      data: { fix: fixData, absolute: [1,2,3,4] }})  //Auffang für Daten aus dem Backend
    
    } else {
      const dialogRef = this.dialog.open(PopUpInvalidComponent, {
        data: {}}) //Auffang für Daten aus dem Backend}
      }            
  }
  checkValidation(){
    var validation;
    const expl = document.getElementById('explSample') as HTMLInputElement;
    const abs = document.getElementById('absSample') as HTMLInputElement;
    const valueZ = document.getElementById('valueZInput') as HTMLInputElement;
    const deviation = document.getElementById('meanDeviation') as HTMLInputElement;
    if (expl.checked == false && abs.checked == false){
      return validation = false;
    } else if(valueZ.value.length == 0){
      return validation = false;      
    } else if(deviation.value.length == 0){
      return validation = false; 
    } else if(this.validateSequence() == false){
      return validation = false;  
    } else {
      return validation = true;
    }
  }
  validateSequence(){
    let numSeq : string = (<HTMLInputElement>document.getElementById("numSequence")).value;   
    var letters = /[A-Za-z]$/;
    
    if (numSeq.length == 0){
      return false
    } else if (numSeq.match(letters)){
      return false
    }
    let splittedSeq: string[] = numSeq.split(";", 100)
    alert (splittedSeq);
  }
}
  

  
    // send sample to API-Endpoint-Service
    //startCalculation(): void {
    // Für STICHPROBENOBJEKT müssen die Daten aus der View eingefügt werden (Issue 16) 
    //this.apiEndpoint.startCalculation(this.STICHPROBENOBJEKT).subscribe(sample => this.result = sample);
    //}
