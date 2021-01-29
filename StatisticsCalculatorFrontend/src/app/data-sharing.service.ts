import { Injectable } from '@angular/core';
import { Stichprobe } from '../app/stichprobe';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  sharedStichprobe: object;

  constructor(newSharedStichprobe: object) { 
    this.sharedStichprobe = newSharedStichprobe;
  }
}
