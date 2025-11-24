Mein Parfüm-Katalog (statisch)
=================================

Dieses kleine statische Web‑Projekt wurde automatisch erzeugt und enthält alle Parfüm‑Namen aus deiner hochgeladenen Liste (siehe PDF).

Original‑PDF: /mnt/data/LISTE UPDATE  2025.pdf

Projektstruktur (wichtig):
- index.html           → Hauptseite (Grid)
- styles.css           → Styling
- app.js               → Logik (lädt data/perfumes.json)
- data/perfumes.json   → Die Parfüm‑Daten (Name, Marke, Bildpfad, Notizen)
- images/              → Alle Bilder (deine hochgeladenen und automatisch generierte Platzhalter)
- perfume-app.zip      → ZIP‑Archiv dieses Projekts

Wie du später etwas änderst
---------------------------
1. Parfüm‑Text (Name / Brand / Notes / Categories):
   - Öffne `data/perfumes.json` in einem Texteditor.
   - Bearbeite den Eintrag (JSON). Beispiel eines Eintrags:
     { "name": "Laylati (Xerjoff)", "brand": "Xerjoff", "category": "Unisex", "image": "images/Laylati_Xerjoff.jpeg", "notes": ["holz","vanille"], "have": false, "had": false, "want": false }

2. Bild ersetzen/hochladen:
   - Tausche die Datei in `images/` aus. Wenn du z.B. ein neues Bild für Laylati hochlädst, benenne es exakt wie im JSON (z. B. `Laylati_Xerjoff.jpeg`) und überschreibe die alte Datei.
   - Alternativ kannst du einen neuen Dateinamen verwenden und `image` in `data/perfumes.json` aktualisieren.

3. Lokal testen:
   - Öffne `index.html` in einem Browser (du kannst die Dateien lokal öffnen) oder lade das ganze Verzeichnis auf Netlify/GitHub Pages hoch.

4. Einstellungen / Layout ändern:
   - Styling: bearbeite `styles.css`
   - Verhalten: bearbeite `app.js`

Hinweis: Die App speichert deine "Habe ich / Hatte ich / Will ich"-Markierungen im `localStorage` deines Browsers, sodass deine Auswahl erhalten bleibt.

Wenn du willst, kann ich:
- Die JSON‑Daten weiter bereinigen (z. B. Kategorien hinzufügen: 'Herren', 'Damen', 'Unisex').
- Die Duftnoten aus deinen Beispielbildern automatisch als `notes` eintragen (wenn du mir eine Tabelle gibst).
- Die App direkt zurück auf deine Netlify‑Seite hochladen (dazu bräuchte ich Zugriff auf dein Netlify‑konto oder die Repo‑Daten).

Viel Spaß — sag mir, wenn ich das ZIP hochladen oder eine Vorschau öffnen soll.
