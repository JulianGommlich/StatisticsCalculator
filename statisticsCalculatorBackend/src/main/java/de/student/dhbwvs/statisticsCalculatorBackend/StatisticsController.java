package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {


    @PostMapping
    public Ergebnisse neuesErgebnis(@RequestBody Ergebnisse ergebnis) {

        //Ändern:

        ergebnis.setHaeufigkeitsverteilung(calculations.freqDistribution(ergebnis.getExpliziteStichprobe()));

        ergebnis.setModalwert(calculations.calcModal(ergebnis.getHaeufigkeitsverteilung()));

        /** ES FEHLEN:

        ergebnis.setQuantile();
        ergebnis.setGiniKoeffizient();

         **/

        //Fertig:

        ergebnis.setMedian(calculations.calcMedian(ergebnis.getExpliziteStichprobe()));

        ergebnis.setMittelwert(calculations.calcAverage(ergebnis.getExpliziteStichprobe()));

        ergebnis.setVarianz(calculations.calcVariance(ergebnis.getExpliziteStichprobe()));

        ergebnis.setStandardabweichung(calculations.calcStandardDeviation(ergebnis.getVarianz()));

        ergebnis.setMittlereAbweichungZuZ(calculations.calcAverageDeviation(ergebnis.getExpliziteStichprobe(), ergebnis.getZ()));

        return ergebnis;

    }
}

