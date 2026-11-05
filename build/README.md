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

## Assistance

La section « Assistance » calcule les heures d'arrivée à chaque point à partir du tableau de marche. Les suiveurs saisissent le dernier passage, qui reste sur leur téléphone et peut être partagé par lien (`#p=course|point|horodatage`).
Pour pousser un passage à tout le monde, compléter `live.json` : `{"race":"diag","pass":[{"nm":"Hell-Bourg","at":"2027-10-15T15:40"}]}` (heure locale de la course).

## Jumeau local

`python3 build/twin.py . <dossiers ou fichiers .fit>` ajoute les sorties à `build/twin-lib.json` (sorties avec du relief à moins de 120 km de Nice, rééchantillonnées tous les 50 m, départ et arrivée masqués sur 1 km), découpe chaque parcours de `courses/` en montées, descentes et portions roulantes, puis cherche dans les sorties les portions au profil le plus proche (dans les deux sens). Résultat : `twin.json`, affiché dans l'appli (Plus › Jumeau local). Un nouveau GPX dans `courses/` est analysé automatiquement au build suivant.
