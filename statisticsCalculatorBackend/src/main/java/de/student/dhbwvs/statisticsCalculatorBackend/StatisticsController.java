package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {

    private static Ergebnisse ergebnisse = new Ergebnisse();


    @GetMapping
    public String getErgebnisse() {
        return "Hallo";
    }

    //empfängt probeweise einen int, weist ihn dem Ergebnis zu und gibt dieses zurück
    @PostMapping
    public Ergebnisse neuesErgebnis(@RequestBody int mittelwert) {
        ergebnisse.setMedian(6.7635);
        ergebnisse.setMittelwert(mittelwert);
        return ergebnisse;
    }
}

