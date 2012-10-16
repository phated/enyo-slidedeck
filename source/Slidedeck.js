enyo.kind({
  name: 'slidedeck.Main',
  components: [
    {
      name: 'mainLayout',
      kind: 'FittableRows',
      classes: 'enyo-fit',
      components: [
        {
          kind: 'QuestionsPullout',
          onQuestionReceived: 'updateQuestions'
        },
        {
          kind: 'slidedeck.SlidesPane',
          name: 'slidesPanes',
          fit:  true,
          onTransitionFinish: 'updateProgress'
        }
      ]
    }
  ],

  navbar: true,

  socket: null,

  slides: [],

  create: function() {
    // Has to be called to fire the super-class create method
    this.inherited(arguments);

    // Loop through the slides array to setup initial slides
    enyo.forEach(this.slides, this.setupSlide, this);

    this.socket = new Socket({
      init: {
        on: {
          changeSlide: this.changeSlide
        }
      }
    });

    if(this.navbar){
      this.$.mainLayout.createComponent({
        name: 'navbar',
        kind: 'slidedeck.Navbar'
      }, {owner: this});
    }

    if(window.location.search === '?presenter'){
      this.joinPresenter();
    } else {
      this.$.navbar.joinViewer();
    }
  },

  setupSlide: function(kindName) {
    'use strict';

    this.$.slidesPanes.addSlide({
      kind: kindName
    });
  },

  changeSlide: function(slideIndex){
    'use strict';

    if(this.$.followAlongToggle.value){
      this.$.slidesPanes.goToSlide(slideIndex);
    }
  },

  joinPresenter: function(){
    'use strict';

    this.$.followAlongToggle.setDisabled(true);
    this.socket.emit('setPresenter');
  },

  updateProgress: function(){
    'use strict';

    this.$.navbar.updateProgress();
  },

  updateQuestions: function(inSender, inEvent){
    'use strict';

    this.$.slidesPanes.$.questions.addQuestion(inEvent);
  }

});
