/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import '@stencil/core';




export namespace Components {

  interface Pea11yRating {
    'classEmpty': string;
    'classHover': string;
    'classSelected': string;
    'label': string;
    'labelledby': string;
    'max': number;
    'readonly': boolean;
    'setValue': (newValue: number) => void;
    'textValues': any;
    'value': number;
  }
  interface Pea11yRatingAttributes extends StencilHTMLAttributes {
    'classEmpty'?: string;
    'classHover'?: string;
    'classSelected'?: string;
    'label'?: string;
    'labelledby'?: string;
    'max'?: number;
    'onOnChange'?: (event: CustomEvent) => void;
    'onOnMouseOver'?: (event: CustomEvent) => void;
    'readonly'?: boolean;
    'textValues'?: any;
    'value'?: number;
  }

  interface Pea11ySnippet {
    'dataCss': string;
    'dataHtml': string;
    'dataJs': string;
  }
  interface Pea11ySnippetAttributes extends StencilHTMLAttributes {
    'dataCss'?: string;
    'dataHtml'?: string;
    'dataJs'?: string;
  }

  interface Pea11yTabs {
    'label': string;
    'tabsNames': any;
  }
  interface Pea11yTabsAttributes extends StencilHTMLAttributes {
    'label'?: string;
    'tabsNames'?: any;
  }

  interface Pea11yTooltip {
    'sameAsTxt': boolean;
    'tooltipLabel': string;
  }
  interface Pea11yTooltipAttributes extends StencilHTMLAttributes {
    'sameAsTxt'?: boolean;
    'tooltipLabel'?: string;
  }

  interface Pea11yUxstars {
    'imgEmpty': string;
    'imgFull': string;
    'imgSize': any;
    'label': string;
    'value': number;
  }
  interface Pea11yUxstarsAttributes extends StencilHTMLAttributes {
    'imgEmpty'?: string;
    'imgFull'?: string;
    'imgSize'?: any;
    'label'?: string;
    'value'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'Pea11yRating': Components.Pea11yRating;
    'Pea11ySnippet': Components.Pea11ySnippet;
    'Pea11yTabs': Components.Pea11yTabs;
    'Pea11yTooltip': Components.Pea11yTooltip;
    'Pea11yUxstars': Components.Pea11yUxstars;
  }

  interface StencilIntrinsicElements {
    'pea11y-rating': Components.Pea11yRatingAttributes;
    'pea11y-snippet': Components.Pea11ySnippetAttributes;
    'pea11y-tabs': Components.Pea11yTabsAttributes;
    'pea11y-tooltip': Components.Pea11yTooltipAttributes;
    'pea11y-uxstars': Components.Pea11yUxstarsAttributes;
  }


  interface HTMLPea11yRatingElement extends Components.Pea11yRating, HTMLStencilElement {}
  var HTMLPea11yRatingElement: {
    prototype: HTMLPea11yRatingElement;
    new (): HTMLPea11yRatingElement;
  };

  interface HTMLPea11ySnippetElement extends Components.Pea11ySnippet, HTMLStencilElement {}
  var HTMLPea11ySnippetElement: {
    prototype: HTMLPea11ySnippetElement;
    new (): HTMLPea11ySnippetElement;
  };

  interface HTMLPea11yTabsElement extends Components.Pea11yTabs, HTMLStencilElement {}
  var HTMLPea11yTabsElement: {
    prototype: HTMLPea11yTabsElement;
    new (): HTMLPea11yTabsElement;
  };

  interface HTMLPea11yTooltipElement extends Components.Pea11yTooltip, HTMLStencilElement {}
  var HTMLPea11yTooltipElement: {
    prototype: HTMLPea11yTooltipElement;
    new (): HTMLPea11yTooltipElement;
  };

  interface HTMLPea11yUxstarsElement extends Components.Pea11yUxstars, HTMLStencilElement {}
  var HTMLPea11yUxstarsElement: {
    prototype: HTMLPea11yUxstarsElement;
    new (): HTMLPea11yUxstarsElement;
  };

  interface HTMLElementTagNameMap {
    'pea11y-rating': HTMLPea11yRatingElement
    'pea11y-snippet': HTMLPea11ySnippetElement
    'pea11y-tabs': HTMLPea11yTabsElement
    'pea11y-tooltip': HTMLPea11yTooltipElement
    'pea11y-uxstars': HTMLPea11yUxstarsElement
  }

  interface ElementTagNameMap {
    'pea11y-rating': HTMLPea11yRatingElement;
    'pea11y-snippet': HTMLPea11ySnippetElement;
    'pea11y-tabs': HTMLPea11yTabsElement;
    'pea11y-tooltip': HTMLPea11yTooltipElement;
    'pea11y-uxstars': HTMLPea11yUxstarsElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
