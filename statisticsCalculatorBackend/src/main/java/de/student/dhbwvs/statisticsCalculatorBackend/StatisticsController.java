package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {

    private static Ergebnisse ergebnisse = new Ergebnisse();

    //ich verstehs nicht
    @GetMapping
    public String getErgebnisse() {
        return "Hallo";
    }

    //empfängt einen String und gibt ihn zurück
    @PostMapping
    public Ergebnisse neuesErgebnis(@RequestBody int mittelwert) {
        ergebnisse.setMedian(6.7635);
        ergebnisse.setMittelwert(mittelwert);
        return ergebnisse;
    }
}

