# Entwicklungsprozess

Diese Datei beschreibt, wie ein Entwickler bei der Arbeit in unserem Projekt vorgehen soll. Dabei stellt diese Dokumentation eine Richtlinie für den Großteil der Issues
dar. Im Falle von speziellen Issues (bspw. QS-Issues, Architektur-Issues) kann von diesem Vorgehen abgewichen werden.

### Erstellung eines Issues
Wenn ich eine neue Aufgabe (neues Feature, Bugfix, QS, Dokumentation) erfassen möchte,...  
1. Erstelle ich im Tab "Issues" ein "New Issue"
1. Gebe dem Issue einen sprechenden Titel ("Berechnung der Quantile implementieren" statt "Quantile")
1. Füge eine Beschreibung hinzu, die folgendes enthält:
    - Fachlicher bzw. technischer Hintergrund
    - IST-Analyse und Problemstellung
    - Lösungsansatz
    - ggf. technische Risiken
1. Wähle "StatisticsCalculator Workflow" als Project aus
1. Wähle den entsprechenden Milestone
1. ggf. Hinzufügen des Labels "Für Entwicklung ausgewählt" und verschieben des Issues im ProjectBoard in die entsprechende Spalte

### Arbeit an einem Issue
Wenn ich an einer Aufgabe arbeiten möchte,...  
1. Ändere ich das Label des Issues auf "In Entwicklung" und verschiebe das Issue im ProjectBoard in die entsprechende Spalte
1. Erstelle ich einen Branch, der genauso heißt wie das Issue (Das geht im Tab "Code", wenn man einen nicht vorhandenen Namen in die Suchzeile eingibt)
1. Wechsle ich lokal auf meinen Branch und implementiere das Issue
1. Pushe ich meine Änderungen auf dem Branch ins Repository, ändere das Label auf "Entwicklung fertig" und verschiebe das Issue im ProjectBoard in die entsprechende Spalte
1. Lasse ich meine Codeänderungen von einem anderen Entwickler testen (im Notfall kann man auch mal selbst seinen Code testen). Dafür ändere ich das Label auf "In Test" 
und verschiebe das Issue im ProjectBoard in die entsprechende Spalte
1. Erstelle ich für den Branch einen Pull Request (Das geht im Tab "Code", wenn man seinen Branch ausgewählt hat und im grauen Bereich auf "Pull Request" klickt)
1. Bitte ich einen anderen Entwickler, meine Änderungen zu reviewen und bessere seine Anmerkungen ggf. aus
    - Im Falle von Mergekonflikten sollten mehrere Entwickler gemeinsam drüberschauen
1. Merge ich meine Änderungen in den "main"-Branch und schließe mein Issue

### Änderungen am Entwicklungsprozess
Wenn ich einen Verbesserungsvorschlag für den Entwicklungsprozess habe,...
1. Erstelle ich im Tab "Issues" ein "New Issue"
1. Gebe dem Issue einen sprechenden Titel, der mit "Entwicklungsprozess | " beginnt (bspw.: "Entwicklungsprozess | neues Label hinzufügen")
1. Füge eine Beschreibung hinzu, die folgendes enthält:
    - IST-Analyse/Problemstellung
    - ggf. wie das Problem aufgefallen ist
    - Lösungsvorschlag
1. Füge das Label "Prozessoptimierung" hinzu

Julian schaut täglich, ob es Issues mit diesem Label gibt und prüft diese. Die weitere Bearbeitung hängt dann vom Umfang des Issues ab. Ggf. wird dann in Terminen über das
Issue gesprochen.

### Termine
|                           |                  |
| ------------------------- | ---------------- |
| Wöchentlich fixer Termin: | Donnerstag 19:00 |
| Blockerzeiten:            | Montag 19:00     |
