package de.student.dhbwvs.statisticsCalculatorBackend;

import java.util.Map;

public class Ergebnisse {

    private Map<Double, Integer> haeufigkeitsverteilung;
    private double[] expliziteStichprobe;
    private double[] quantile;
    private double modalwert;
    private double mittelwert;
    private double median;
    private double varianz;
    private double standardabweichung;
    private double mittlereAbweichungZuZ;
    private double giniKoeffizient;


    public Ergebnisse(Map<Double, Integer> haeufigkeitsverteilung, double[] expliziteStichprobe, double[] quantile,
                      double modalwert, double mittelwert, double median, double varianz,
                      double standardabweichung, double mittlereAbweichungZuZ, double giniKoeffizient) {

        this.haeufigkeitsverteilung = haeufigkeitsverteilung;
        this.expliziteStichprobe = expliziteStichprobe;
        this.quantile = quantile;
        this.modalwert = modalwert;
        this.mittelwert = mittelwert;
        this.median = median;
        this.varianz = varianz;
        this.standardabweichung = standardabweichung;
        this.mittlereAbweichungZuZ = mittlereAbweichungZuZ;
        this.giniKoeffizient = giniKoeffizient;
    }

    public Map<Double, Integer> getHaeufigkeitsverteilung() {
        return haeufigkeitsverteilung;
    }

    public void setHaeufigkeitsverteilung(Map<Double, Integer> haeufigkeitsverteilung) {
        this.haeufigkeitsverteilung = haeufigkeitsverteilung;
    }

    public double[] getExpliziteStichprobe() {
        return expliziteStichprobe;
    }

    public void setExpliziteStichprobe(double[] expliziteStichprobe) {
        this.expliziteStichprobe = expliziteStichprobe;
    }

    public double[] getQuantile() {
        return quantile;
    }

    public void setQuantile(double[] quantile) {
        this.quantile = quantile;
    }

    public double getModalwert() {
        return modalwert;
    }

    public void setModalwert(double modalwert) {
        this.modalwert = modalwert;
    }

    public double getMittelwert() {
        return mittelwert;
    }

    public void setMittelwert(double mittelwert) {
        this.mittelwert = mittelwert;
    }

    public double getMedian() {
        return median;
    }

    public void setMedian(double median) {
        this.median = median;
    }

    public double getVarianz() {
        return varianz;
    }

    public void setVarianz(double varianz) {
        this.varianz = varianz;
    }

    public double getStandardabweichung() {
        return standardabweichung;
    }

    public void setStandardabweichung(double standardabweichung) {
        this.standardabweichung = standardabweichung;
    }

    public double getMittlereAbweichungZuZ() {
        return mittlereAbweichungZuZ;
    }

    public void setMittlereAbweichungZuZ(double mittlereAbweichungZuZ) {
        this.mittlereAbweichungZuZ = mittlereAbweichungZuZ;
    }

    public double getGiniKoeffizient() {
        return giniKoeffizient;
    }

    public void setGiniKoeffizient(double giniKoeffizient) {
        this.giniKoeffizient = giniKoeffizient;
    }

}
