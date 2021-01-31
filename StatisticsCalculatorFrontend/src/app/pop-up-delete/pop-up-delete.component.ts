import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pop-up-delete',
    templateUrl: './pop-up-delete.component.html'
})
export class PopUpDeleteComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    /**
     * Leert sämtliche Eingabefelder, indem die Seite ohne Daten neugeladen wird.
     */
    deleteFormInput() {
        this.router.navigate(['/calculator', {}]);
    }
}
