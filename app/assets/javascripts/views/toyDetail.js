Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function() {
    // this.listenTo(
    //   this.model,
    //   'sync',
    //   this.render
    // );
  },

  template: JST['toyDetail'],

  render: function () {
    var content = this.template({toy: this.model, pokes: []});
    this.$el.html(content);

    return this;
  }

})
