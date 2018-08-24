Pea11y Tooltip
==============

Ce composant permet d'afficher un tooltip au dessus d'un element.

Aria pattern
-------------
- L'element tooltip ne peut pas recevoir le focus
- Le tooltip apparait au focus de l'element et disparait quand on blur
- Le tooltip apparait au mouseover de l'element et disparait au mouseout
- ECHAP : ferme le tooltip
- L'element tooltip a le role *tooltip*
- L'element qui possede un tooltip possede l'attribut *aria-describedby* (**PE** : si le texte est le meme que le tooltip, faux car doublon)

Configuration
-------------
- *tooltip-label* : permet de donner le texte du tooltip (**obligatoire**)
- *same-as-txt* : si vrai, le tooltip n'est pas rendu et empeche que les lecteurs d'ecran lisent en doublon (defaut: false)

