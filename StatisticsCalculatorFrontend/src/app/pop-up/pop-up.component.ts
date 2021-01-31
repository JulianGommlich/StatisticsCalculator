import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  fix: BehaviorSubject<boolean>;
  absolute: number[] = [];
  explicite: number[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {fix: boolean, absolute: number[], explicite?: number[]},
    private router:Router
  ) { 
    this.fix = new BehaviorSubject(data.fix); 
    this.absolute=data.absolute; 
    if(data.explicite){
      this.explicite=data.explicite;
    }  
  }
  getResults(){
    // Create logic to get data
    this.router.navigate(['/results']);;
  }
  
  ngOnInit(): void {
  }

}
