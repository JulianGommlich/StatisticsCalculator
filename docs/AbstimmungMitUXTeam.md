# Diskussionspunkte zur Abstimmung der Gruppen 3 und 5

### Absolute Größen bei Raster und Bedienelementen
#### Problem
Wenn man eine Webseite mit absoluten Größen- und Positionsparametern entwickelt, kann das die Usability der Anwendung bei veränderten Fenstergrößen (oder auf Displays mit anderer Auflösung) beeinträchtigen.

#### Vorschlag
Die Webseite sollte responsiv mit relativen Größen- und Positionsparametern entwickelt werden.  
Dabei können die Größenvorschläge für Buttons und Eingabefelder durchaus übernommen werden.

#### Verbleib
Gruppe 3: Die absoluten Größen- und Positionsparameter werden aus dem Word-Dokument entfernt.  
Gruppe 5: Die Elemente auf der Webseite werden responsiv platziert. Die genaue Umsetzung liegt jetzt bei uns.


### Eingabefeld "Manuelle Eingabe der Stichprobe"
#### Problem
Durch das Eingabefeld zu scrollen, ist keine optimale Lösung.

#### Vorschlag
Wir könnten das Eingabefeld durch eine Textarea ersetzen. Diese Lösung trägt auch dann, wenn der Nutzer sehr große Stichprobenwerte erfasst.

#### Verbleib
Gruppe 3: Anpassung im Prototypen  
Gruppe 5: Umestzung als Textarea, die man vergrößern kann.  
Offen: Komma als Trennzeichen?


### Einlesen der .csv-Datei
#### Problem
Uns ist aktuell noch unklar, wie sich das Einlesen der .csv-Datei auf die Oberfläche auswirken soll.

#### Vorschlag
- Datei einlesen lassen
- Anzeigen, dass Datei eingelesen wurde
- Im Pop-Up Stichprobenwerte anzeigen

#### Darüber hinaus
Wie soll denn die .csv-Datei aufgebaut werden?

#### Verbleib
Gruppe 3: Erstellung eines Entwurfs, wie die .csv-Datei aussehen soll  
Gruppe 5: Umsetzung des Einlesens wie oben beschrieben


### Eingabefeld "Einlesen der .csv-Datei"
#### Problem
Dass als Eingabefeld zu gestalten ist unserer Ansicht nach unlogisch.

#### Vorschlag
Realisierung als Button und/oder Drag-And-Drop-Area.

#### Verbleib
Gruppe 3: Anpassung im Prototypen
Gruppe 5: Umsetzung wie oben beschrieben


### Absolute Häufigkeitsverteilung
#### Problem
Die im Prototypen angezeigte Häufigkeitsverteilung ist keine Häzufigkeitsverteilung ("15, 18, 22, 32, ..." ist auch eine explizite Stichprobe)

#### Vorschlag
Am besten erfasst man die Wertepaare einer absoluten Häufigkeitsverteilung so:
(3,141592658979323; 1); (15; 3); (18; 5); ...

#### Verbleib
Gruppe 3: Anpassung im Prototypen
Offen: Komma als Trennzeichen?


### Umrechnung der Stichprobe im Frontend
#### Problem
Diese Umrechnungslogik sollte nicht im Frontend sein. Ist es wirklich notwendig, die absolute Häufigkeitsverteilung im Pop-Up darzustellen.

#### Vorschlag
Im Pop-Up nur eine Stichprobenart anzeigen (entweder explizite Stichprobe oder Häufigkeitsverteilung)

#### Verbleib
Gruppe 5: Umrechnungslogik wird ins Frontend umgezogen. Über die Schnittstelle werden dann beide Stichprobenarten geschickt.
