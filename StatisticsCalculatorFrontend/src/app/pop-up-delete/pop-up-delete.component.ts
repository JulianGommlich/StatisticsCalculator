import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pop-up-delete',
    templateUrl: './pop-up-delete.component.html',
    styleUrls: ['./pop-up-delete.component.css', '../app.component.css']
})
export class PopUpDeleteComponent {

    constructor(private router: Router) { }

    /**
     * Leert sämtliche Eingabefelder, indem die Seite ohne Daten neugeladen wird.
     */
    deleteFormInput(): void {
        // Kleiner Hack: Es wird kurz auf eine andere Seite navigiert, die aber nicht angezeigt wird
        this.router.navigateByUrl('/results', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/calculator']);
        });
    }
}
