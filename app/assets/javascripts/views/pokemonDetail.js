Pokedex.Views.PokemonDetail = Backbone.View.extend({
  initialize: function(model) {
    this.model = model;
    this.template = JST['pokemonDetail']({pokemon: this.model});
    this.listenTo(
      this.model,
      'sync',
      this.render
    );
  },

  events: {
    'click .toy-list-item' : 'selectToyFromList'
  },

  render: function() {
    this.$el.html(this.template);

    this.model.toys().each(function(toy) {
      this.$el.find('ul.toys').append(JST['toyListItem']({toy: toy}));
    }.bind(this));
  },

  selectToyFromList: function (e) {
    var toyId = $(e.currentTarget).data('toy-id');
    var toy = this.model.toys().get(toyId);

    var toyDetail = new Pokedex.Views.ToyDetail(toy);
    $("#pokedex .toy-detail").empty();
    $("#pokedex .toy-detail").html(toyDetail.$el);
    toyDetail.render();
  }
})
