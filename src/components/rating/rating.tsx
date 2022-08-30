import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";

@Component({
  tag: "pea11y-rating",
  styleUrl: "rating.css",
})
export class Rating {
  // Parametres
  @Prop() max: number = 5; // nombre maximum d'icones
  @Prop({ mutable: true, reflect: true }) value: number; // valeur selectionnee
  @Prop() readonly: boolean = false; // vrai si le composant est seulement en lecture
  @Prop({ mutable: true }) textValues: any; // valeurs textuelles restituees par le lecteur d'ecran a la place des valeurs numeriques
  @Prop() labelledby: string; // id de l'element qui contient le label
  @Prop() label: string; // label du composant
  @Prop() classSelected: string = `fas fa-star`;
  @Prop() classHover: string = `fas fa-star`;
  @Prop() classEmpty: string = `far fa-star`;
  @Prop() resultText: string = null; // texte a afficher avant la valeur
  @Prop() showText: boolean = true; // afficher ou non la valeur

  @Element() ratingElem: HTMLElement; // reference de l'element
  @State() hoveredValue: number; // valeur survolee
  @Event() pea11yRatingChange: EventEmitter; // evenement emis au changement de valeur
  @Event() pea11yRatingHover: EventEmitter; // evenement emis au survol d'une valeur
  @Event() pea11yRatingLeave: EventEmitter; // evenement emis lorsqu'on sort du composant

  elementId: string;

  // Change la valeur et emet l'evenement correspondant, permet de changer la valeur de l'exterieur du composant
  @Method()
  setValue(newValue: number) {
    this.value = newValue;
    this.pea11yRatingChange.emit(newValue);
  }

  // Change la valeur survolee et emet l'evenement correspondant
  setHoveredValue(newValue: number) {
    this.hoveredValue = newValue;
    this.pea11yRatingHover.emit(newValue);
  }

  // Execute juste avant le chargement du composant
  componentWillLoad() {
    this.elementId = this.generateId("pea11y-rating");

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
      this.pea11yRatingChange.emit(this.value); // important pour recuperer la valeur initiale
    }
    this.setHoveredValue(0);
  }

  onMouseOverElement(event: any) {
    event.preventDefault();
    this.setHoveredValue(parseInt(event.currentTarget.firstChild.value));
  }

  onClickOverElement(event: any) {
    event.preventDefault();
    this.setValue(parseInt(event.currentTarget.firstChild.value));
  }

  onMouseLeave(event: any) {
    event.preventDefault();
    this.setHoveredValue(0);
    this.pea11yRatingLeave.emit(this.value);
  }

  // Cree les differents boutons radios
  renderElement(index: number) {
    let classList;
    if (this.hoveredValue && index < this.hoveredValue) {
      classList = this.classHover;
    } else if (this.value && index < this.value) {
      classList = this.classSelected;
    } else {
      classList = this.classEmpty;
    }
    classList += " pea11y-rating-checkmark";

    if (this.readonly) {
      return <span class={classList} aria-hidden="true"></span>;
    } else {
      let checked = index + 1 === this.value ? true : false;
      const attributes = checked ? { checked } : {};

      return (
        <div
          class="pea11y-radio-container"
          onMouseOver={(ev) => this.onMouseOverElement(ev)}
          onClick={(ev) => this.onClickOverElement(ev)}
          role="presentation">
          <input
            type="radio"
            id={this.elementId + "-" + index}
            name={this.elementId}
            value={index + 1}
            {...attributes}
          />
          <label htmlFor={this.elementId + "-" + index} class="sr-only">
            {this.textValues[index + 1]}
          </label>
          <span class={classList} aria-hidden="true"></span>
        </div>
      );
    }
  }

  render() {
    if (!this.label && !this.labelledby) {
      console.error(
        "pea11y-rating: You need to specify either a 'label' or 'labelledby' property to comply with accessibility standards."
      );
      return;
    }

    var tabElems = []; // tableau des elements HTML representant une note
    for (var i = 0; i < this.max; i++) {
      tabElems.push(this.renderElement(i));
    }

    if (this.readonly) {
      let textReadElems = [];
      if (this.label) {
        textReadElems.push(<span class="sr-only">{this.label}:&nbsp;</span>);
      }
      if (this.resultText) {
        textReadElems.push(
          <span>
            {this.resultText}&nbsp;{this.textValues[this.value]}
          </span>
        );
      } else if (this.showText) {
        textReadElems.push(<span>{this.textValues[this.value]}</span>);
      } else {
        textReadElems.push(
          <span class="sr-only">{this.textValues[this.value]}</span>
        );
      }
      textReadElems.push(
        <span class="sr-only">
          &nbsp;({this.value}/{this.max})
        </span>
      );

      return [
        <div>{tabElems}</div>,
        <p class="pea11y-rating-selection">{textReadElems}</p>,
      ];
    } else {
      let textReadElems = [];
      if (this.showText) {
        let showedValue = this.hoveredValue ? this.hoveredValue : this.value;
        if (this.resultText) {
          textReadElems.push(
            <span>
              {this.resultText}&nbsp;{this.textValues[showedValue]}
            </span>
          );
        } else {
          textReadElems.push(<span>{this.textValues[showedValue]}</span>);
        }
        textReadElems.push(<span class="sr-only">&nbsp;sélectionné</span>);
      }

      return [
        <div
          id={this.elementId}
          role="radiogroup"
          onMouseLeave={(ev) => this.onMouseLeave(ev)}
          aria-label={this.label}
          aria-labelledby={this.labelledby}>
          {tabElems}
        </div>,
        <p class="pea11y-rating-selection">{textReadElems}</p>,
      ];
    }
  }

  generateId(prefix) {
    var id = 0;
    while (document.getElementById(prefix + "-" + id)) {
      id = Math.floor(Math.random() * Math.floor(10000));
    }
    return prefix + "-" + id;
  }
}
