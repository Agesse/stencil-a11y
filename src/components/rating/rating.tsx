import { Component, Prop, Method, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'pea11y-rating'
})
export class Rating {

  // Parametres
  @Prop() max: number = 5; // nombre maximum d'icones
  @Prop({ mutable: true, reflectToAttr: true }) value: number; // valeur selectionnee
  @Prop() readonly: boolean = false; // vrai si le composant est seulement en lecture
  @Prop({ mutable: true }) textValues: any; // valeurs textuelles restituees par le lecteur d'ecran a la place des valeurs numeriques
  @Prop() labelledby: string; // id de l'element qui contient le label
  @Prop() label: string; // label du composant
  @Prop() templateSelected: string = "★";
  @Prop() templateHover: string = "★";
  @Prop() templateEmpty: string = "☆";

  @Element() ratingElem: HTMLElement; // reference de l'element
  @State() hoveredValue: number; // valeur survolee
  @Event() onChange: EventEmitter; // evenement emis au changement de valeur
  @Event() onMouseOver: EventEmitter; // evenement emis au survol d'une valeur

  // Change la valeur et emet l'evenement correspondant, permet de changer la valeur de l'exterieur du composant
  @Method()
  setValue(newValue: number) {
    this.value = newValue;
    this.onChange.emit(newValue);
  }

  // Change la valeur survolee et emet l'evenement correspondant
  setHoveredValue(newValue: number) {
    this.hoveredValue = newValue;
    this.onMouseOver.emit(newValue);
  }

  // Execute juste avant le chargement du composant
  componentWillLoad() {
    // Cree le tableau qui servira de label a chaque bouton radio, avec les valeurs numeraires si rien n'est specifie
    if (this.textValues && typeof this.textValues === "string") {
      this.textValues = this.textValues.split(",");
    } else {
      let numberValues = [];
      for (let i = 0; i <= this.max; i++) {
        numberValues.push(i.toString());
      }
      this.textValues = numberValues;
    }

    if (!this.value) {
      this.setValue(0);
    } else {
      this.onChange.emit(this.value); // important pour recuperer la valeur initiale
    }
    this.setHoveredValue(0);
  }


  onMouseOverElement(event: any) {
    event.preventDefault();
    this.setHoveredValue(parseInt(event.currentTarget.dataset.id) + 1);
  }

  onClickOverElement(event: any) {
    event.preventDefault();
    var elementId = event.currentTarget.dataset.id;
    this.setValue(parseInt(elementId) + 1);
  }

  onMouseLeave(event: any) {
    event.preventDefault();
    this.setHoveredValue(0);
  }

  onKeydownValueElement(ev, index) {

    switch (ev.keyCode) {

      // ESPACE : valider la valeur
      case 32:
        ev.preventDefault();
        this.setValue(index + 1);
        break;

      // DROITE & BAS : augmenter de 1 la valeur
      case 39:
      case 40:
        ev.preventDefault();
        let nextValue = index + 2 <= this.max ? index + 2 : 1;
        this.setValue(nextValue);
        //@ts-ignore
        this.ratingElem.children[0].children[nextValue - 1].focus();
        break;

      // GAUCHE & HAUT : diminuer de 1 la valeur
      case 37:
      case 38:
        ev.preventDefault();
        let prevValue = index === 0 ? this.max : index;
        this.setValue(prevValue);
        //@ts-ignore
        this.ratingElem.children[0].children[prevValue - 1].focus();
        break;

      default:
        break;
    }
  }

  // Cree les differents boutons radios
  renderElement(index: number) {
    let templateType;
    if (this.hoveredValue && index < this.hoveredValue) {
      templateType = "hover";
    } else if (this.value && index < this.value) {
      templateType = "selected";
    } else {
      templateType = "empty";
    }

    let styleSelected = {
      display: templateType === "selected" ? "inline-block" : "none"
    }
    let styleHover = {
      display: templateType === "hover" ? "inline-block" : "none"
    }
    let styleEmpty = {
      display: templateType === "empty" ? "inline-block" : "none"
    }

    if (this.readonly) {

      return (
        <span aria-hidden="true">
          <span style={styleSelected} innerHTML={this.templateSelected}></span>
          <span style={styleHover} innerHTML={this.templateHover}></span>
          <span style={styleEmpty} innerHTML={this.templateEmpty}></span>
        </span>);

    } else {
      let checked = index + 1 === this.value ? "true" : "false";

      let tabindex;
      if ((this.value === 0 && index === 0) || (index + 1 === this.value)) {
        tabindex = "0";
      } else {
        tabindex = "-1";
      }

      return (
        <span role="radio"
          tabindex={tabindex}
          data-id={index}
          onKeyDown={(ev) => this.onKeydownValueElement(ev, index)}
          onMouseOver={(ev) => this.onMouseOverElement(ev)}
          onClick={(ev) => this.onClickOverElement(ev)}
          aria-checked={checked}
          aria-label={this.textValues[index + 1]}>
          <span style={styleSelected} innerHTML={this.templateSelected}></span>
          <span style={styleHover} innerHTML={this.templateHover}></span>
          <span style={styleEmpty} innerHTML={this.templateEmpty}></span>
        </span>);
    }
  }

  render() {
    if (!this.label && !this.labelledby) {
      console.error("pea11y-rating: You need to specify either property 'label' or 'labelledby' to comply with accessibility standards.");
      return;
    }

    var tabElems = []; // tableau des elements HTML representant une note
    for (var i = 0; i < this.max; i++) {
      tabElems.push(this.renderElement(i));
    }

    if (this.readonly) {
      return (
        <div>
          {tabElems}
          <span class="sr-only">{this.label + ": " + this.textValues[this.value]}</span>
        </div>
      );
    } else {
      return (
        <div role="radiogroup" onMouseLeave={(ev) => this.onMouseLeave(ev)} aria-label={this.label} aria-labelledby={this.labelledby}>
          {tabElems}
        </div>
      );
    }
  }
}
