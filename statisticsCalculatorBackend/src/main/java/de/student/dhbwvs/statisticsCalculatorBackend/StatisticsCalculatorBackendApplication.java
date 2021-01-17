package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

@SpringBootApplication
public class StatisticsCalculatorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StatisticsCalculatorBackendApplication.class, args);
	}
	
	/**freqDistribution übernimmt die Stichprobe als double-Array und gibt eine (unsortierte) Map zurück, mit den einzelnen Werten der Stichprobe 
	als keys in Form double und ihrer jeweiligen Häufigkeit als values in der Form Integer**/
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
		return freqDist;
	}
	
	//calcModal übernimmt die Map aus freqDistribution, durchsucht diese nach dem höchsten value und gibt eine List mit allen keys zurück, 
	//die den entsprechenden value haben
	public static List<Double> calcModal(Map<Double,Integer> freqDist) {
		List<Double> modal = new ArrayList<>();
		//durchsuche die map nach dem höchsten value, weise diesen der Variablen highest zu
		int highest = 0;
		for (int i : freqDist.values()) {
			highest = i > highest ? i : highest; 
		}
		//durchsuche die map nach jedem key, bei dem highest == value; füge diese keys der List hinzu
		for (double j : freqDist.keySet()){
			if (highest == freqDist.get(j)){
				modal.add(j);
			}
		}
		return modal;
	}
	
	
	// Function takes an array as input
    	public static double calcAverage(double[] array) {

        	double sum = 0;

        	// Add all Elements of array to the variable sum
        	for(int i=0; i<array.length; i++ ) {
            		sum += array[i];
        	}

        	// return the average by dividing the sum by the number of elements in the array
        	return sum/array.length;
    	}

}
