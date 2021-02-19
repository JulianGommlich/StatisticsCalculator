import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  /**
   * Bei Klick auf den Titel wird der Anwender zurück auf die Eingabeseite geführt.
   */
  backToCalculator(): void {
    this.router.navigate(['/calculator']);
  }
}


