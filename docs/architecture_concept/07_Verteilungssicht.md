# Verteilungssicht
![Verteilungssicht](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DeploymentView.PNG)

### Aufbau des Backends
Das Backend ist klassisch nach dem BCE-Modell konzipiert. Die "Border" stellt dabei ein REST-Controller dar, der Requests vom Frontend annimmt. Im "Control"-Bereich befindet sich die Berechnung der statistischen Kennzahlen. Theoretisch würde die Klasse "Ergebnisse" (siehe [8. Konzepte](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/08_Konzepte.md)) zur "Entity"-Schicht gehören. Da diese Klasse aber nicht zur Persistierung in einer Datenbank sondern zum Versenden der Datenüber die Schnittstelle genutzt wird, ist dies strittig.

### Beschreibung der Softwareauslieferung
Das Front- und das Backend werden unabhängig voneinander ausgeliefert und deployt. Das Backend muss auf einem Webserver deployt werden, um aus dem Frontend heraus erreichbar zu sein. Das Frontend kann clientseitig betrieben werden, sollte aber auch besser auf einem Webserver bereitgestellt werden.
