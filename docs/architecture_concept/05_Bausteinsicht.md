# Bausteinsicht

### Baustein-Diagramm
![Bausteinsicht](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/BuildingBrickView.PNG)

### Beschreibung der Baustein-Architektur
Das System "StatisticsCalculator" ermöglicht dem User die Nutzung der Anwendung über eine GUI, die im Baustein "Frontend" verortet ist. Dieser Baustein beinhaltet eine schlanke Weboberfläche mit zwei Views und einem API-Endpunkt zum Senden von HTTP-Requests an das und Erhalten von HTTP-Responses vom Backend. Der Baustein "Backend" beinhaltet neben einem API-Endpunkt zur Kommunikation mit dem Baustein "Frontend" die Geschäftslogik zur Berechnung der statistischen Kennzahlen sowie dafür benötigte Hilfsmethoden.  
Eine Datenbank oder andere externe Systeme sind zum Betrieb der Anwendung nicht notwendig.
