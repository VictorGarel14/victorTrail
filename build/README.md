# Régénérer le site

Le site (`index.html` + `img/`) est construit à partir des données du carnet d'entraînement.

1. Récupérer la page du carnet (artifact) dans `carnet.html` et les documents `state`, `acts-*`, `kitviz` de sa base dans un dossier `db/`.
2. `python3 build/extract.py carnet.html db/ data.json` (Playwright + Chromium)
3. `python3 build/build_site.py data.json db/state.json .`

Les images de tenue (`img/tenue-*.webp`) ne changent que si le matériel change.
