Pokedex.Views.PokemonIndex = Backbone.View.extend({
  initialize: function() {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(
      this.collection,
      'sync',
      this.render
    );
    this.listenTo(
      this.collection,
      'add',
      this.addPokemonToList
    );
  },

  events: {
    'click .poke-list-item' : 'selectPokemonFromList'
  },

  render: function() {
    this.$el.empty();
    this.collection.each(this.addPokemonToList, this);
  },

  addPokemonToList: function(pokemon) {
    this.$el.append(JST['pokemonListItem']({ pokemon: pokemon }));
  },

  refreshPokemon: function(callback) {
    this.collection.fetch(
      { success: function() {
        callback && callback();
        }
      }
    );
  },

  selectPokemonFromList: function (e) {
    var pokeId = $(e.currentTarget).data('id');

    Backbone.history.navigate("pokemon/" + pokeId, {trigger: true})
  }
})
