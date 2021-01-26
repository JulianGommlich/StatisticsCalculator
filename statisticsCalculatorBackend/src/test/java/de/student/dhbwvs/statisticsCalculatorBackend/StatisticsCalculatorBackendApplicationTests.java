package de.student.dhbwvs.statisticsCalculatorBackend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.LinkedHashMap;
import java.util.Map;

import static de.student.dhbwvs.statisticsCalculatorBackend.calculations.*;


@SpringBootTest
class StatisticsCalculatorBackendApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	public void testSampleToDistribution() {

		Map<Double, Integer> result1 = new LinkedHashMap<>();
		result1.put(-4.5, 1);
		result1.put(1.0, 2);
		result1.put(2.0, 1);
		result1.put(2.4, 3);
		result1.put(3.4, 1);
		result1.put(4.0, 3);
		result1.put(6.0, 1);
		result1.put(7.92, 1);
		result1.put(10.6, 1);

		double[] array1 = {2.4, 3.4, 1.0, 6, 1, 2, 10.6, 7.92, -4.5, 2.4, 2.4, 4, 4, 4};

		Assertions.assertEquals(result1, freqDistribution(array1));
	}

	@Test
	public void testDistributionToSample() {

		double[] result = {-4.5, 1, 1, 2, 2.4, 2.4, 2.4, 3.4, 4, 4, 4, 6, 7.92, 10.6};

		Map<Double, Integer> map = new LinkedHashMap<>();
		map.put(-4.5, 1);
		map.put(1.0, 2);
		map.put(2.0, 1);
		map.put(2.4, 3);
		map.put(3.4, 1);
		map.put(4.0, 3);
		map.put(6.0, 1);
		map.put(7.92, 1);
		map.put(10.6, 1);

		double[] method_result = expSample(map);

		Assertions.assertArrayEquals(result,method_result);

	}

	// Test for calculating the modalvalue
	@Test
	public void testcalcModal(){
		double[] result1 = {2.4, 4.0};
		double[] result2 = {3.0};
		double[] array1 = {2.4, 3.4, 1.0, 6, 1, 2, 10.6, 7.92, -4.5, 2.4, 2.4, 4, 4, 4};
		double[] array2 = {5, 5, 4, 4, 3, 3, 3, 2, 2, 1};

		Assertions.assertArrayEquals(result1,calcModal(freqDistribution(array1)));
		Assertions.assertArrayEquals(result2,calcModal(freqDistribution(array2)));
	}

	// Test fpr calculating the median
	@Test
	public void testcalcMedian(){
		double result1 = 2.5;
		double result2 = 3;
		double[] test1 = {1,1,2,2,3,3,4,4};
		double[] test2 = {5,5,4,4,3,3,2,2,1};

		Assertions.assertEquals(result1, calcMedian(test1));
		Assertions.assertEquals(result2, calcMedian(test2));
	}

	// Test for calculating the average
	@Test
	public void testcalcAverage(){
		double result1 = 2.5;
		double result2 = 3.25;
		double[] testArray1 = {1, 1, 2, 2, 3, 3, 4, 4};
		double[] testArray2 = {5, 5, 4, 4, 3, 2, 2, 1};

		Assertions.assertEquals(result1, calcAverage(testArray1));
		Assertions.assertEquals(result2, calcAverage(testArray2));
	}

	//Test for calculating the average deviation to z
	@Test
	public void testcalcAverageDeviation(){

		double[] array1 = {2, 2, 3, 4, 14};
		double[] array2 = {2.4, 3.4, 1.0, 6, 1, 2, 10.6, 7.92, -4.5, 2.4, 2.4, 4, 4, 4};
		double z1 = 2;
		double z2 = 2.974;
		double result1 = 3.0;
		double result2 = 2.3728571428571428;


		Assertions.assertEquals(result1, calcAverageDeviation(array1, z1));
		Assertions.assertEquals(result2, calcAverageDeviation(array2, z2));
	}
	
	@Test
	public void testQuantile(){

		double percentage1 = 0.05;
		double percentage2 = 0.1;
		double percentage3 = 0.25;
		double percentage4 = 0.75;
		double percentage5 = 0.9;
		double percentage6 = 0.95;
		double[] array1 = {15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36, 36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98};
		double ergebnis1 = 15;
		double ergebnis2 = 18;
		double ergebnis3 = 22;
		double ergebnis4 = 36;
		double ergebnis5 = 72;
		double ergebnis6 = 98;
		Assertions.assertEquals(ergebnis1, calcQuantile(percentage1, array1));
		Assertions.assertEquals(ergebnis2, calcQuantile(percentage2, array1));
		Assertions.assertEquals(ergebnis3, calcQuantile(percentage3, array1));
		Assertions.assertEquals(ergebnis4, calcQuantile(percentage4, array1));
		Assertions.assertEquals(ergebnis5, calcQuantile(percentage5, array1));
		Assertions.assertEquals(ergebnis6, calcQuantile(percentage6, array1));

	}

	@Test
	public void testCalcGiniCoefficient(){

		double[] array1 = {15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36, 36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98};
		double ergebnis1 = 0.29;
		double[] array2 = {15, 18, 20,65, 24, 1, 99};
		double ergebnis2 = 0.4722550177095632;

		Assertions.assertEquals(ergebnis2, calcGiniCoefficient(array2));

	}
	

}
