package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {

    @PostMapping
    public Ergebnisse neuesErgebnis(@RequestBody Ergebnisse ergebnis) {

        ergebnis.setModalwert(Calculations.calcModal(ergebnis.getHaeufigkeitsverteilung()));

        ergebnis.setMittelwert(Calculations.calcAverage(ergebnis.getExpliziteStichprobe()));

        ergebnis.setMedian(Calculations.calcMedian(ergebnis.getExpliziteStichprobe()));

        double[] percentages = {0.05, 0.1, 0.25, 0.75, 0.9, 0.95};
        double[] quantilen = new double[6];
        for (int i=0; i<quantilen.length; i++){
            quantilen[i] = Calculations.calcQuantile(percentages[i], ergebnis.getExpliziteStichprobe());
        }
        ergebnis.setQuantile(quantilen);

        ergebnis.setVarianz(Calculations.calcVariance(ergebnis.getExpliziteStichprobe()));

        ergebnis.setStandardabweichung(Calculations.calcStandardDeviation(ergebnis.getVarianz()));

        ergebnis.setMittlereAbweichungZuZ(Calculations.calcAverageDeviation(ergebnis.getExpliziteStichprobe(), ergebnis.getZ()));

        ergebnis.setGiniKoeffizient(Calculations.calcGiniCoefficient(ergebnis.getExpliziteStichprobe()));

        return ergebnis;

    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleAllUncaughtException(
            RuntimeException exception,
            WebRequest request){
        return "Fehlerhafter Input";
    }


}

