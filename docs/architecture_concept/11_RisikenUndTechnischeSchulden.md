# Risiken und technische Schulden

### Risiken
- Fehlende Tests auf Resilienz, Lastfähigkeit und Performance der Webanwendung

### Technische Schulden

##### Umrechnungslogik im Frontend
Die Umrechnungsmethoden (explizite Stichprobe <-> absolute Häufigkeitsverteilung) in das Frontend zu legen, ist eine Vereinfachungslösung, da dadurch kein zusätzlicher Request an das Backend gesendet werden muss.  
Mit Bezug auf die Trennung von Frontend als "darstellende Ebene" und Backend als "logische Ebene" ist diese Entscheidung allerdings als technische Schuld aufzufassen, die - sobald die Möglichkeit besteht - behoben werden muss.
