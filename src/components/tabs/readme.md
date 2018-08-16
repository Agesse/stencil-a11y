PeA11y Tabs
==============

Ce composant permet d'afficher des onglets contenant des templates HTML. 

ARIA Pattern
------------

Ce composant respecte le pattern "tabs" avec activation automatique :

- TAB : quand le focus arrive dans la liste d'onglets, place le focus sur le premier onglet actif. Quand le focus est sur la liste d'onglets, bouge le focus au prochain element dans la page de la sequence de tabulation (typiquement le 1er element focusable du panel).
- GAUCHE : bouge le focus sur l'onglet precedent. **TODO** Si le focus est sur le 1er onglet, bouge le focus sur le dernier onglet. Active l'onglet qui a le focus.
- DROITE : bouge le focus sur l'onglet suivant. **TODO** Si le focus est sur le dernier onglet, bouge le focus sur le 1er onglet. Active l'onglet qui a le focus.

- L'element qui contient l'ensemble des onglets a un role *tablist*
- **TODO** L'element tablist contient un label via *aria-label* ou *aria-labelledby*

- Chaque element qui sert d'onglet a pour role *tab* et est contenu dans l'element *tablist*
- Chaque element qui contient un contenu d'onglet (panel) a pour role *tabpanel*

- Chaque element ayant pour role *tab* a une propriete *aria-controls* avec pour valeur l'id de l'element *tabpanel* associe
- Chaque element ayant pour role *tabpanel* a une propriete *aria-labelledby* avec pour valeur l'id de l'element *tab* associe

- L'onglet actif a la propriete *aria-selected* a true et les autres onglets a false


Configuration
-------------
* **tabs-names** : (OBLIGATOIRE)
Pour l'utiliser, il faut donner un objet contenant le nom des tabs et un id simple par lesquels les differencier, exemple :
```js
[
  { name: 'Confiture de cerise', id: 'cerise' },
  { name: 'Frites belges', id: 'frites' },
  { name: 'Cookies', id: 'cookies' },
  { name: 'Limonade', id: 'limonade' }
]
```

* **label** : un label pour l'onglet (OBLIGATOIRE)

Ensuite il faut utiliser l'attribut "slot" sur l'element a injecter dans le panel, avec l'id du panel en question :
```html
<div slot="cookies">
  <p>Des cookies</p>
</div>
```
