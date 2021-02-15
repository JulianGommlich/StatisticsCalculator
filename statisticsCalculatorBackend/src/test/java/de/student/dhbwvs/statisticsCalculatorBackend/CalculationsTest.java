package de.student.dhbwvs.statisticsCalculatorBackend;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

public class CalculationsTest {

    /**
     * limitDecimals, in eigene Klasse auslagern????
     * @param value als double
     * @return b als double, auf zwei Nachkommastellen gerundet
     */

    public static double limitDecimals(double value){
        BigDecimal b = BigDecimal.valueOf(value);
        b = b.setScale(2, RoundingMode.HALF_UP);
        return b.doubleValue();
    }

    /** calcModal übernimmt die Map aus freqDistribution, durchsucht diese nach dem höchsten value und gibt eine List mit allen keys zurück,
     *  die den entsprechenden value haben
     **/
    public static double[] calcModal(Map<Double,Integer> freqDist) {

        List<Double> modal = new ArrayList<>();

        //durchsuche die map nach dem höchsten value, weise diesen der Variablen highestValue zu
        int highestValue = 0;

        for (int i : freqDist.values()) {
            highestValue = Math.max(i, highestValue);
        }

        //durchsuche die map nach jedem key, bei dem highestValue == value; füge diese keys der List hinzu
        for (double j : freqDist.keySet()){
            if (highestValue == freqDist.get(j)){
                modal.add(j);
            }
        }

        Collections.sort(modal);

        return modal.stream().mapToDouble(d -> d).toArray();
    }

    // Function takes an array as input
    public static double calcAverage(double[] values) {
        /*
          Berechnung des Durchschnitts eines Arrays
          Input: Array mit double-Werten
          Return: Durchschnitt als double-Wert
         */
        double sum = 0;

        // Alle Elemente des Arrays in der Variable sum summieren
        for (double value : values) {
            sum += value;
        }

        // Der Durchschnitt ist die Summe geteilt durch die Anzahl an Werten
        return limitDecimals(sum / values.length);
    }

    // calcMedian berechnet den Median eines Arrays
    public static double calcMedian(double[] values){

        //Benenne einen Parameter für den späteren Median
        double median;

        //Bestimme die Länge des Arrays
        int count = values.length;

        //Sortiere das Array aufsteigend
        Arrays.sort(values);

        //Prüfe ob es sich um einen gerade oder um eine ungerade Array handelt.
        if(count % 2 == 0){
            //Berechne den Median für einen gerade Array und speichere den Wert unter dem Parameter "median"
            median = ((values[(count/2)-1] + values[((count/2))])/2);
        } else {
            //Berechne den Median für einen ungerade Array und speichere den Wert unter dem Parameter "median"
            median = values[((count+1)/2)-1];

        }
        //Gebe den Median zurück
        return limitDecimals(median);
    }

    public static double calcQuantile(double percentage, double[] values){
        /* Quantile berechnen
          Input: array mit double Werten und Prozentzahl im double Format
          Return: Das berechnete Quantil für die entsprechende Prozentzahl
         */
        double quantile;
        Arrays.sort(values);
        // Länge des Arrays
        int count = values.length;
        //Berechnung von Anzahl*Prozentzahl
        double np = (count*percentage);
        //Abrunden der Zahl
        int round = (int)(Math.floor(np));
        //Prüfe ob np ganzzahlig ist
        if((np%1) == 0 ){
            //Wende die Formel für ganzzahliges np an
            quantile = (0.5) * (values[round-1] + values[(round)]);
        } else {
            //Wende die Formel für gebrochenes np an
            quantile = values[round];
        }
        //Gebe das Quantil zurück
        return limitDecimals(quantile);
    }

    public static double calcVariance(double[] values) {
        /* Varianz berechnen
          Input: array mit double Werten
          Return: Die berechnete Varianz als double
         */

        // Den Durchschnitt berechnen lassen
        double average = calcAverage(values);

        // Variable Varianz deklarieren
        double variance = 0;

        for (double value : values) {
            // Von jedem Wert aus dem Array values muss der Durchschnitt des Array abgezogen werden
            // das Ergebnis wird dann mit 2 potenziert
            variance += Math.pow(value - average, 2);
        }

        // Der return-Wert ist die Varianz
        variance /= values.length;

        return limitDecimals(variance);
    }

    public static double calcStandardDeviation(double variance) {
        /* Standardabweichung berechnen
          Input: berechnete Varianz als double
          Return: Die berechnete Standardabweichung als double
         */
        // Die Standardabweichung ist die Quadratwurzel der Varianz
        return limitDecimals(Math.sqrt(variance));
    }

    /* Mittlere absolute Abweichung zu einem Wert z:
      Input: Stichprobe als double-Array, Wert z als double
      Vorgehen: für jeden Stichprobenwert Betrag von Stichprobenwert - z addieren,
               durch die Anzahl der Werte dividieren
      Return: mittlere absolute Abweichung zu z als double
     */
    public static double calcAverageDeviation(double[] stichprobe, double z){
        double sum = 0;

        for (double i : stichprobe) {
            sum += Math.abs(i - z);
        }
        return limitDecimals(sum/stichprobe.length);
    }

    public static double calcGiniCoefficient(double[] values){
        /* Gini Koeffizient berechnen berechnen
          Input: Array mit double Werten
          Return: Den berechneten Gini Koeffizient als double
         */
        double gini;
        Arrays.sort(values);
        double height = 0;
        double area = 0;
        double gms = 0;
        for(double calc : values){
            gms += calc;
        }
        if(values[0] < 0 || gms < 0){
            return -1;
        } else {
            for (double value : values) {
                height += value;
                area += (height - value / 2);
            }
            double fair_area = height * values.length / 2;
            if (fair_area == 0){
                return -1;
            }
            else {
                gini = (fair_area - area) / fair_area;
                return limitDecimals(gini);
            }
        }
    }
}

