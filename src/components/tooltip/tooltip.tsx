
import { Component, Element, Listen, Prop } from '@stencil/core';


@Component({
  tag: 'pea11y-tooltip',
  styleUrl: "tooltip.css"
})
export class Tooltip {

  @Element() tooltip: HTMLElement;
  @Prop() tooltipLabel: string;
  @Prop() sameAsTxt: boolean = false;
  // @Prop() position: string = "top";

  id: string;
  describedElement: HTMLElement;
  tooltipElement: HTMLElement;

  componentWillLoad() {
    this.id = this.generateId("pea11y-tooltip");
  }

  componentDidLoad() {
    this.describedElement = this.tooltip.children[0].children[1] as HTMLElement;
    this.tooltipElement = this.tooltip.children[0].children[0] as HTMLElement;
    if (!this.sameAsTxt) {
      this.describedElement.setAttribute("aria-describedby", this.id);
    }
    this.describedElement.onfocus = () => this.onMouseEnterElement();
    this.describedElement.onblur = () => this.onMouseLeaveElement();
  }

  generateId(prefix) {
    var id = 0;
    while (document.getElementById(prefix + "-" + id)) {
      id = Math.floor(Math.random() * Math.floor(10000));
    }
    return prefix + "-" + id;
  }

  onMouseEnterElement() {
    this.tooltipElement.style.visibility = "visible";
    this.tooltipElement.style.top = -(this.describedElement.getBoundingClientRect().height + 10) + "px";
    this.tooltipElement.style.left = ((this.describedElement.getBoundingClientRect().width / 2) - (this.tooltipElement.getBoundingClientRect().width / 2)) + "px";
  }

  @Listen('keydown.escape')
  onMouseLeaveElement() {
    this.tooltipElement.style.visibility = "hidden";
  }


  render() {
    return (
      <div onMouseEnter={() => this.onMouseEnterElement()}
        onMouseLeave={() => this.onMouseLeaveElement()}>
        <div class="pea11y-tooltip" role="tooltip" id={this.id} aria-hidden="true">{this.tooltipLabel}</div>
        <slot />
      </div>
    );
  }
}
