# Testfälle für automatisierte Tests
Diese Testfälle wurde durch Gruppe 4 erarbeitet und als Testkonzept an uns weitergeleitet

### Eingabewerte:
| Stichprobenname | Stichprobenwert                                                                                                                                                                                                                                                                                                                                                                                   | Name für z      | Wert für z |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- |
| W_Sonderzeichen | (! , ?)                                                                                                                                                                                                                                                                                                                                                                                           | Z_Sonderzeichen | !          |
| W_Buchstaben    | (A, B, C)                                                                                                                                                                                                                                                                                                                                                                                         | Z_Buchstaben    | a          |
| W_Ü100          | (5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 35, 35, 35, 35, 35, 40, 40, 40, 40, 40, 45, 45, 45, 45, 45, 50, 50, 50, 50, 50, 55, 55, 55, 55, 55, 60, 60, 60, 60, 60, 65, 65, 65, 65, 65, 70, 70, 70, 70, 70, 75, 75, 75, 75, 75, 80, 80, 80, 80, 80, 85, 85, 85, 85, 85, 90, 90, 90, 90, 90, 100, 100, 100, 100, 100, 105) |                 |            |
| W_Ü30           | (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31)                                                                                                                                                                                                                                                                               |                 |            |
| W_Optimal       | (15, 15, 15, 18, 18, 18, 18, 20, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 36, 36, 36, 36, 36, 36, 36, 49, 49, 49, 49, 49, 72, 72, 72, 72, 98, 98, 98)                                                                                                                                                          | Z_Optimal       | 25         |
| W_Negativ       | (-1, -1, -5, -3)                                                                                                                                                                                                                                                                                                                                                                                  | Z_Negativ       | -3         |
| W_Null          | (0)                                                                                                                                                                                                                                                                                                                                                                                               | Z_Null          | 0          |
| W_Einzelwert    | (5)                                                                                                                                                                                                                                                                                                                                                                                               |                 |            |
| W_Gleich        | (1, 1, 1, 1, 1, 1, 1,  1, 1, 1)                                                                                                                                                                                                                                                                                                                                                                   |                 |            |


### Selenium-Tests
##### Eingabefeld "Stichprobe"
- [ ] Eingabe von W_Sonderzeichen führt zu Fehlermeldung
- [ ] Eingabe von W_Buchstaben führt zu Fehlermeldung
- [ ] Eingabe von W_Ü100 führt zu Fehlermeldung
- [ ] Eingabe von W_Ü30 führt zu Fehlermeldung
- [ ] Eingabe von W_Optimal führt *nicht* zu Fehlermeldung
- [ ] Eingabe von W_Negativ führt *nicht* zu Fehlermeldung
- [ ] Eingabe von W_Null führt *nicht* zu Fehlermeldung
- [ ] Eingabe von W_Einzelwert führt *nicht* zu Fehlermeldung
- [ ] Eingabe von W_Gleich führt *nicht* zu Fehlermeldung

##### Eingabefeld "z"
- [ ] Eingabe von Z_Sonderzeichen führt zu Fehlermeldung
- [ ] Eingabe von Z_Buchstaben führt zu Fehlermeldung
- [ ] Eingabe von Z_Optimal führt *nicht* zu Fehlermeldung
- [ ] Eingabe von Z_Negativ führt *nicht* zu Fehlermeldung
- [ ] Eingabe von Z_Null führt *nicht* zu Fehlermeldung

##### Ergebnisfelder
- [ ] Ergebnisfeld "Modalwert" zeigt bei Eingabe von W_optimal _23, 27_ an
- [ ] Ergebnisfeld "Mittelwert" zeigt bei Eingabe von W_optimal _33,62_ an
- [ ] Ergebnisfeld "Median" zeigt bei Eingabe von W_optimal _25_ an
- [ ] Ergebnisfeld "Quantil 0,05" zeigt bei Eingabe von W_optimal _15_ an
- [ ] Ergebnisfeld "Quantil 0,1" zeigt bei Eingabe von W_optimal _18_ an
- [ ] Ergebnisfeld "Quantil 0,25" zeigt bei Eingabe von W_optimal _22_ an
- [ ] Ergebnisfeld "Quantil 0,75" zeigt bei Eingabe von W_optimal _36_ an
- [ ] Ergebnisfeld "Quantil 0,9" zeigt bei Eingabe von W_optimal _72_ an
- [ ] Ergebnisfeld "Quantil 0,95" zeigt bei Eingabe von W_optimal _98_ an
- [ ] Ergebnisfeld "Varianz" zeigt bei Eingabe von W_optimal _438,66_ an
- [ ] Ergebnisfeld "Standardabweichung" zeigt bei Eingabe von W_optimal _20,94_ an
- [ ] Ergebnisfeld "Mittlere absolute Abweichung von Z" zeigt bei Eingabe von W_optimal und Z_Optimal _12,9_ an
- [ ] Ergebnisfeld "Gini-Koeffizient" zeigt bei Eingabe von W_optimal _0,29_ an


