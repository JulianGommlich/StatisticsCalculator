import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  fix = false;
  absolute: number[] = [];
  explicite: number[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {fix: boolean, absolute: number[], explicite?: number[]}) { 
    this.fix=data.fix; 
    this.absolute=data.absolute; 
    if(data.explicite){
      this.explicite=data.explicite;
    }  
  }

  ngOnInit(): void {
  }

}
