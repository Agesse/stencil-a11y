Specifications du composant
===========================

ARIA Pattern
------------
Ce composant respecte le pattern ARIA "Radio button" :
* OK : FLECHE DROITE et BAS : bouge le focus a la valeur suivante, decoche la valeur en cours et coche la suivante. Boucle sur les valeurs.
* OK : FLECHE GAUCHE et HAUT : bouge le focus a la valeur precedente, decoche la valeur en cours et coche la precedente. Boucle sur les valeurs.
* OK : ESPACE : selectionne la valeur

* OK : Quand un groupe de bouton radio recoit le focus, si une valeur etait deja selectionnee, focus la valeur, sinon focus le premier element.
* OK : Les boutons radios sont contenus dans un element avec un role "radiogroup"
* OK : Chaque element bouton radio a le role "radio"
* OK : Si un bouton radio est coche, son attribut *aria-checked* est "true", sinon "false"
* OK : Chaque bouton radio a un label specifie via *aria-label*
* OK : Le groupe de boutons radios a un label via *aria-label* ou un label visible reference par *aria-labelledby*

Donnees
-------
* OK : La valeur selectionnee est recuperable
* OK : Possibilite de preselectionner une valeur
* OK : Possibilite de changer la valeur selectionnee
* OK : Possibilite de connaitre la valeur survolee

Affichage
---------
* OK : Possibilite de changer le nombre d'icones
* OK : Possibilite de choisir un template HTML pour les icones selectionnees
* OK: Possibilite de choisir un template HTML pour les icones vides
* OK: Possibilite de choisir un template HTML pour les icones survolees

Souris
------
* OK : CLICK : selectionne la valeur
* OK : MOUSEOVER : les icones de la 1ere a celle survolee adoptent le template HTML pour icone survolee
* OK : MOUSEOUT : le survol est reinitialise

Clavier
-------
* OK : Le composant est accessible au clavier via TAB sauf s'il est readonly

Formulaire
----------
* OK : Possibilite de mettre le composant en "readonly"

NgModel
-------
- ng-pristine: la classe est presente sur le composant tant qu'il n'a jamais ete focus
- ng-dirty: la classe remplace ng-pristine si le composant a ete focus
- ng-untouched: la classe est presente tant que le composant n'a jamais eu d'evenements blur
- ng-touched: la classe remplace ng-untouched si le composant a ete focus
- ng-readonly: le composant ne peut pas changer de valeur
- ng-required: le composant ne peut pas avoir une valeur de 0

NVDA
----
* OK : On peut surcharger les noms lus dans NVDA
* KO : En mode readonly NVDA ne lit que le label et la valeur (**manque le labelledby**)
