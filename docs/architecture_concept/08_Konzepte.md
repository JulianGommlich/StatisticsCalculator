# Konzepte

### Domain Model/Datenelement

Da sowohl eine explizite Stichprobe als auch eine absolute Häufigkeitsverteilung als Input akzeptiert werden sollen und im Frontend nicht die Logik plaziert werden
sollte, eine explizite Stichprobe in eine absolute Häufigkeitsverteilung umzurechnen, muss eine Lösung dafür gefunden werden, mit diesen zwei Unterschiedlichen
Datenelementen umzugehen. Der Unterschied besteht vor allem darin, dass eine explizite Stichprobe als einfache Liste von Werten abgebildet werden kann und eine
absolute Häufigkeitsverteilung als Liste von Tupeln oder HashMap (Wert, Häufigkeit) dargestellt werden muss.

#### Variante 1

#### Variante 2
