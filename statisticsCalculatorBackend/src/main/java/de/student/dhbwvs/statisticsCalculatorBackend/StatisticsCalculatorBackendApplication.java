package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.*;
import java.util.stream.Collectors;


@SpringBootApplication
public class StatisticsCalculatorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StatisticsCalculatorBackendApplication.class, args);
	}


	/**freqDistribution übernimmt die Stichprobe als double-Array und gibt eine sortierte Map zurück, mit den einzelnen Werten der Stichprobe
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
		//Sortiervorgang aufsteigend
		return freqDist.entrySet()
				.stream()
				.sorted(Map.Entry.<Double, Integer>comparingByKey())
				.collect(Collectors.toMap(
						Map.Entry::getKey,
						Map.Entry::getValue,
						(oldValue, newValue) -> oldValue, LinkedHashMap::new));
	}

	/**exp_sample übernimmt die Häufigkeitsverteilung als Map und gibt eine aufsteigend sortierte explizite Stichprobe als double-Array zurück**/

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

	/**calcModal übernimmt die Map aus freqDistribution, durchsucht diese nach dem höchsten value und gibt eine List mit allen keys zurück,
	die den entsprechenden value haben**/
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
	/**calcMedian berechnet den Median eines Arrays**/
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
			median = ((values[(count/2)] + values[((count/2)+1)])/2);
		} else {
			//Berechne den Median für einen ungerade Array und speichere den Wert unter dem Parameter "median"
			median = values[((count+1)/2)];
		}
		//Gebe den Median zurück
		return median;
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
