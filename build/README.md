# Régénérer le site

Le site (`index.html` + `img/`) est construit à partir des données du carnet d'entraînement.

1. Récupérer la page du carnet (artifact) dans `carnet.html` et les documents `state`, `acts-*`, `kitviz` de sa base dans un dossier `db/`.
2. `python3 build/extract.py carnet.html db/ data.json` (Playwright + Chromium)
3. `python3 build/build_site.py data.json db/state.json .`

Les images de tenue (`img/tenue-*.webp`) ne changent que si le matériel change.

## Suivi en direct

Le bandeau « EN DIRECT » s'affiche quand `live.json` (à la racine) contient un lien :

```json
{"url": "https://…lien Coros Live Tracking…", "title": "Sortie longue au Mont Chauve", "from": null, "until": "2026-11-15T18:00:00+01:00"}
```

Le site relit ce fichier toutes les minutes. Pour couper le direct : remettre `"url": ""`. Le build hebdomadaire ne touche pas à ce fichier.
