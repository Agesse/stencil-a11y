"use strict";

/* Plugin JQuery permettant d'afficher un composant de notation
 * Liste des commandes :
 * - $().peA11yRating('set', value) => set value to value
 * - $().peA11yRating('getValue') => get current value
 */
(function ($) {

  // PLUGIN VARIABLES
  $.fn.peA11yRating = peA11yRating; // plugin

  $.fn.peA11yRating.defaults = {
    max: 5,
    initValue: 0,
    allowEmpty: true,
    readOnly: false,
    textValue: null,
    labelledBy: null,
    label: "",
    templateFull: "★",
    templateEmpty: "☆",
    onmouseover: () => { },
    onmouseleave: () => { },
    onchange: () => { }
  }; // default options





  //PLUGIN FUNCTIONS
  /**
   * @description Main plugin function
   * @param {any} command Options to be passed to the plugin or command name
   * @returns JQuery element
   */
  function peA11yRating(command, value) {

    // plugin commands
    if (command && typeof command === 'string') {
      switch (command) {
        case "set":
          setValue($(this), value);
          return this;

        case "getValue":
          return getValue(this);

        case "getHoveredValue":
          return $(this).data("hoveredValue");
      }
      return this;
    }


    // VARIABLES
    var opts = $.extend({}, $.fn.peA11yRating.defaults, command); // computed options


    // Fill up to the hovered element
    function onMouseOverElement() {
      var divId = $(this).data("id");
      fillRatingTo(divId + 1, this.parentElement.children, true);
      $(this).parent().data("hoveredValue", divId + 1);
      opts.onmouseover.call();
    }


    // Select value on click
    function onClickOnElement() {
      var divId = $(this).data("id");
      var newValue = $(this).data("id") + 1;
      if (divId + 1 === getValue($(this).parent()) && opts.allowEmpty) {
        newValue = 0;
      }
      setValue($(this).parent(), newValue);
    }


    // Reset hovered value and fill elements to selected value
    function onMouseLeave() {
      fillRatingTo($(this).data("value"), $(this).children());
      $(this).data("hoveredValue", 0);
      opts.onmouseleave.call();
    }


    // Keyboard function
    function onKeyDown(event) {
      var value = getValue(this);
      var minValue = opts.allowEmpty ? 0 : 1;

      switch (event.keyCode) {
        // Right arrow, up arrow
        case 39:
        case 38:
          if (value < opts.max) {
            setValue(this, value + 1);
          }
          break;

        // Left arrow, down arrow
        case 37:
        case 40:
          if (value > minValue) {
            setValue(this, value - 1);
          }
          break;

        // Home
        case 36:
          setValue(this, minValue);
          break;

        // End
        case 35:
          setValue(this, opts.max);
          break;
      }
    }




    // div containing elements and receiving events
    for (var i = 0; i < opts.max; i++) {
      var parentDiv = document.createElement("div");
      if (!opts.readOnly) {
        parentDiv.onmouseover = onMouseOverElement;
        parentDiv.onclick = onClickOnElement;
      }
      parentDiv.style.display = "inline-block";

      // one div for each template
      var childDivEmpty = document.createElement("div");
      var childDivFull = document.createElement("div");
      childDivEmpty.innerHTML = opts.templateEmpty;
      childDivFull.innerHTML = opts.templateFull;
      childDivEmpty.style.display = "none";
      childDivFull.style.display = "none";
      parentDiv.appendChild(childDivEmpty);
      parentDiv.appendChild(childDivFull);

      $(parentDiv).data("id", i);
      this.append(parentDiv);
    }



    // Add functions, aria attributes and labels
    if (!opts.readOnly) {
      this.mouseleave(onMouseLeave);
      this.keydown(onKeyDown);

      if ((!opts.labelledBy && !opts.label) || (opts.labelledBy && opts.label)) {
        $.error("The PeA11yRating plugin requires either labelledBy (if a label element exists) or label to be set, see doc for more information.");
      } else if (opts.labelledBy) {
        this.attr("aria-labelledby", opts.labelledBy);
      } else {
        this.attr("aria-label", opts.label);
      }

      this.data({
        "hoveredValue": 0,
        "value": opts.initValue,
        "options": opts
      });
      this.attr({
        role: "slider",
        tabindex: 0,
        "aria-valuenow": opts.initValue,
        "aria-valuemin": opts.allowEmpty ? 0 : 1,
        "aria-valuemax": opts.max
      });
      setValue(this, opts.initValue); // initialisation

    } else {
      this.data({
        "value": opts.initValue,
        "options": opts
      });
      this.attr("aria-hidden", true);
      setValue(this, opts.initValue); // initialisation
      var spanTxt = opts.textValue ? opts.textValue[opts.initValue - 1] : opts.initValue;
      var spanElement = document.createElement("span");
      spanElement.innerText = spanTxt;
      spanElement.classList.add("pe-a11y-rating-sr-only");
      this.after(spanElement);
    }


    return this;
  };



  /**
   * @description Show fill template up to value, then show empty template.
   * @param {integer} value Value to fill to
   * @param {DomElement[]} elementList Elements to change
   * @param {boolean} hovered True if filling after hovering, false otherwise
   */
  function fillRatingTo(value, elementList, hovered) {
    for (var i = 0, l = elementList.length; i < l; i++) {
      elementList[i].children[0].style.display = i < value ? "none" : "inline-block";
      elementList[i].children[1].style.display = i < value ? "inline-block" : "none";
      if (i !== value - 1) {
        elementList[i].classList.remove("hover");
      } else if (hovered) {
        elementList[i].classList.add("hover");
      }
    }
  }


  /**
   * @description Set current value
   * @param {*} element Ref to plugin element
   * @param {integer} value New value
   */
  function setValue(element, value) {
    var isReadOnly = $(element).data("options").readOnly;
    if (!isReadOnly) {
      $(element).attr("aria-valuenow", value);
    }
    $(element).data("value", value);
    fillRatingTo(value, $(element).children());
    if ($(element).data("options").textValue && !isReadOnly) {
      $(element).attr("aria-valuetext", $(element).data("options").textValue[value - 1]);
    }
    $(element).data("options").onchange.call();
  }


  /**
   * @description Get current value
   * @param {*} element Ref to plugin element
   * @returns {integer} Current value
   */
  function getValue(element) {
    return parseInt($(element).data("value"));
  }

}(jQuery));


