import { Component, Prop, Listen, Element } from '@stencil/core';
import * as Render from "./utils";
import * as Prism from "prismjs";

@Component({
  tag: 'pea11y-snippet'
})
export class Snippet {

  // Parametres
  @Prop() dataHtml: string;
  @Prop() dataJs: string;
  @Prop() dataCss: string;

  // Variables 
  @Element() snippetEl: HTMLElement;
  data: any = {};
  activeTab = 0;
  componentId: string;

  componentWillLoad() {
    this.componentId = Render.generateId("pea11y-snippet");
    this.snippetEl.setAttribute("id", this.componentId);

    var promiseHTMl = this.dataHtml ? fetch(this.dataHtml)
      .then(response => response.text()) : null;
    var promiseJS = this.dataJs ? fetch(this.dataJs)
      .then(response => response.text()) : null;
    var promiseCSS = this.dataCss ? fetch(this.dataCss)
      .then(response => response.text()) : null;

    return Promise.all([promiseHTMl, promiseJS, promiseCSS])
      .then(values => {
        this.data.html = values[0];
        this.data.js = values[1];
        this.data.css = values[2];
      });
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
    var tabPanelList = srcElement.parentElement.parentElement.childNodes[1].childNodes;
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

    if (newActiveTab > -1 && newActiveTab < tabList.length) {
      Render.activateButton(tabList[newActiveTab]);
      Render.deactivateButton(tabList[this.activeTab]);
      tabPanelList[this.activeTab].hidden = true;
      tabPanelList[newActiveTab].hidden = false;
      this.activeTab = newActiveTab;
    }
  }


  renderTabButton(type: string) {
    let tabTxt: string;
    let tabIndex = -1;
    let selected = false;
    switch (type) {
      case "html":
        tabTxt = "HTML";
        tabIndex = 0;
        selected = true;
        break;
      case "js":
        tabTxt = "Javascript";
        break;
      case "css":
        tabTxt = "CSS";
        break;
    }
    return <button role="tab"
      class={type == "html" ? "active" : null}
      onClick={ev => this.onClickTab(ev)}
      key={type}
      aria-selected={selected}
      aria-controls={this.componentId + "-" + type + "-tabpanel"}
      id={this.componentId + "-" + type + "-tab"}
      tabindex={tabIndex}>{tabTxt}</button>;
  }


  renderTabPanel(type: string) {
    let language;
    let data;
    let prismGrammar;
    let hidden = true;
    switch (type) {
      case "html":
        language = "markup";
        data = this.data.html;
        prismGrammar = Prism.default.languages.markup;
        hidden = false;
        break;
      case "js":
        language = "javascript";
        data = this.data.js;
        prismGrammar = Prism.default.languages.javascript;
        break;
      case "css":
        language = "css";
        data = this.data.css;
        prismGrammar = Prism.default.languages.css;
        break;
    }
    return <pre class={"language-" + language}
      key={type}
      role="tabpanel"
      id={this.componentId + "-" + type + "-tabpanel"}
      aria-labelledby={this.componentId + "-" + type + "-tab"}
      hidden={hidden}>
      <code class={"language-" + language} innerHTML={Prism.default.highlight(data, prismGrammar)}></code>
    </pre>;
  }


  render() {
    var tabElems = []; // liste des onglets disponibles
    var tabpanelElems = []; // liste des panels associes
    if (this.dataHtml) {
      tabElems.push(this.renderTabButton("html"));
      tabpanelElems.push(this.renderTabPanel("html"));
    }
    if (this.dataJs) {
      tabElems.push(this.renderTabButton("js"));
      tabpanelElems.push(this.renderTabPanel("js"));
    }
    if (this.dataCss) {
      tabElems.push(this.renderTabButton("css"));
      tabpanelElems.push(this.renderTabPanel("css"));
    }
    return (
      <div class="pea11y-snippet-tabs">
        <div role="tablist">
          {tabElems}
        </div>
        <div>
          {tabpanelElems}
        </div>
      </div>
    );
  }
}
