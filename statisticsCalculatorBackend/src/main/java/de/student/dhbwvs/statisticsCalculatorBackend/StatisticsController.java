package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {

    private final Ergebnisse ergebnis = new Ergebnisse();

    @PostMapping
    public Ergebnisse neuesErgebnis(@RequestBody Input input) {

        //Ändern:
        ergebnis.setExpliziteStichprobe(input.getStichprobe());

        ergebnis.setHaeufigkeitsverteilung(calculations.freqDistribution(input.getStichprobe()));

        ergebnis.setModalwert(calculations.calcModal(ergebnis.getHaeufigkeitsverteilung()));

        /** ES FEHLEN:

        ergebnis.setQuantile();
        ergebnis.setGiniKoeffizient();

         **/

        //Fertig:

        ergebnis.setMedian(calculations.calcMedian(input.getStichprobe()));

        ergebnis.setMittelwert(calculations.calcAverage(input.getStichprobe()));

        ergebnis.setVarianz(calculations.calcVariance(input.getStichprobe()));

        ergebnis.setStandardabweichung(calculations.calcStandardDeviation(ergebnis.getVarianz()));

        ergebnis.setMittlereAbweichungZuZ(calculations.calcAverageDeviation(input.getStichprobe(), input.getZ()));


        return ergebnis;

    }
}

