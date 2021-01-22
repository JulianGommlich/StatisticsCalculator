package de.student.dhbwvs.statisticsCalculatorBackend;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class Ergebnisse {

    private Map<Double, Integer> haeufigkeitsverteilung;
    private double[] expliziteStichprobe;
    private double[] quantile;
    private double[] modalwert;
    private double mittelwert;
    private double median;
    private double varianz;
    private double standardabweichung;
    private double mittlereAbweichungZuZ;
    private double giniKoeffizient;


}
