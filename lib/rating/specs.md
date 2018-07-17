Specifications du composant
===========================

Donnees
-------
* La valeur est recuperable
* Possibilite de preselectionner une valeur
* Possibilite de changer la valeur selectionnee
* Possibilite de choisir que 0 n'est pas autorise, dans ce cas cliquer a nouveau sur la valeur ne fait rien
* Possibilite de connaitre la valeur survolee

Affichage
---------
* Possibilite de styliser les icones selectionnes
* Possibilite de changer le nombre d'icones
* Possibilite de changer la forme de l'icone
* Possibilite d'ajouter une classe sur l'icone survolee

Souris
------
* Cliquer sur la valeur deja selectionnee reset le composant
* Les icones changent au passage de la souris

Clavier
-------
* Les fleches haut et droite augmentent jusqu'au max
* Les fleches bas et gauche diminuent jusqu'au minimum (0 ou 1)
* La touche Home selectionne la valeur minimale
* La touche Fin selectionne la valeur maximale
* Le composant est accessible au clavier via TAB sauf s'il est readonly

Formulaire
----------
* Possibilite de mettre le composant en "readonly"

NVDA
----
* Respecte le design pattern Slider
* On peut surcharger les noms dans NVDA lus
* En mode readonly NVDA ne lit que le label et la valeur
* On peut surcharger le label
