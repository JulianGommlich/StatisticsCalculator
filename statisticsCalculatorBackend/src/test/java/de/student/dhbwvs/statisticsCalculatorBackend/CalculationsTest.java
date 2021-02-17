package de.student.dhbwvs.statisticsCalculatorBackend;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

/**
 * This class is an exact copy of the Calculations class. It is used for testing purposes to strictly separate the tests
 * from the main application.
 */

public class CalculationsTest {

    /**
     * This helper method limits the number of decimals of the results produced by the calculation methods.
     * @param value This is the result of a calculation and the only parameter for the limitDecimals method
     * @return double limited to two decimals
     */
    public static double limitDecimals(double value){

        BigDecimal b = BigDecimal.valueOf(value);

        b = b.setScale(2, RoundingMode.HALF_UP);

        return b.doubleValue();
    }

    /**
     * This method searches for the highest value in the map haeufigkeitsverteilung and returns an array of all the keys with said value.
     * As the amount of modes is unknown in the beginning, they are temporarily stored in a resizeable ArrayList.
     * @param freqDist The frequency distribution transmitted by the frontend
     * @return array of the 1 to 30 modes as doubles
     */
    public static double[] calcModal(Map<Double,Integer> freqDist) {

        List<Double> modal = new ArrayList<>();
        int highestValue = 0;

        for (int i : freqDist.values()) {
            highestValue = Math.max(i, highestValue);
        }

        for (double j : freqDist.keySet()){
            if (highestValue == freqDist.get(j)){
                modal.add(j);
            }
        }

        Collections.sort(modal);

        return modal.stream().mapToDouble(d -> d).toArray();
    }

    /**
     * This method adds up all values inside the array "values" and divides them through the length of the array
     * @param values The Array transmitted by the frontend
     * @return value of calculated Average
     **/
    public static double calcAverage(double[] values) {

        double sum = 0;

        for (double value : values) {
            sum += value;
        }

        return limitDecimals(sum / values.length);
    }

    /**
     * This method searches for the value, which is in the middle of the array.
     * @param values The Array transmitted by the frontend
     * @return value of the calculated median
     **/
    public static double calcMedian(double[] values){

        double median;
        int count = values.length;

        Arrays.sort(values);

        if(count % 2 == 0){
            median = ((values[(count/2)-1] + values[((count/2))])/2);
        } else {
            median = values[((count+1)/2)-1];

        }
        return limitDecimals(median);
    }

    /**
     * This method calculates the quantiles for a given percentage out of the array values
     * @param values The array transmitted by the frontend
     * @param percentage The respective percentage
     * @return value of the calculated quantile
     **/
    public static double calcQuantile(double percentage, double[] values){

        double quantile;

        Arrays.sort(values);

        int count = values.length;

        double np = (count*percentage);

        int round = (int)(Math.floor(np));

        if((np%2) == 0 ){
            quantile = (0.5) * (values[round-1] + values[(round)]);
        } else {
            quantile = values[round];
        }

        return limitDecimals(quantile);
    }

    /**
     * This method calculates the variance of the sample. It calls the calcAverage method to get the average of the array.
     * @param values the sample transmitted by the frontend
     * @return the variance as a double
     */

    public static double calcVariance(double[] values) {

        double average = calcAverage(values);

        double variance = 0;

        for (double value : values) {
            variance += Math.pow(value - average, 2);
        }

        variance /= values.length;

        return limitDecimals(variance);
    }

    /**
     * This method calculates the average deviation, which is the square root of the variance.
     * @param variance as returned by calcVariance
     * @return the standard deviation as a double
     */
    public static double calcStandardDeviation(double variance) {
        return limitDecimals(Math.sqrt(variance));
    }

    /**
     * This method calculates the average deviation of the sample to a user given value z.
     @param stichprobe The first parameter is the sample as an array of doubles
     @param z The second parameter is the value z as a double
     @return The calculated average deviation as a double
     */
    public static double calcAverageDeviation(double[] stichprobe, double z){
        double sum = 0;

        for (double i : stichprobe) {
            sum += Math.abs(i - z);
        }
        return limitDecimals(sum/stichprobe.length);
    }

    /**
     * This method calculates the gini coefficient for the array values
     * @param values The array transmitted by the frontend
     * @return the value of the calculated gini coefficient or -1 in case of an error
     **/
    public static double calcGiniCoefficient(double[] values){

        double gini;
        Arrays.sort(values);
        double height = 0;
        double area = 0;
        double gms = 0;
        for(double calc : values){
            gms += calc;
        }
        if(values[0] < 0 || gms <= 0){
            return -1;
        } else {
            for (double value : values) {
                height += value;
                area += (height - value / 2);
            }
            double fair_area = height * values.length / 2;
            gini = (fair_area - area) / fair_area;
            return limitDecimals(gini);
        }
    }
}

