import { Component, Prop, Method, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'pea11y-rating'
})
export class Rating {

  // Parametres
  @Prop() max: number = 5;
  @Prop({ mutable: true }) value: number;
  @Prop() allowEmpty: boolean = true;
  @Prop() readonly: boolean = false;
  @Prop() textValues: any;
  @Prop() labelledby: string;
  @Prop() label: string;
  @Prop() templateSelected: string = "★";
  @Prop() templateHover: string = "★";
  @Prop() templateEmpty: string = "☆";

  @State() hoveredValue: number;
  @Event() onChange: EventEmitter;
  @Event() onMouseOver: EventEmitter;

  @Method()
  setValue(newValue: number) {
    this.value = newValue;
    this.onChange.emit(newValue);
  }

  componentWillLoad() {
    this.setValue(0);
    this.setHoveredValue(0);
  }

  setHoveredValue(newValue: number) {
    this.hoveredValue = newValue;
    this.onMouseOver.emit(newValue);
  }

  onMouseOverElement(event: any) {
    event.preventDefault();
    this.setHoveredValue(parseInt(event.srcElement.dataset.id) + 1);
  }

  onClickOverElement(event: any) {
    event.preventDefault();
    var elementId = event.srcElement.dataset.id;
    if (this.allowEmpty && parseInt(elementId) + 1 === this.value) {
      this.setValue(0);
    } else {
      this.setValue(parseInt(elementId) + 1);
    }
  }

  onMouseLeave(event: any) {
    event.preventDefault();
    this.setHoveredValue(0);
  }

  renderElement(index: number) {
    let template;
    if (this.hoveredValue && index < this.hoveredValue) {
      template = this.templateHover;
    } else if (this.value && index < this.value) {
      template = this.templateSelected;
    } else {
      template = this.templateEmpty;
    }
    return <span aria-hidden="true" data-id={index} onMouseOver={(ev) => this.onMouseOverElement(ev)} onClick={(ev) => this.onClickOverElement(ev)}>{template}</span>;
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

    return (
      <div onMouseLeave={(ev) => this.onMouseLeave(ev)}>{tabElems}</div>
    );
  }
}
