import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "pea11y-uxstars",
  styleUrl: "uxstars.css",
})
export class Uxstars {
  // Parametres obligatoires
  @Prop() imgEmpty: string; // chemin vers l'image representant le score vide
  @Prop() imgFull: string; // chemin vers l'image representant le score rempli
  @Prop({ mutable: true }) imgSize: any; // taille de l'image largeur x hauteur

  // Autres parametres
  @Prop() value: number = 0; // valeur representee
  @Prop() label: string; // label a afficher

  // Variables internes
  emptyStyle: any;
  fullStyle: any;

  componentWillLoad() {
    if (typeof this.imgSize === "string") {
      this.imgSize = JSON.parse(this.imgSize);
    }
    this.emptyStyle = {
      width: this.imgSize[0] + "px",
      height: this.imgSize[1] + "px",
      backgroundImage: "url(" + this.imgEmpty + ")",
      display: "inline-block",
    };
    this.fullStyle = {
      width: this.value + "%",
      height: this.imgSize[1] + "px",
      backgroundImage: "url(" + this.imgFull + ")",
    };
  }

  render() {
    this.fullStyle = { ...this.fullStyle, width: this.value + "%" };

    if (!this.imgEmpty || !this.imgFull || !this.imgSize) {
      console.error(
        "pea11y-uxstars: You need to specify the path to the empty image and the full image, and their size."
      );
      return;
    }
    return (
      <div title={this.value + "%"}>
        <div
          class="pea11y-uxstars-empty"
          style={this.emptyStyle}
          aria-hidden="true">
          <div class="pea11y-uxstars-full" style={this.fullStyle}></div>
        </div>
        {this.label ? (
          <span class="pea11y-uxstars-label">{this.label}</span>
        ) : (
          <span class="sr-only">{this.value + "%"}</span>
        )}
      </div>
    );
  }
}
