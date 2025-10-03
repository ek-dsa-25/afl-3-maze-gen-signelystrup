# Aflevering 3: Maze Generator

## Opgavebeskrivelse

I denne afleveringsopgave skal du tilføje tilfældighed til maze generatoren for
at skabe mere varierede og interessante labyrint-mønstre.

## Opgaven

Den nuværende maze generator bruger en depth-first search algoritme med en
stack til at generere labyrinten. Algoritmen vælger altid det senest tilføjede
element fra stakken (det øverste element), hvilket kan skabe forudsigelige
mønstre.

Dine to opgaver er:

1. **Tilføj en tilfældighedsparameter** til maze generatoren i stedet for altid
   at vælge det øverste element fra stakken, skal algoritmen have en vis
   sandsynlighed for at vælge et tilfældigt element fra stakken

2. **Tilføj noget, der gør det til DIN labyrint-generator!** Det er ikke vigtigt
   at det er avanceret, men det skal være personligt. Det kan være flere farver,
   eller rundere hjørner, eller at algoritmen opfører sig meget anderledes end
   recursive backtracking. For eksempel kunne du tilføje et element fra [recursive
   division algorithm][rec-div-algo]. Du må gerne vibe-kode den her del.

[rec-div-algo]: https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm

## Tekniske krav

- Tilføj en parameter der bestemmer sandsynligheden for tilfældigt valg (f.eks. som en procent)
- Når algoritmen skal vælge næste celle fra stakken:
  - Med den angivne sandsynlighed: vælg et tilfældigt element fra stakken
  - Ellers: vælg det øverste element som normalt (LIFO - Last In, First Out)

## Anbefalet tilgang

En god startværdi for tilfældighed kunne være **25%** - dette giver en balance
mellem struktur og variation. Der er dog ikke ét rigtigt svar, og du opfordres
til at eksperimentere med forskellige procentsatser for at se hvordan det
påvirker labyrintens udseende og kompleksitet.

## Filer

- `index.html` - HTML-siden med canvas elementet
- `maze.js` - JavaScript kode med Cell og Maze klasserne

## Sådan kører du programmet

Åbn `index.html` i en webbrowser for at se maze generatoren i aktion.

Reload siden når du laver ændringer. Måske skal du "hard-reloade" (Ctrl + Shift + R)
hvis JavaScript'en ikke genindlæser, fordi den ligger cachet i sin egen fil.
