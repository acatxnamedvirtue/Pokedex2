Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function (toy) {
    this.model = toy;
    this.template = JST['toyDetail']({toy: this.model, pokes: []});
  },

  render: function () {
    this.$el.html(this.template);
  }

})
