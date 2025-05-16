# Tanzverbot-Diät (enthält Produktplatzierungen!)

Die [Tanzverbot-Diät](https://www.youtube.com/watch?v=2LvdqYB0E74) zielt auf
das schnelle Erreichen eines höheren Kampfgewichts ab und erfordert neben der
Vermeidung jeglicher körperlicher Aktivität folgende tägliche Kalorienaufnahme:

| Nahrungsmittel                  | Kalorien pro Portion | Anzahl Portionen |
| ------------------------------- | -------------------: | ---------------: |
| Kellogg's Tresor                |                  137 |                4 |
| Weihenstephan Haltbare Milch    |                   64 |                8 |
| Mühle Frikadellen               |                  271 |                4 |
| Volvic Tee                      |                   40 |               12 |
| Neuburger lockerer Sahnepudding |                  297 |                1 |
| Lagnese Viennetta               |                  125 |                6 |
| Schöller 10ForTwo               |                  482 |                2 |
| Ristorante Pizza Salame         |                  835 |                2 |
| Schweppes Ginger Ale            |                   37 |               25 |
| Mini Babybel                    |                   59 |               20 |

![Von nichts kommt nichts!](pics/tanzverbot.png)

## Berechnungen

Im vorliegenden Beispiel geht es um die folgenden Berechnungen:

1. Berechnung der Gesamtzahl der täglich aufgenommenen Kalorien anhand
   obenstehender Tabelle (Summe des Produkts aus _Kalorien pro Portion_ und
   _Anzahl Portionen_).
1. Berechnung des täglichen Kalorienbedarfs (Grundumsatz) anhand von
   Körpergewicht, Körpergrösse und Alter gemäss der _Harris-Benedict_-Formel:
   - **Mann**: 66.47 + (13.7 \* Körpergewicht in kg) + (5.003 \* Körpergrösse in cm) -
     (6.75 \* Alter in Jahren)
   - **Frau**: 655.1 + (9.563 \* Körpergewicht in kg) + (1.85 \* Körpergrose in cm) -
     (4.676 \* Alter in Jahren)
1. Berechnung der überschüssigen Kalorien pro Tag (Differenz aus _aufgenommenen
   Kalorien_ und _Grundumsatz_) und der Anzahl Tage, die man sich an die
   Tanzverbot-Diät halten muss, um auf ein gewünschtes Kampfgewicht zu kommen.
   - Für ein Kilo Fettzunahme sind 9000 überschüssig aufgenommene Kalorien notwendig.

## Aufgabe

Nehmen Sie ein selbständiges Refactoring des Codes in der Datei
`src/tanzverbot-diet.ts` vor. Gehen Sie folgendermassen vor:

1. Lesen Sie den Code in der Datei `src/tanzverbot-diet.ts` komplett durch und halten Sie dabei Ausschau nach _Code Smells_, welche Sie sich zwischenzeitlich(!) als `// TODO`-Kommentare direkt im Code notieren können.
1. Schreiben Sie in der Datei `src/tanzverbot-diet.test.ts` einen Testfall
   mithilfe der Testdaten, die Sie selber erarbeiten. Führen Sie diesen Testfall aus und erstellen Sie einen Commit, sobald dies erfolgreich ist.
1. Arbeiten Sie nun die einzelnen _Code Smells_ gemäss Refactoring-Vorgehen ab.  Führen Sie den Testfall – bzw. alle Testfälle, denn evtl. wollen Sie im Zuge des Refactorings weitere Testfälle schreiben – nach jeder Änderung aus!
1. Machen Sie nach jeder erfolgreichen Anpassung einen Commit. Wenn Sie das Gefühl haben, dass eine angefangene Änderung in eine Sackgasse führt, dann machen Sie Ihre Änderungen mit `git checkout` wieder rückgängig.

### Zusatzaufgabe 1: Grundumsatz auf Durchschnittsgewicht bezogen

Für den täglichen Kalorienbedarf (Grundumsatz) wird vom Anfangsgewicht
ausgegangen. Sinnvoller wäre die Annahme eines Durchschnittsgewichts bei
linearer Gewichtszunahme. Passen Sie den Unittest und die Logik so an, dass der
durchschnittliche tägliche Kalorienbedarf von Ausgangs- und Zielgewicht
verwendet wird. (Dies ist kein Refactoring im strengen Sinn, da das von aussen
wahrnehmbare Verhalten der Software dabei angepasst wird.)

### Zusatzaufgabe 2: Mehr Flexibilität für verbesserte Diät

Wie müsste der Code angepasst werden, damit auch die [verbesserte Version der
Tanzverbot-Diät](https://www.youtube.com/watch?v=7xDmgGV3gS0) unterstützt werden
könnte? (Die Tabelle mit den Kalorien und Portionen müsste austauschbar gemacht
werden.)

Schreiben Sie die Informationen aus dem Video heraus und erweitern Sie die
Software, damit man die Gewichtszunahme auch nach der 2018er-Version der
Tanzverbot-Diät berechnen kann!
