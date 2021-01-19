# Laufzeitsicht

### Laufzeit-Diagramm
![Laufzeitsicht](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/RuntimeView.PNG)

### Prozessbeschreibung

Ausgehend vom Nutzer wird am Frontend der Prozess gestartet, indem der Nutzer die Stichprobendaten in die Oberfläche einpflegt und dann den Berechnungsprozess startet. Im Frontend werden daraufhin die eingegebenen Daten validiert und ob die Eingabe der angegebenen Art der Stichprobe entspricht. Weiterhin wird im Frontend ein Objekt der Klasse "Stichprobe" (siehe [8. Konzepte](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/08_Konzepte.md)) instantiiert. Dieses wird dann über die REST-Schnittstelle an das Backend gegeben.  
Am Backend werden dann die erhaltenen Daten entgegengenommen und für die Berechnung der statistischen Kennzahlen benutzt. Es wird dann ein Objekt der Klasse "Ergebnisse" instantiiert und als Response an das Frontend gesendet.  
Das Frontend nimmt diese Ergebnisse dann entgegen, setzt die Werte in die Diagramme ein und gibt alles an der Oberfläche aus.
