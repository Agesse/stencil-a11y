Specifications du composant
===========================

ARIA Pattern
------------
Ce composant respecte le pattern ARIA "slider" :
* FLECHE DROITE : augmente la valeur de 1
* FLECHE HAUT : augmente la valeur de 1
* FLECHE GAUCHE : diminue la valeur de 1
* FLECHE BAS : diminue la valeur de 1
* HOME : selectionne la valeur minimale
* END : selectionne la valeur maximale
* Le focus est mis sur le slider, l'objet qui visuellement bouge (donc l'icone en cours)
* L'element slider qui a le focus a le role *slider*
* L'element slider a une propriete *aria-valuenow* representant la valeur courante
* L'element slider a une propriete *aria-valuemin* representant la valeur minimum autorisee
* L'element slider a une propriete *aria-valuemax* representant la valeur maximum autorisee
* Si la valeur de *aria-valuenow* est peu comprehensible, on peut ajouter une propriete *aria-valuetext* avec une valeur en string
* Si le slider a un label visible, il est indique via *aria-labelledby*, sinon il faut un *aria-label*

Donnees
-------
* La valeur est recuperable
* Possibilite de preselectionner une valeur
* Possibilite de changer la valeur selectionnee
* Possibilite de choisir que 0 n'est pas autorise, dans ce cas cliquer a nouveau sur la valeur ne fait rien (**A REVOIR ??**)
* Possibilite de connaitre la valeur survolee

Affichage
---------
* Possibilite de changer le nombre d'icones
* Possibilite de changer la forme de l'icone
* Ajout d'une classe sur l'icone survolee
* Possibilite de choisir un template HTML pour les icones selectionnees
* Possibilite de choisir un template HTML pour les icones vides
* Possibilite de choisir un template HTML pour les icones survolees

Souris
------
* Cliquer sur la valeur deja selectionnee reset le composant
* Les icones changent au passage de la souris

Clavier
-------
* Le composant est accessible au clavier via TAB sauf s'il est readonly

Formulaire
----------
* Possibilite de mettre le composant en "readonly"

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
* On peut surcharger les noms lus dans NVDA
* En mode readonly NVDA ne lit que le label et la valeur
* On peut surcharger le label
