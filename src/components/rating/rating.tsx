import { Component, Prop, Method, State } from '@stencil/core';

@Component({
  tag: 'pea11y-rating'
})
export class Rating {

  // Parametres
  @Prop() max: number = 5;
  @Prop({ mutable: true }) value: number = 0;
  @Prop() allowEmpty: boolean = true;
  @Prop() readonly: boolean = false;
  @Prop() textValues: any;
  @Prop() labelledby: string;
  @Prop() label: string;
  @Prop() templateSelected: string = "★";
  @Prop() templateHover: string = "★";
  @Prop() templateEmpty: string = "☆";

  @State() hoveredValue: number = 0;

  @Method()
  set(newValue: number) {
    this.value = newValue;
  }

  onMouseOverElement(event: any) {
    event.preventDefault();
    this.hoveredValue = parseInt(event.srcElement.dataset.id) + 1;
    // opts.onmouseover.call();
  }

  onClickOverElement(event: any) {
    event.preventDefault();
    var elementId = event.srcElement.dataset.id;
    if (this.allowEmpty && parseInt(elementId) + 1 === this.value) {
      this.value = 0;
    } else {
      this.value = parseInt(elementId) + 1;
    }
  }

  onMouseLeave(event: any) {
    event.preventDefault();
    this.hoveredValue = 0;
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
