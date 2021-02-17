package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

/**
 * This class defines the Controller for the backend application.
 */

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {

    /**
     * This method maps the data from the HTTP POST request and uses a new Ergebnisse object to store them.
     * The data is used in combination with the methods from the Calculation class to set the results as the attributes
     * of the object.
     *
     * @param ergebnis An object of the class Ergebnisse, containing the data from the request body
     * @return ergebnis The same object after the results of the calculations have been assigned to it
     */
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

    /**
     *
     * This method is supposed to catch all exceptions thrown because of incorrect data sent by the frontend
     *
     * @param exception an unchecked exception
     * @param request a web request interceptor
     * @return an error message as a String
     */

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleDataExceptions(
            RuntimeException exception,
            WebRequest request){
        return "Fehlerhafter Input";
    }


}

