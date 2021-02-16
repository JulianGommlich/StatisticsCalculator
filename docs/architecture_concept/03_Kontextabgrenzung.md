# Kontextabgrenzung
### Fachlicher Kontext
Mit der Anwendung kann der Nutzer statistische Kennzahlen zu einer ausgewählten Stichprobe berechnen lassen. Dafür kann der Nutzer eine explizite Stichprobe (z. B. "1, 3, 3, 4, 6, 6, 6, 7") oder eine absolute Häufigkeitsverteilung (z. B. "(1, 1), (3, 2), (4, 1), (6, 3), (7, 1)") an das Programm übergeben. Darüber hinaus muss für die Berechnung der Kennzahl "Mittlere Abweichung von einem Wert z" ein numerischer Wert z übergeben werden.  
Von der Anwendung werden daraufhin folgende Kennzahlen berechnet:
- Modalwert
- Mittelwert
- Median
- Quantile (0,05; 0,1; 0,25; 0,75; 0,9; 0,95)
- Varianz
- Standardabweichung
- Mittlere Abweichung von einem Wert z
- Gini-Koeffizient

Diese Werte sollen an der Oberfläche übersichtlich für den Nutzer dargestellt werden. Außerdem sollen aus den Werten der Stichprobe Diagramme erstellt werden:
- Säulendiagramm
- Kreisdiagramm
- empirische Verteilungsfunktion
- Lorenzkurve

### Technischer Kontext
Die Anwendung soll als Webanwendung implementiert werden. D. h., dass eine Teilung der Darstellungsebene und der Logikebene vorgenommen wird, indem es ein Frontend und ein Backend gibt.  
Das Frontend ist die darstellende Ebene der Anwendung und beinhaltet die Benutzeroberfläche, fragt die Stichprobenwerte vom Nutzer ab, stellt die Ergebnisse der Berechnung dar und erstellt die Diagramme, die dann auf der Oberfläche angezeigt werden.  
Im Backend hingegen finden die Berechnungen der statistischen Kennzahlen statt.  
Die Kommunikation zwischen Front- und Backend ist über eine REST-Schnittstelle gelöst, über die die Stichprobe übertragen und die Berechnung der Kennzahlen angestoßen wird.
