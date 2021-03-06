(function(App) {

  'use strict';

  App.View.CardDetail = App.Core.View.extend({

    tagName: 'div',

    className: 'card-detail',

    events: {
      'click .js-toggle-layer': '_addToMap',
      'click .js-toggle-chart-config': '_chartConfig'
    },

    props: {
      activeClass: '-active'
    },

    template: this.HandlebarsTemplates.card_detail,

    initialize: function(settings) {
      if (!settings.data) {
        throw new Error('"data" param is required.');
      }
      this.data = new App.Model.Widget(settings.data);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this._parsedData()));
      return this;
    },

    _parsedData: function() {
      var formattedData = this.data.attributes;
      formattedData.displayDate = moment(formattedData.date).format('MMM, DD YYYY');
      return formattedData;
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
      } else {
        App.Core.Events.trigger('card:layer:remove', layer);
        el.classList.remove(this.props.activeClass);
      }
    },

    _chartConfig: function(ev) {
      this.trigger('card:chart:config');
    }
  });

}).call(this, this.App);
