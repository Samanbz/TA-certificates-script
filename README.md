# Certificates Script

This project creates certificates for the participants of TechAcademy

## Installation

Um dieses Projekt zu verwenden, lade es zunächst von GitHub herunter und installiere dann die erforderlichen Abhängigkeiten. Außerdem musst du auf deinem Rechner [libreoffice](https://de.libreoffice.org/download/download/) installiert haben, damit man die .docx Dateien in .pdf umwandeln kann.

### Schritte zum Installieren des Projekts:

1. Klone das Projekt

```bash
git clone https://github.com/tburakonat/certificates.git
```

2. Führe den folgenden Befehl im Repository aus, um die Abhängigkeiten zu installieren:

```bash
npm install
```

### Libreoffice installieren

Damit du am Ende die erstellten .docx Dateien in .pdf umwandeln kannst musst du das Programm libreoffice installieren.

## Dateien ablegen

### Excel Template

Damit das Skript funktioniert, musst du in den Ordner `data` die Excel mit den Bewertungen ablegen. Achte darauf, dass die Datei den Namen `Bewertungen.xlsx` hat. Die Excel Datei muss folgende Spalten in der richtigen Reihenfolge aufweisen außerdem müssen die einzelnen Zeilen im richtigen Format stehen:

| Vorname | Nachname   | Track                   | Level           | Workshops                      |
| ------- | ---------- | ----------------------- | --------------- | ------------------------------ |
| John    | Doe        | Web Development         | Anfänger        | [Unternehmen 1, Unternehmen 2] |
| Max     | Mustermann | Data Science mit R      | Fortgeschritten | [Unternehmen 1]                |
| Lisa    | Musterfrau | Data Science mit Python | Anfänger        | []                             |

### Word Templates

Neben dem Excel Template müssen auch die Word Templates gegeben sein. Für jeden Track und für jedes Niveau muss ein Word Template im `templates` Ordner abgelegt werden.

In dem Template muss man folgende Variablen einsetzen, damit das Skript diese ausfüllen kann.

-   {{name}}
-   {{track}}
-   {{vorname}}
-   {{workshops}}
-   {{workshopsList}}

Die Variable {{workshops}} rendert den String ({{data.firstName}} also took part in workshops with the following companies:), falls die Person mindestens einen Workshop besucht hat.

Die Variable {{workshopsList}} erstellt für jeden besuchten Workshop ein Stichpunkt falls die Person mindestens einen Workshop besucht hat.

## Programm laufen lassen

Wenn du alle Abhängigkeiten installiert und alle Dateien abgelegt hast, kannst du mit dem Befehl node src/script.js das Programm starten.
