package de.student.dhbwvs.statisticsCalculatorBackend;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**This class produces an object that functions as a container for both the transmitted data as well as the
 * results of the different calculations.
 * Once the calculations are complete, the object gets sent to the frontend
 *
 * The @JsonCreator annotation makes sure the constructor takes the values for sampleType, stichprobe,
 * hauefigkeitsverteilung and z right out of the JSON file that was transmitted by the frontend.
 *
 */

@Getter
@Setter
public class Ergebnisse {

    private String sampleType;
    private double[] expliziteStichprobe;
    private Map<Double, Integer> haeufigkeitsverteilung;
    private double z;
    private double[] modalwert;
    private double mittelwert;
    private double median;
    private double[] quantile;
    private double varianz;
    private double standardabweichung;
    private double mittlereAbweichungZuZ;
    private double giniKoeffizient;

    @JsonCreator
    public Ergebnisse(String sampleType, double[] stichprobe, Map<Double, Integer> haeufigkeitsverteilung, double z) {
        this.sampleType = sampleType;
        this.expliziteStichprobe = stichprobe;
        this.haeufigkeitsverteilung = haeufigkeitsverteilung;
        this.z = z;
    }

}
