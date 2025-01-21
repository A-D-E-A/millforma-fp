Paradigme :
    Une façon d'approcher la programmation

Exemples de langages fonctionnels : 
    - LISP (Common Lisp, Clojure Janet, Racket)
    - Haskell
    - F#

Programmation fonctionnelle :
    Sous-paradigme de programmation déclarative avec les critères suivants :
        - Fonctions en "first-class citizen"
        - Fonctions de premier ordre
        - Immutabilité
        - Fonctions pures (sans effet de bord, qui est "idempotent" : "pour une même entrée, une même sortie")

Programmation déclarative :
    Préciser ce qu'on veut, au lieu de préciser comment l'avoir.
    Décrire les données et la structure du code, au lieu des instructions.


- Immutabilité
- Fonctions de premier ordre (map, filter, etc)
- Currying (notamment pour créer des mappings, ou créer plus facilement des fonctions quasi-identiques)
- Closures (pour garder l'état du scope)
- Monades (pour itérer sur une valeur "wrappée", sans avoir à connaître la valeur interne, exemple promise)
