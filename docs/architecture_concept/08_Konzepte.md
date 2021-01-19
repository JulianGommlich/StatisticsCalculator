# Konzepte

### Domain Model/Datenelement

#### Request-Element
Da sowohl eine explizite Stichprobe als auch eine absolute Häufigkeitsverteilung als Input akzeptiert werden sollen und im Frontend nicht die Logik plaziert werden sollte, eine explizite Stichprobe in eine absolute Häufigkeitsverteilung umzurechnen, muss eine Lösung dafür gefunden werden, mit diesen zwei Unterschiedlichen Datenelementen umzugehen. Der Unterschied besteht vor allem darin, dass eine explizite Stichprobe als einfache Liste von Werten abgebildet werden kann und eine absolute Häufigkeitsverteilung als Liste von Tupeln oder HashMap (Wert, Häufigkeit) dargestellt werden muss.  
Nachfolgend werden zwei Umsetzungsvarianten vorgestellt, wobei sich für Variante 1 entschieden wurde.

##### Variante 1
![Domain Model Variante 1](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DomainModelVariant1.PNG)

In dieser Variante erstellt das Frontend ein Datenelement "Stichprobe" mit den Attributen "type" und "values". Das Attribute "type" gibt dabei an, ob es sich um eine "expliziteStichprobe" oder eine "haeufigkeitsverteilung" handelt. Das Attribut "values" stellt unabhängig davon eine Liste dar, in der sich entweder die expliziten Stichprobenwerte oder die Wertepaare aus Wert und Häufigkeit befinden. Das Attribut "z" ist unabhängig davon numerisch.  
Das "type"-Attribut wird am Backend verwendet, um die Verarbeitung der in "values" mitgelieferten Daten entsprechend anzupassen.

##### Variante 2
![Domain Model Variante 2](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DomainModelVariant2.PNG)

In dieser Variante wird eines von zwei verschiedenen Datenelementen erzeugt, um entweder eine "ExpliziteStichprobe" oder eine "Haeufigkeitsverteilung" abzubilden. Dementsprechend werden in "values" die Werte der Stichprobe bzw. in "valueAmountPairs" die Paare aus Wert und Häufigkeit abgebildet. Das Attribut "z" ist unabhängig davon numerisch.  
Der negative Effekt dieser Lösung ist, dass auch zwei API-Endpunkte vom Backend zur Verfügung gestellt werden müssen, um mit den jeweiligen Datenelementen umzugehen.

#### Response-Element
![Domain Model Ergebnisse](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DomainModel2.PNG)

Das Response-Element "Ergebnisse" beinhaltet die Stichprobe einmal als explizite Stichprobe sowie als absolute Häufigkeitsverteilung. Darüber hinaus beinhaltet "Ergebnisse" alle Berechnungsergebnisse der Businesslogik im Backend. Bei den Quantilen wurde sich entschieden, diese als Liste zu speichern.

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
    - z: number

Das Backend erzeugt eine HTTP-Response mit folgenden Anforderungen:
- HEADER
    - Status-Code: 200
    - Content-Type: application/json
    - Content-Language: de-DE
- BODY (Format: application/json)
    - ...

### Umgang mit der Variable _values_ am Backend
Die Variable _values_ kann entweder eine explizite Stichprobe (Liste mit einzelnen Werten) oder eine absolute Häufigkeitsverteilung (Liste mit Wertepaaren - Wert & Häufigkeit) abbilden. Das Backend kann anhand des Attributs _type_ erkennen, um welche Art der Stichprobe es sich handelt.  
Am Backend werden zwei Methoden zur Verfügung gestellt, die eine explizite Stichprobe in eine absolute Häufigkeitsverteilung umwandeln können und umgekehrt. Die Methoden zur Berechnung der statistischen Kennzahlen prüfen zu Beginn ab, ob es sich bei der Eingabe um eine explizite Stichprobe oder eine absolute Häufigkeitsverteilung handelt (anhand der Variable _type_) und formen dann ggf. die Eingabe in das für die Berechnung günstigere Format um.
