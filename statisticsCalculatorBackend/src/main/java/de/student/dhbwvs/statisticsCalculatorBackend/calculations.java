package de.student.dhbwvs.statisticsCalculatorBackend;

import java.util.*;
import java.util.stream.Collectors;

public class calculations {

    /** freqDistribution übernimmt die Stichprobe als double-Array und gibt eine sortierte Map zurück, mit den einzelnen Werten der Stichprobe
     *  als keys in Form double und ihrer jeweiligen Häufigkeit als values in der Form Integer
     **/
    public static Map<Double,Integer> freqDistribution(double[] stichprobe) {

        Map<Double, Integer> freqDist = new HashMap<>();

        //für jedes double im Array wird ein neuer key angelegt, falls noch nicht vorhanden, oder der value(die Anzahl) um eins erhöht:
        for (double i : stichprobe) {

            if (freqDist.containsKey(i)){
                freqDist.replace(i, freqDist.get(i) + 1);
            } else {
                freqDist.put(i, 1);
            }
        }

        //Sortiervorgang aufsteigend
        return freqDist.entrySet()
                .stream()
                .sorted(Map.Entry.<Double, Integer>comparingByKey())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }


    // exp_sample übernimmt die Häufigkeitsverteilung als Map und gibt eine aufsteigend sortierte explizite Stichprobe als double-Array zurück
    public static double[] expSample(Map<Double,Integer> freqDist) {

        ArrayList<Double> exp_sample = new ArrayList<>();

        for (double i : freqDist.keySet()) {
            for(int j = freqDist.get(i); j > 0; j--){
                exp_sample.add(i);
            }
        }

        Collections.sort(exp_sample);

        return exp_sample.stream().mapToDouble(d -> d).toArray();
    }


    /** calcModal übernimmt die Map aus freqDistribution, durchsucht diese nach dem höchsten value und gibt eine List mit allen keys zurück,
     *  die den entsprechenden value haben
     **/
    public static double[] calcModal(Map<Double,Integer> freqDist) {
    
        List<Double> modal = new ArrayList<>();
        
        //durchsuche die map nach dem höchsten value, weise diesen der Variablen highestValue zu
        int highestValue = 0;
        
        for (int i : freqDist.values()) {
            highestValue = i > highestValue ? i : highestValue;
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


    // calcMedian berechnet den Median eines Arrays
    public static double calcMedian(double[] values){
    
        //Benenne einen Parameter für den späteren Median
        double median = 0;
        
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
        return median;
    }


    // Function takes an array as input
    public static double calcAverage(double[] values) {
        /**
         * Berechnung des Durchschnitts eines Arrays
         * Input: Array mit double-Werten
         * Return: Durchschnitt als double-Wert
         **/

        double sum = 0;

        // Alle Elemente des Arrays in der Variable sum summieren
        for(int i=0; i<values.length; i++ ) {
            sum += values[i];
        }

        // Der Durchschnitt ist die Summe geteilt durch die Anzahl an Werten
        double average = sum / values.length;

        return average;
    }


    public static double calcVariance(double[] values) {
        /** Varianz berechnen
         * Input: array mit double Werten
         * Return: Die berechnete Varianz als double
         **/

        // Den Durchschnitt berechnen lassen
        double average = calcAverage(values);

        // Variable Varianz deklarieren
        double variance = 0;

        for (int i = 0; i < values.length; i++) {
            // Von jedem Wert aus dem Array values muss der Durchschnitt des Array abgezogen werden
            // das Ergebnis wird dann mit 2 potenziert
            variance += Math.pow(values[i] - average, 2);
        }

        // Der return-Wert ist die Varianz
        variance /= values.length;

        return variance;
    }

    public static double calcQuantile(double percentage, double[] values){
        double quantile = 0;
        int count = values.length;
        double np = (count*percentage);
        int round = (int)(Math.floor(np));
        if((np%2) == 0 ){
            quantile = (1/2) * (values[round] + values[(round + 1)]);
        } else {
            quantile = values[round];
        }
        return quantile;
    }


    public static double calcStandardDeviation(double variance) {
        /** Standardabweichung berechnen
         * Input: berechnete Varianz als double
         * Return: Die berechnete Standardabweichung als double
         **/
        // Die Standardabweichung ist die Quadratwurzel der Varianz
        double stdDev = Math.sqrt(variance);
        return stdDev;
    }

    /**Mittlere absolute Abweichung zu einem Wert z:
     * Input: Stichprobe als double-Array, Wert z als double
     * Vorgehen: für jeden Stichprobenwert Betrag von Stichprobenwert - z addieren,
     *          durch die Anzahl der Werte dividieren
     * Return: mittlere absolute Abweichung zu z als double
     */
    public static double calcAverageDeviation(double[] stichprobe, double z){
        double sum = 0;

        for (double i : stichprobe) {
            sum += Math.abs(i - z);
        }
        return sum/stichprobe.length;
    }

    //Gini-Koeffizient


}
