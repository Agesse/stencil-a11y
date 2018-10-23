Specifications du composant
===========================

Structure HTML : Boutons radios
-------------------------------
* L'element racine est un element <div> :
  * L'element racine a pour l'attribut *role=group*
  * L'element racine possede un *id* unique
  * L'element racine a soit un attribut *aria-label*, soit un attribut *aria-labelledby*
  * L'element racine contient une liste d'elements <label>

* Chaque element <label> possede :
  * un attribut *for* avec l'id de l'element <input> correspondant
  * un element <input>
  * un element <span> pour l'affichage de l'icone
  * un element <span> contenant le texte pour les lecteurs d'ecran

* Chaque element <input> possede :
  * un attribut *type="radio"*
  * un *id* unique
  * un attribut *name* contenant l'id de l'element racine
  * un attribut *value* contenant la valeur numerique correspondante

* Chaque element <span> affichant une icone possede :
  * une liste de classe customisee
  * la classe "pea11y-rating-checkmark"
  * l'attribut *aria-hidden=true*
  * l'attribut *title* avec la valeur de l'attribut *value* de l'input si aucune surcharge textuelle, sinon l'equivalent textuel

* Chaque element <span> contenant du texte a destination des lecteurs d'ecran possede :
  * la classe "sr-only"
  * le meme texte que l'attribut *title* de l'autre span


Donnees
-------
* La valeur selectionnee est recuperable
* Possibilite de preselectionner une valeur
* Possibilite de changer la valeur selectionnee
* Possibilite de connaitre la valeur survolee


Affichage
---------
* Possibilite de changer le nombre d'icones
* Possibilite de choisir des classes CSS pour les icones selectionnees
* Possibilite de choisir des classes CSS pour les icones vides
* Possibilite de choisir des classes CSS pour les icones survolees

Souris
------
* CLICK : selectionne la valeur
* MOUSEOVER : les icones de la 1ere a celle survolee adoptent le template HTML pour icone survolee
* MOUSEOUT : le survol est reinitialise

Clavier
-------
* Le composant est accessible au clavier via TAB sauf s'il est readonly

Formulaire
----------
* Possibilite de mettre le composant en "readonly"

NgModel
-------
- **TODO** ng-pristine: la classe est presente sur le composant tant qu'il n'a jamais ete focus
- **TODO** ng-dirty: la classe remplace ng-pristine si le composant a ete focus
- **TODO** ng-untouched: la classe est presente tant que le composant n'a jamais eu d'evenements blur
- **TODO** ng-touched: la classe remplace ng-untouched si le composant a ete focus
- **TODO** ng-readonly: le composant ne peut pas changer de valeur
- **TODO** ng-required: le composant ne peut pas avoir une valeur de 0

NVDA
----
* On peut surcharger les noms lus dans NVDA
* En mode readonly NVDA ne lit que le label, si present, et la valeur
