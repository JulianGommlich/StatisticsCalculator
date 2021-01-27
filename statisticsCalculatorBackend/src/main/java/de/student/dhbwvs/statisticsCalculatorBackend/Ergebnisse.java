package de.student.dhbwvs.statisticsCalculatorBackend;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class Ergebnisse {

    private String sampleType;
    private double[] expliziteStichprobe;
    private Map<Double, Integer> haeufigkeitsverteilung;
    private double z;
    private double[] quantile;
    private double[] modalwert;
    private double mittelwert;
    private double median;
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
