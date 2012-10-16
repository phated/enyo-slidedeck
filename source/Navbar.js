enyo.kind({
  name: 'slidedeck.Navbar',
  kind: 'onyx.Toolbar',
  layoutKind: 'FittableColumnsLayout',
  components: [
    {
      kind: 'onyx.Button',
      allowHtml: true,
      content: '&larr; Back',
      onclick: 'previousSlide'
    },
    {
      name: 'followAlongToggle',
      kind: 'onyx.ToggleButton',
      value: true,
      onChange: 'followAlong'
    },
    {
      kind: 'onyx.ProgressBar',
      name: 'slidesProgress',
      position: '0',
      style: 'height: 12px; margin: 10px !important;',
      fit: true
    },
    {
      kind: 'onyx.Button',
      allowHtml: true,
      content: 'Next &rarr;',
      onclick: 'nextSlide'
    }
  ],

  socket: null,

  create: function(){
    this.inherited(arguments);

    this.socket = new Socket();

    // Set the max of progress bar when slides are created
    var full = this.owner.$.slidesPanes.getPanels().length;
    this.$.slidesProgress.max = full;

    // Update progress to the current slide
    this.updateProgress();
  },

  updateProgress: function() {
    'use strict';

    // Animate progress bar to the current slide
    var current = this.owner.$.slidesPanes.index + 1; // Zero based index
    this.$.slidesProgress.animateProgressTo( current );
    this.socket.emit('slideChanged', this.owner.$.slidesPanes.index);
  },

  // Slide navigation
  nextSlide: function() {
    'use strict';

    this.owner.$.slidesPanes.next();
  },

  previousSlide: function() {
    'use strict';

    this.owner.$.slidesPanes.previous();
  },

  joinViewer: function(){
    'use strict';

    this.socket.emit('joinViewer');
  },

  leaveViewer: function(){
    'use strict';

    this.socket.emit('leaveViewer');
  },

  followAlong: function(){
    'use strict';

    if(this.$.followAlongToggle.getValue()){
      this.joinViewer();
    } else {
      this.leaveViewer();
    }
  }

});
