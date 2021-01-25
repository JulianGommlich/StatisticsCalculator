# Konzepte

### Domain Model/Datenelement

#### Request-Element
![Domain Model Stichprobe](https://github.com/JulianGommlich/StatisticsCalculator/blob/main/docs/architecture_concept/assets/DomainModel1.PNG)

Das Request-Element "Stichprobe" beinhaltet die Stichprobe sowohl als explizite Stichprobe als auch als absolute Häufigkeitsverteilung. Dies ist dem Umstand geschuldet, dass bereits vor der Berechnung der statistischen Kennzahlen beide Stichprobenarten angezeigt werden sollen. Neben diesen Stichprobenwerten wird auch der Wert "z" übergeben, der zur Berechnung der Kennzahl "Mittlere Abweichung von einem Wert 'z'" benötigt wird.

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
    - expliziteStichprobe: array
    - haeufigkeitsverteilung: array
    - z: number

Das Backend erzeugt eine HTTP-Response mit folgenden Anforderungen:
- HEADER
    - Status-Code: 200
    - Content-Type: application/json
    - Content-Language: de-DE
- BODY (Format: application/json)
    - expliziteStichprobe: array
    - haeufigkeitsverteilung: array
    - modalwert: number
    - mittelwert: number
    - median: number
    - quantile: array
    - varianz: number
    - standardabweichung: number
    - mittlereAbweichungZuZ: number
    - giniKoeffizient: number

### Umgang mit der Stichprobe am Backend
Das Backend nimmt beide Stichprobenarten an und verwendet für jede Methode diejenige, welche sich für die Berechnung der Kennzahl besser eignet. Zum Beispiel ist es einfacher, einen Mittelwert aus einer expliziten Stichprobe zu errechnen, aber ein Modalwert lässt sich besser aus einer absoluten Häufigkeitsverteilung berechnen.
