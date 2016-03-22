(function(App) {

  'use strict';

  App.View.Cards = App.Core.View.extend({

    tagName: 'div',

    className: 'cards',

    template: this.HandlebarsTemplates.cards,

    state: {
      mode: 'grid'
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Collection.Widgets(settings.data);
      // Setting events
      this.listenTo(this.data, 'reset', this.render);
      // First render
      this.render();
    },

    render: function() {
      var _this = this;
      var grid = this.state.attributes.mode === 'grid';

      this.$el
        .html(this.template({ 
          cards: this.data.toJSON(),
          grid: grid
        }))
        .find('.js-card').each(function(i, el) {
          var m = _this.data.models[i];
          var card = new App.View.Card({ 
            data: m.attributes,
            mode: _this.state.attributes.mode
          });
          $(el).html(card.render().el);
        });

      return this;
    }

  });

}).call(this, this.App);