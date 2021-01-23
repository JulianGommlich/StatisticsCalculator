package de.student.dhbwvs.statisticsCalculatorBackend;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping (path = "/exchange")
public class StatisticsController {

    Map<Double, Integer> map = new LinkedHashMap<>();

    private static Integer customerId = 0;
    private static Ergebnisse ergebnisse = new Ergebnisse();

    @GetMapping
    public Ergebnisse getErgebnisse() {
        return ergebnisse;
    }

    @PostMapping
    public Ergebnisse createCustomer(@RequestBody Ergebnisse ergebnisse) {
        ergebnisse.setMedian(customerId++);
        return ergebnisse;
    }
}

