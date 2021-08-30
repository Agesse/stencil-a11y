# Installation

```sh
npm i -S @pe-a11y/web-components
```

puis dans le module qui consomme les web-components, ajouter le schemas CUSTOM_ELEMENT_SCHEMA

```
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import { defineCustomElements } from "@pe-a11y/web-components/dist/loader";
defineCustomElements(window);

@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  ...
})
export class MonModuleCustom {}
```

il est ensuite possible d'utiliser les composants stencil directement depuis le HTML