### Unittests
##### Modalwert
- [ ] Eingabe: W_Optimal | Ergebnis:	[23, 27]
- [ ] Eingabe: W_Negativ | Ergebnis:	-1
- [ ] Eingabe: W_Null | Ergebnis:	0
- [ ] Eingabe: W_Einzelwert | Ergebnis:	5
- [ ] Eingabe: W_Gleich | Ergebnis:	1

##### Mittelwert
- [ ] Eingabe: W_Optimal | Ergebnis:	33,62
- [ ] Eingabe: W_Negativ | Ergebnis:	-2,5
- [ ] Eingabe: W_Null | Ergebnis:	0
- [ ] Eingabe: W_Einzelwert | Ergebnis:	5
- [ ] Eingabe: W_Gleich | Ergebnis:	1

##### Median
- [ ] Eingabe: W_Optimal | Ergebnis:	25
- [ ] Eingabe: W_Negativ | Ergebnis:	-2
- [ ] Eingabe: W_Null | Ergebnis:	0
- [ ] Eingabe: W_Einzelwert | Ergebnis:	5
- [ ] Eingabe: W_Gleich | Ergebnis:	1

##### Quantile [0,05; 0,1; 0,25; 0,75; 0,9; 0,95]
- [ ] Eingabe: W_Optimal | Ergebnis:	[15; 18; 22; 36; 72; 98]
- [ ] Eingabe: W_Negativ | Ergebnis:	[-4,7; -4,4; -3,5; -1; -1; -1]
- [ ] Eingabe: W_Null | Ergebnis:	[0; 0; 0; 0; 0; 0]
- [ ] Eingabe: W_Einzelwert | Ergebnis:	[5; 5; 5; 5; 5; 5]
- [ ] Eingabe: W_Gleich | Ergebnis:	[1; 1; 1; 1; 1; 1]

##### Varianz
- [ ] Eingabe: W_Optimal | Ergebnis:	438,66
- [ ] Eingabe: W_Negativ | Ergebnis:	3,67
- [ ] Eingabe: W_Null | Ergebnis:	0
- [ ] Eingabe: W_Einzelwert | Ergebnis:	5
- [ ] Eingabe: W_Gleich | Ergebnis:	0

##### Standardabweichung
- [ ] Eingabe: W_Optimal | Ergebnis:	20,94
- [ ] Eingabe: W_Negativ | Ergebnis:	1,92
- [ ] Eingabe: W_Null | Ergebnis:	0
- [ ] Eingabe: W_Einzelwert | Ergebnis:	2,24
- [ ] Eingabe: W_Gleich | Ergebnis:	0

##### Mittlere absolute Abweichung von Z (Z_Optimal)
- [ ] Eingabe: W_Optimal | Ergebnis:	12,9
- [ ] Eingabe: W_Negativ | Ergebnis:	27,5
- [ ] Eingabe: W_Null | Ergebnis:	25
- [ ] Eingabe: W_Einzelwert | Ergebnis:	20
- [ ] Eingabe: W_Gleich | Ergebnis:	24

##### Mittlere absolute Abweichung von Z (Z_Negativ)
- [ ] Eingabe: W_Optimal | Ergebnis:	36,62
- [ ] Eingabe: W_Negativ | Ergebnis:	1,5
- [ ] Eingabe: W_Null | Ergebnis:	3
- [ ] Eingabe: W_Einzelwert | Ergebnis:	8
- [ ] Eingabe: W_Gleich | Ergebnis:	4

##### Mittlere absolute Abweichung von Z (Z_Null)
- [ ] Eingabe: W_Optimal | Ergebnis:	33,62
- [ ] Eingabe: W_Negativ | Ergebnis:	2,5
- [ ] Eingabe: W_Null | Ergebnis:	0
- [ ] Eingabe: W_Einzelwert | Ergebnis:	5
- [ ] Eingabe: W_Gleich | Ergebnis:	1

##### Gini-Koeffizient
- [ ] Eingabe: W_Optimal | Ergebnis:	0,29
- [ ] Eingabe: W_Negativ | Ergebnis:	Fehler
- [ ] Eingabe: W_Null | Ergebnis:	Fehler
- [ ] Eingabe: W_Einzelwert | Ergebnis:	0
- [ ] Eingabe: W_Gleich | Ergebnis:	0


### Nicht automatisiert testbare Testfälle
- [ ] Erzeugung und Anzeige des Kreisdiagramms
- [ ] Erzeugung und Anzeige der empirischen Verteilungsfunktion
- [ ] Erzeugung und Anzeige des Säulendiagramm
- [ ] Erzeugung und Anzeige der Lorenzkurve
