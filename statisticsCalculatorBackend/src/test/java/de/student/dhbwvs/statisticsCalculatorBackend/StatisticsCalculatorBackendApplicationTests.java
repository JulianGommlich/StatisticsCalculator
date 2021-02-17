package de.student.dhbwvs.statisticsCalculatorBackend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static de.student.dhbwvs.statisticsCalculatorBackend.CalculationsTest.*;

/**
 * This class is for Unittests only. The calculation methods are tested using the test concept created by group 4.
 */

@SpringBootTest
class StatisticsCalculatorBackendApplicationTests {

	@Test
	void contextLoads() {
	}

	double[] W_Optimal = {15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36, 36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98};
	double[] W_Negativ = {-1, -1, -5, -3};
	double[] W_Null= {0};
	double[] W_Einzelwert = {5};
	double[] W_Gleich = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1};
	double Z_Optimal = 25;
	double Z_Negativ = -3;
	double Z_Null = 0;

	/**
	 * This method creates a map from an array..
	 * The test data is only available as a sample. To test calcModal, the sample has to be transformed into a map.
	 * @param stichprobe the sample as an array of doubles
	 * @return the data as a map
	 */
	public static Map<Double,Integer> freqDistribution(double[] stichprobe) {

		Map<Double, Integer> freqDist = new HashMap<>();

		for (double i : stichprobe) {
			if (freqDist.containsKey(i)){
				freqDist.replace(i, freqDist.get(i) + 1);
			} else {
				freqDist.put(i, 1);
			}
		}

		return freqDist.entrySet()
				.stream()
				.sorted(Map.Entry.<Double, Integer>comparingByKey())
				.collect(Collectors.toMap(
						Map.Entry::getKey,
						Map.Entry::getValue,
						(oldValue, newValue) -> oldValue, LinkedHashMap::new));
	}

	/**
	 * Tests for the calculation of the mode
	 */
	@Test
	public void testCalcModal(){
		double[] result_optimal = {23,27};
		double[] result_negativ = {-1};
		double[] result_null = {0};
		double[] result_einzelwert = {5};
		double[] result_gleich = {1};

		Assertions.assertArrayEquals(result_optimal,calcModal(freqDistribution(W_Optimal)));
		Assertions.assertArrayEquals(result_negativ,calcModal(freqDistribution(W_Negativ)));
		Assertions.assertArrayEquals(result_null,calcModal(freqDistribution(W_Null)));
		Assertions.assertArrayEquals(result_einzelwert,calcModal(freqDistribution(W_Einzelwert)));
		Assertions.assertArrayEquals(result_gleich,calcModal(freqDistribution(W_Gleich)));
	}

	/**
	 * Tests for the calculation of the average
	 */
	@Test
	public void testCalcAverage(){
		double result_optimal = 33.62;
		double result_negativ = -2.5;
		double result_null = 0;
		double result_einzelwert = 5;
		double result_gleich = 1;

		Assertions.assertEquals(result_optimal, calcAverage(W_Optimal));
		Assertions.assertEquals(result_negativ, calcAverage(W_Negativ));
		Assertions.assertEquals(result_null, calcAverage(W_Null));
		Assertions.assertEquals(result_einzelwert, calcAverage(W_Einzelwert));
		Assertions.assertEquals(result_gleich, calcAverage(W_Gleich));
	}

	/**
	 * Tests for the calculation of the median
	 */
	@Test
	public void testCalcMedian(){
		double result_optimal = 25;
		double result_negativ = -2;
		double result_null = 0;
		double result_einzelwert = 5;
		double result_gleich = 1;

		Assertions.assertEquals(result_optimal, calcMedian(W_Optimal));
		Assertions.assertEquals(result_negativ, calcMedian(W_Negativ));
		Assertions.assertEquals(result_null, calcMedian(W_Null));
		Assertions.assertEquals(result_einzelwert, calcMedian(W_Einzelwert));
		Assertions.assertEquals(result_gleich, calcMedian(W_Gleich));
	}

	/**
	 * Tests for the calculation of the quantiles
	 */
	@Test
	public void testCalcQuantile(){

		double[] percentages = {0.05, 0.1, 0.25, 0.75, 0.9, 0.95};

		double[] result_optimal = {15, 18, 22, 36, 72, 98};
		double[] result_negativ = {-5, -5, -3, -1, -1, -1};
		double[] result_null = {0, 0, 0, 0, 0, 0};
		double[] result_einzelwert = {5, 5, 5, 5, 5, 5};
		double[] result_gleich = {1, 1, 1, 1, 1, 1};

		double[] quantilen_optimal = new double[6];
		for (int i=0; i<quantilen_optimal.length; i++){
			quantilen_optimal[i] = calcQuantile(percentages[i], W_Optimal);
		}

		double[] quantilen_negativ = new double[6];
		for (int i=0; i<quantilen_negativ.length; i++){
			quantilen_negativ[i] = calcQuantile(percentages[i], W_Negativ);
		}

		double[] quantilen_null = new double[6];
		for (int i=0; i<quantilen_null.length; i++){
			quantilen_null[i] = calcQuantile(percentages[i], W_Null);
		}

		double[] quantilen_einzelwert = new double[6];
		for (int i=0; i<quantilen_einzelwert.length; i++){
			quantilen_einzelwert[i] = calcQuantile(percentages[i], W_Einzelwert);
		}

		double[] quantilen_gleich = new double[6];
		for (int i=0; i<quantilen_gleich.length; i++){
			quantilen_gleich[i] = calcQuantile(percentages[i], W_Gleich);
		}

		Assertions.assertArrayEquals(result_optimal, quantilen_optimal);
		Assertions.assertArrayEquals(result_negativ, quantilen_negativ);
		Assertions.assertArrayEquals(result_null, quantilen_null);
		Assertions.assertArrayEquals(result_einzelwert, quantilen_einzelwert);
		Assertions.assertArrayEquals(result_gleich, quantilen_gleich);
	}

	/**
	 * Tests for the calculation of the variance
	 */
	@Test
	public void testCalcVariance(){
		double result_optimal = 431.1;
		double result_negativ = 2.75;
		double result_null = 0;
		double result_einzelwert = 0;
		double result_gleich = 0;

		Assertions.assertEquals(result_optimal, calcVariance(W_Optimal));
		Assertions.assertEquals(result_negativ, calcVariance(W_Negativ));
		Assertions.assertEquals(result_null, calcVariance(W_Null));
		Assertions.assertEquals(result_einzelwert, calcVariance(W_Einzelwert));
		Assertions.assertEquals(result_gleich, calcVariance(W_Gleich));
	}

	/**
	 * Tests for the calculation of the standard deviation
	 */
	@Test
	public void testCalcStandardDeviation(){
		double var_optimal = 438.66;
		double var_negativ = 3.67;
		double var_null = 0;
		double var_einzelwert = 5;
		double var_gleich = 0;

		double result_optimal = 20.94;
		double result_negativ = 1.92;
		double result_null = 0;
		double result_einzelwert = 2.24;
		double result_gleich = 0;

		Assertions.assertEquals(result_optimal, calcStandardDeviation(var_optimal));
		Assertions.assertEquals(result_negativ, calcStandardDeviation(var_negativ));
		Assertions.assertEquals(result_null, calcStandardDeviation(var_null));
		Assertions.assertEquals(result_einzelwert, calcStandardDeviation(var_einzelwert));
		Assertions.assertEquals(result_gleich, calcStandardDeviation(var_gleich));
	}

	/**
	 * Tests for the calculation of the average deviation to z
	 */
	@Test
	public void testCalcAverageDeviation(){

		double result_optimal_Z_optimal = 12.9;
		double result_optimal_Z_negativ = 36.62;
		double result_optimal_Z_null = 33.62;

		double result_negativ_Z_optimal = 27.5;
		double result_negativ_Z_negativ = 1.5;
		double result_negativ_Z_null = 2.5;

		double result_null_Z_optimal = 25;
		double result_null_Z_negativ = 3;
		double result_null_Z_null = 0;

		double result_einzelwert_Z_optimal = 20;
		double result_einzelwert_Z_negativ = 8;
		double result_einzelwert_Z_null = 5;

		double result_gleich_Z_optimal = 24;
		double result_gleich_Z_negativ = 4;
		double result_gleich_Z_null = 1;


		Assertions.assertEquals(result_optimal_Z_optimal, calcAverageDeviation(W_Optimal, Z_Optimal));
		Assertions.assertEquals(result_optimal_Z_negativ, calcAverageDeviation(W_Optimal, Z_Negativ));
		Assertions.assertEquals(result_optimal_Z_null, calcAverageDeviation(W_Optimal, Z_Null));

		Assertions.assertEquals(result_negativ_Z_optimal, calcAverageDeviation(W_Negativ, Z_Optimal));
		Assertions.assertEquals(result_negativ_Z_negativ, calcAverageDeviation(W_Negativ, Z_Negativ));
		Assertions.assertEquals(result_negativ_Z_null, calcAverageDeviation(W_Negativ, Z_Null));

		Assertions.assertEquals(result_null_Z_optimal, calcAverageDeviation(W_Null, Z_Optimal));
		Assertions.assertEquals(result_null_Z_negativ, calcAverageDeviation(W_Null, Z_Negativ));
		Assertions.assertEquals(result_null_Z_null, calcAverageDeviation(W_Null, Z_Null));

		Assertions.assertEquals(result_einzelwert_Z_optimal, calcAverageDeviation(W_Einzelwert, Z_Optimal));
		Assertions.assertEquals(result_einzelwert_Z_negativ, calcAverageDeviation(W_Einzelwert, Z_Negativ));
		Assertions.assertEquals(result_einzelwert_Z_null, calcAverageDeviation(W_Einzelwert, Z_Null));

		Assertions.assertEquals(result_gleich_Z_optimal, calcAverageDeviation(W_Gleich, Z_Optimal));
		Assertions.assertEquals(result_gleich_Z_negativ, calcAverageDeviation(W_Gleich, Z_Negativ));
		Assertions.assertEquals(result_gleich_Z_null, calcAverageDeviation(W_Gleich, Z_Null));

	}

	/**
	 * Tests for the calculation of the gini coefficient
	 */
	@Test
	public void testCalcGiniCoefficient(){

		double result_optimal = 0.29;
		double result_negativ = -1;
		double result_null = -1;
		double result_einzelwert = 0;
		double result_gleich = 0;

		Assertions.assertEquals(result_optimal, calcGiniCoefficient(W_Optimal));
		Assertions.assertEquals(result_negativ, calcGiniCoefficient(W_Negativ));
		Assertions.assertEquals(result_null, calcGiniCoefficient(W_Null));
		Assertions.assertEquals(result_einzelwert, calcGiniCoefficient(W_Einzelwert));
		Assertions.assertEquals(result_gleich, calcGiniCoefficient(W_Gleich));
	}
}
