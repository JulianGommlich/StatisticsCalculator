package de.student.dhbwvs.statisticsCalculatorBackend;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class Ergebnisse {

    private Map<Double, Integer> haeufigkeitsverteilung;
    private double[] expliziteStichprobe;
    private double[] quantile;
    private double[] modalwert;
    private double z;
    private double mittelwert;
    private double median;
    private double varianz;
    private double standardabweichung;
    private double mittlereAbweichungZuZ;
    private double giniKoeffizient;

    @JsonCreator
    public Ergebnisse(double z, double[] stichprobe) {
        this.z = z;
        this.expliziteStichprobe = stichprobe;
    }

}
