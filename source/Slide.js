enyo.kind( {
  name: "slidedeck.Slide",
  kind: "enyo.Control",
  classes: 'slide',

  title: null,

  create: function(){
    this.inherited(arguments);

    if(this.title){
      this.createComponent({
        kind: 'onyx.Toolbar',
        name: 'titleBar',
        content: this.title,
        prepend: true
      });
    }
  },

  setTitle: function(title) {
    'use strict';

    this.$.titleBar.content = title;
  }
});
