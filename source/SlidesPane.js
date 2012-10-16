enyo.kind({
  kind: "Panels",
  name: "slidedeck.SlidesPane",
  arrangerKind: "HFlipArranger",

  addSlide: function(component) {
    'use strict';

    var instance = this.createComponent(component, {owner: this});

    this.render();
  },

  goToSlide: function(idx) {
    'use strict';

    this.setIndex( idx );
  }
});
