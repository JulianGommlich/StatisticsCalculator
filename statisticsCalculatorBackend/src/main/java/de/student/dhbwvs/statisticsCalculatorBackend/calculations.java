package de.student.dhbwvs.statisticsCalculatorBackend;

import java.util.*;

public class calculations {

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
        /** Quantile berechnen
         * Input: array mit double Werten und Prozentzahl im double Format
         * Return: Das berechnete Quantil für die entsprechende Prozentzahl
         **/
        double quantile = 0;
        // Länge des Arrays
        int count = values.length;
        //Berechnung von Anzahl*Prozentzahl
        double np = (count*percentage);
        //Abrunden der Zahl
        int round = (int)(Math.floor(np));
        //Prüfe ob np ganzzahlig ist
        if((np%2) == 0 ){
            //Wende die Formel für geradzahliges np an
            quantile = (1/2) * (values[round] + values[(round + 1)]);
        } else {
            //Wende die Formel für ungerades np an
            quantile = values[round];
        }
        //Gebe das Quantil zurück
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

    public static double calcGiniCoefficient(double[] values){
        /** Gini Koeffizient berechnen berechnen
         * Input: Array mit double Werten
         * Return: Den berechneten Gini Koeffizient als double
         **/
        double gini = 0;
        Arrays.sort(values);
        double height = 0;
        double area = 0;
        for(int i = 0; i < values.length; i++){
            height += values[i];
            area += (height - values[i] / 2);
        }
        double fair_area = height * values.length / 2;
        gini = (fair_area - area) / fair_area;
        return gini;
    }


}
