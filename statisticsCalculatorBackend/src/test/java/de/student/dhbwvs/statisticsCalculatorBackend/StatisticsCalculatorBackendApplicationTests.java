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

	// Test for calculating the modal value
	@Test
	public void testCalcModal(){
		double[] result1 = {2.4, 4.0};
		double[] result2 = {3.0};
		Map<Double, Integer> map1 = new LinkedHashMap<>();
		map1.put(-4.5, 1);
		map1.put(1.0, 2);
		map1.put(2.0, 1);
		map1.put(2.4, 3);
		map1.put(3.4, 1);
		map1.put(4.0, 3);
		map1.put(6.0, 1);
		map1.put(7.92, 1);
		map1.put(10.6, 1);
		Map<Double, Integer> map2 = new LinkedHashMap<>();
		map2.put(3.0, 5);
		map2.put(1.0, 2);
		map2.put(2.0, 1);
		map2.put(2.4, 3);

		Assertions.assertArrayEquals(result1,calcModal(map1));
		Assertions.assertArrayEquals(result2,calcModal(map2));
	}

	// Test for calculating the average
	@Test
	public void testCalcAverage(){
		double result1 = 2.5;
		double result2 = 3.25;
		double[] testArray1 = {1, 1, 2, 2, 3, 3, 4, 4};
		double[] testArray2 = {5, 5, 4, 4, 3, 2, 2, 1};

		Assertions.assertEquals(result1, calcAverage(testArray1));
		Assertions.assertEquals(result2, calcAverage(testArray2));
	}

	// Test for calculating the median
	@Test
	public void testCalcMedian(){
		double result1 = 2.5;
		double result2 = 3;
		double[] test1 = {1,1,2,2,3,3,4,4};
		double[] test2 = {5,5,4,4,3,3,2,2,1};

		Assertions.assertEquals(result1, calcMedian(test1));
		Assertions.assertEquals(result2, calcMedian(test2));
	}

	//Test for calculating the quantile
	@Test
	public void testCalcQuantile(){

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

	// Test for calculating the variance
	@Test
	public void testCalcVariance(){
		double result1 = 8.25;
		double result2 = 6.2825999999999995;
		double[] testArray1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
		double[] testArray2 = {1.25,2,5,4,8.35};

		Assertions.assertEquals(result1, calcVariance(testArray1));
		Assertions.assertEquals(result2, calcVariance(testArray2));
	}

	// Test for calculating the standard deviation
	@Test
	public void testCalcStandardDeviation(){
		double result1 = 4;
		double result2 = 3;
		double testValue1 = 16;
		double testValue2 = 9;

		Assertions.assertEquals(result1, calcStandardDeviation(testValue1));
		Assertions.assertEquals(result2, calcStandardDeviation(testValue2));
	}

	//Test for calculating the average deviation to z
	@Test
	public void testCalcAverageDeviation(){

		double[] array1 = {2, 2, 3, 4, 14};
		double[] array2 = {2.4, 3.4, 1.0, 6, 1, 2, 10.6, 7.92, -4.5, 2.4, 2.4, 4, 4, 4};
		double z1 = 2;
		double z2 = 2.974;
		double result1 = 3.0;
		double result2 = 2.3728571428571428;

		Assertions.assertEquals(result1, calcAverageDeviation(array1, z1));
		Assertions.assertEquals(result2, calcAverageDeviation(array2, z2));
	}

	//Test for calculating the gini coefficient
	@Test
	public void testCalcGiniCoefficient(){

		double[] array1 = {15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36, 36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98};
		double ergebnis1 = 0.28969053934571176;
		double[] array2 = {15, 18, 20,65, 24, 1, 99};
		double ergebnis2 = 0.4722550177095632;

		Assertions.assertEquals(ergebnis1, calcGiniCoefficient(array1));
		Assertions.assertEquals(ergebnis2, calcGiniCoefficient(array2));

	}
}
