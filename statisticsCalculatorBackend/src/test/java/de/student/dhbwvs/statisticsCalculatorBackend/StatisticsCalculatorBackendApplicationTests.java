package de.student.dhbwvs.statisticsCalculatorBackend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static de.student.dhbwvs.statisticsCalculatorBackend.StatisticsCalculatorBackendApplication.*;

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
		List<Double> result1 = Arrays.asList(2.4, 4.0);
		List<Double> result2 = Arrays.asList(3.0);
		double[] array1 = {2.4, 3.4, 1.0, 6, 1, 2, 10.6, 7.92, -4.5, 2.4, 2.4, 4, 4, 4};
		double[] array2 = {5, 5, 4, 4, 3, 3, 3, 2, 2, 1};

		Assertions.assertEquals(result1, calcModal(freqDistribution(array1)));
		Assertions.assertEquals(result2, calcModal(freqDistribution(array2)));
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

}
