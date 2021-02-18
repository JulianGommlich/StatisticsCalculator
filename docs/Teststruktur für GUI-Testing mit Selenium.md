# Teststruktur für GUI-Testing mit Selenium

Diese Datei beschreibt, wie die Teststruktur der automatisierten Tests des Front-Ends mithilfe von Selenium strukturiert ist.

### Kurze Vorbereitung
Selenium ist ein Framework für automatisierte Softwartetest von Webanwendungen. Mit der IntelliJ Selenium-Erweiterung wird automatisch ein Selenium Projekt in der Programmiersprache Java vorbereitet. Diese Struktur beinhaltet beinhaltet folgende Dateistruktur:
- allure-results: Beinhalten Ergebnisse des Testings. Ist Overkill und die Ansicht in Intellij reicht aus.
- build: Auch Overkill, beinhaltet Downloads und Reports.
- target und src: src beinhaltet die Pages des Webanwendung und die Test-Dateien, die die Tests beinhaltet. Target speichert die einzelnen Klassen ab, aber Grund wieso ist nicht bekannt.

### Struktur
Folgendermaßen werden die Tests aufgebaut:
- Es werden kleine Tests geschrieben die Folgende Sachen überpüfen sollen:
 - Ob die Seite richtig geladen wird und alle Elemente vorhanden sind.
 - Ob die Elemente bedienbar sind und ob versteckte Elemente nicht auswählbar sind.
 - Ob die Texte lesbar sind. 
 - Ob die Elemente falsche Angaben abfangen.
- Zusätzlich zu den kleinen Tests werden Tests geschrieben, die einen Ablauf darstellen:
 - Ein Test, bei dem eine Stichprobe eingetragen wird und und die Ergebnisse korrekt und richtig dargestellt sind.
 - Ein Test, bei dem eine Falsche Stichprobe eingetragen wird und eine Fehlermeldung erscheinen soll.
 - Es wird keine Stichprobe eingetragen. Eine Fehlermeldung sollte erscheinen.

 In src unter Pages werden die CSS-Elemente der Webanwendung abgespeichert. Außerdem werden dort die Funktionen für diese Seite erstellt. Sollte die Webanwendung mehr als eine Seite haben, werden die Funktionen in eine Base-Page verschoben, die für alle Pages gelten. Die Informationen in den Page Klassen unter Tests in den Tests verwendet.

 Die Tests werden erstmal in Chrome automatisiert laufen.

 Testfälle werden mithilfe JUnit geschrieben.

 ### Probleme
Die implementierung von automatisierten Tests mit Selenium könnte zeitauwendig und sogar den Rahmen des Projekts sprengen. Außerdem beinhaltet die Automatisierte Erstellung durch Intellij Punkte, die für dieses Projekt nicht benötigt werden.