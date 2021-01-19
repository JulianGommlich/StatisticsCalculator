# Konzepte

### Domain Model/Datenelement

Da sowohl eine explizite Stichprobe als auch eine absolute Häufigkeitsverteilung als Input akzeptiert werden sollen und im Frontend nicht die Logik plaziert werden sollte, eine explizite Stichprobe in eine absolute Häufigkeitsverteilung umzurechnen, muss eine Lösung dafür gefunden werden, mit diesen zwei Unterschiedlichen Datenelementen umzugehen. Der Unterschied besteht vor allem darin, dass eine explizite Stichprobe als einfache Liste von Werten abgebildet werden kann und eine absolute Häufigkeitsverteilung als Liste von Tupeln oder HashMap (Wert, Häufigkeit) dargestellt werden muss.  
Nachfolgend werden zwei Umsetzungsvarianten vorgestellt, wobei sich für Variante 1 entschieden wurde.

#### Variante 1
![Domain Model Variante 1](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DomainModelVariant1.PNG)

In dieser Variante erstellt das Frontend ein Datenelement "Stichprobe" mit den Attributen "type" und "values". Das Attribute "type" gibt dabei an, ob es sich um eine "expliziteStichprobe" oder eine "haeufigkeitsverteilung" handelt. Das Attribut "values" stellt unabhängig davon eine Liste dar, in der sich entweder die expliziten Stichprobenwerte oder die Wertepaare aus Wert und Häufigkeit befinden.  
Das "type"-Attribut wird am Backend verwendet, um die Verarbeitung der in "values" mitgelieferten Daten entsprechend anzupassen.

#### Variante 2
![Domain Model Variante 2](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DomainModelVariant2.PNG)

In dieser Variante wird eines von zwei verschiedenen Datenelementen erzeugt, um entweder eine "ExpliziteStichprobe" oder eine "Haeufigkeitsverteilung" abzubilden. Dementsprechend werden in "values" die Werte der Stichprobe bzw. in "valueAmountPairs" die Paare aus Wert und Häufigkeit abgebildet.  
Der negative Effekt dieser Lösung ist, dass auch zwei API-Endpunkte vom Backend zur Verfügung gestellt werden müssen, um mit den jeweiligen Datenelementen umzugehen.

### Schnittstellenspezifikation
![Schnittstellendiagramm](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/InterfaceDiagram.PNG)

Das Frontend erzeugt einen HTTP-Request mit folgenden Anforderungen:
- METHOD
    - POST
- HEADER
    - Accept: application/json
    - Access-Control-Allow-Origin: *
    - Cache-Control: no-cache
    - Content-Type: application/json
    - Content-Language: de-DE
- BODY (Format: application/json)
    - type: enum (_ExpliziteStichprobe_ oder _Haeufigkeitsverteilung_)
    - values: array

Das Backend erzeugt eine HTTP-Response mit folgenden Anforderungen:
- HEADER
    - Status-Code: 200
    - Content-Type: application/json
    - Content-Language: de-DE
- BODY (Format: application/json)
    - ...
