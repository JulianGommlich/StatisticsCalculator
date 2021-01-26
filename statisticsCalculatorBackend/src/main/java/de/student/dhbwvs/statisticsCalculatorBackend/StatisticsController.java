package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {


    @PostMapping
    public Ergebnisse neuesErgebnis(@RequestBody Ergebnisse ergebnis) {

        //Ändern:

        ergebnis.setHaeufigkeitsverteilung(calculations.freqDistribution(ergebnis.getExpliziteStichprobe()));

        ergebnis.setModalwert(calculations.calcModal(ergebnis.getHaeufigkeitsverteilung()));

        //Fertig:
        double[] percentages = {0.05, 0.1, 0.25, 0.75, 0.9, 0.95};
        double[] quantilen = new double[6];
        for (int i=0; i<quantilen.length; i++){
            quantilen[i] = calculations.calcQuantile(percentages[i], ergebnis.getExpliziteStichprobe());
        }
        ergebnis.setQuantile(quantilen);

        ergebnis.setGiniKoeffizient(calculations.calcGiniCoefficient(ergebnis.getExpliziteStichprobe()));

        ergebnis.setMedian(calculations.calcMedian(ergebnis.getExpliziteStichprobe()));

        ergebnis.setMittelwert(calculations.calcAverage(ergebnis.getExpliziteStichprobe()));

        ergebnis.setVarianz(calculations.calcVariance(ergebnis.getExpliziteStichprobe()));

        ergebnis.setStandardabweichung(calculations.calcStandardDeviation(ergebnis.getVarianz()));

        ergebnis.setMittlereAbweichungZuZ(calculations.calcAverageDeviation(ergebnis.getExpliziteStichprobe(), ergebnis.getZ()));

        return ergebnis;

    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleAllUncaughtException(
            RuntimeException exception,
            WebRequest request){
        return "Sie halten sich wohl für sehr schlau, was? Aber nicht mit mir!";
    }


}

