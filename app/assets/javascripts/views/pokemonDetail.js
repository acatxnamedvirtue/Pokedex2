Pokedex.Views.PokemonDetail = Backbone.View.extend({
  initialize: function() {
    this.listenTo(
      this.model,
      'sync',
      this.render
    );
  },

  template: JST['pokemonDetail'],

  events: {
    'click .toy-list-item' : 'selectToyFromList'
  },

  render: function() {
    var content = this.template({pokemon: this.model});
    this.$el.html(content);

    this.model.toys().each(function(toy) {
      this.$el.find('ul.toys').append(JST['toyListItem']({toy: toy}));
    }.bind(this));

    return this;
  },

  selectToyFromList: function (e) {
    var toyId = $(e.currentTarget).data('toy-id');
    var pokeId = this.model.toys().get(toyId).get('pokemon_id')
    Backbone.history
      .navigate("pokemon/" + pokeId + "/toys/" + toyId, {trigger: true})
  }
})
