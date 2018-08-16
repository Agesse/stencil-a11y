import { Component, Prop, Listen, Element } from '@stencil/core';
import * as Render from "./utils";

export interface TabElement {
  name: string;
  id: string;
}

@Component({
  tag: 'pea11y-tabs'
})
export class Tabs {

  // Parametres
  @Prop() tabsNames: TabElement[];
  @Prop() label: string;

  // Variables 
  @Element() tabElement: HTMLElement;
  componentId: string;

  data: any = {};
  activeTab = 0;


  componentWillLoad() {
    this.componentId = Render.generateId("pea11y-tabs");
    this.tabElement.setAttribute("id", this.componentId);
  }

  componentDidLoad() {
    var tabPanels = this.tabElement.getElementsByClassName("pea11y-tabs-panels")[0].children as HTMLCollectionOf<HTMLElement>;
    for (var i = 0, l = tabPanels.length; i < l; i++) {
      if (i > 0) {
        tabPanels[i].style.display = "none";
      }
      tabPanels[i].setAttribute("role", "tabpanel");
      tabPanels[i].setAttribute("id", this.componentId + "-" + this.tabsNames[i].id + "-tabpanel");
      tabPanels[i].setAttribute("aria-labelledby", this.componentId + "-" + this.tabsNames[i].id + "-tab");
    }
  }


  @Listen('keydown.left')
  handleLeftArrow(ev) {
    this.changeTab(ev.srcElement, false);
  }

  @Listen('keydown.right')
  handleRightArrow(ev) {
    this.changeTab(ev.srcElement, true);
  }

  onClickTab(ev) {
    this.changeTab(ev.srcElement, false, true);
  }


  changeTab(srcElement: any, next: boolean, click?: boolean) {
    var tabList = srcElement.parentElement.childNodes;
    var tabPanelList = srcElement.parentElement.parentElement.childNodes[1].children;
    var newActiveTab;
    if (click) {
      for (var i = 0, l = tabList.length; i < l; i++) {
        if (srcElement == tabList[i]) {
          newActiveTab = i;
        }
      }
    } else {
      newActiveTab = next ? this.activeTab + 1 : this.activeTab - 1;
    }

    // boucle sur les onglets
    if (newActiveTab < 0) {
      newActiveTab = tabList.length - 1;
    } else if (newActiveTab > tabList.length - 1) {
      newActiveTab = 0;
    }
    Render.activateButton(tabList[newActiveTab]);
    Render.deactivateButton(tabList[this.activeTab]);
    tabPanelList[this.activeTab].style.display = "none";
    tabPanelList[newActiveTab].style.display = "block";
    this.activeTab = newActiveTab;
  }


  renderTabButton(tabElement: TabElement, index: number) {
    let tabIndex = -1;
    let selected = false;
    if (index === 0) {
      tabIndex = 0;
      selected = true;
    }
    return <button role="tab"
      class={index === 0 ? "active" : null}
      onClick={ev => this.onClickTab(ev)}
      key={tabElement.id}
      aria-selected={selected}
      aria-controls={this.componentId + "-" + tabElement.id + "-tabpanel"}
      id={this.componentId + "-" + tabElement.id + "-tab"}
      tabindex={tabIndex}>{tabElement.name}</button>;
  }


  render() {
    if (!this.label) {
      console.error("pea11y-tabs: You need to specify a label to comply with accessibility standards.");
      return;
    }

    var tabElems = []; // liste des onglets disponibles
    var tabpanelElems = []; // liste des panels associes

    for (var i = 0, l = this.tabsNames.length; i < l; i++) {
      tabElems.push(this.renderTabButton(this.tabsNames[i], i));
      tabpanelElems.push(<slot name={this.tabsNames[i].id} />);
    }

    return (
      <div class="pea11y-tabs-content">
        <div role="tablist" aria-label={this.label}>
          {tabElems}
        </div>
        <div class="pea11y-tabs-panels">
          {tabpanelElems}
        </div>
      </div>
    );
  }
}
