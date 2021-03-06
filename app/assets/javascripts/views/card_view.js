(function(App) {

  'use strict';

  App.View.Card = App.Core.View.extend({

    tagName: 'div',

    className: 'card',

    template: this.HandlebarsTemplates.card,

    events: {
      'click .js-toggle-layer': '_addToMap'
    },

    props: {
      activeClass: '-active'
    },

    state: {
      mode: 'grid',
      actions: true
    },

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Widget(settings.data);
      this.state.set({
        mode: settings.mode,
        actions: settings.actions
      });
    },

    render: function() {
      this.$el.html(this.template({
        data: this.data.attributes,
        state: this.state.attributes
      }));
      this.el.classList.add(this.state.attributes.mode);
      return this;
    },

    /**
     * Create charts and render it
     */
    drawChart: function() {
      if (this.state.attributes.mode === 'grid') {
        this.chart = new App.View.Chart({
          el: this.$('.chart'),
          data: this.data.attributes.chart
        });
        this.chart.render();
      }
    },

    /**
     * Method to update chart
     */
    updateChart: function() {
      if (this.chart) {
        this.chart.update();
      }
    },

    /**
     * Add to map if the card has a layer_name
     * @param {Object} element event
     */
    _addToMap: function(ev) {
      var el = ev.currentTarget;
      var layer = _.clone(this.data.attributes.layer);

      if (!el.classList.contains(this.props.activeClass)) {
        App.Core.Events.trigger('card:layer:add', layer);
        el.classList.add(this.props.activeClass);
        el.innerHTML = el.dataset.i18active;
      } else {
        App.Core.Events.trigger('card:layer:remove', layer);
        el.classList.remove(this.props.activeClass);
        el.innerHTML = el.dataset.i18default;
      }
    }

  });

}).call(this, this.App);
