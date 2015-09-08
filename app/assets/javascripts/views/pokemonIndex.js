Pokedex.Views.PokemonIndex = Backbone.View.extend({
  initialize: function() {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(
      this.collection,
      'sync',
      this.render
    );
    // this.listenTo(
    //   this.collection,
    //   'add',
    //   this.addPokemonToList
    // );
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

  refreshPokemon: function() {
    this.collection.fetch();
  },

  selectPokemonFromList: function (e) {
    var poke_id = $(e.currentTarget).data('id');
    var pokemon = this.collection.get(poke_id);

    var pokemonDetail = new Pokedex.Views.PokemonDetail(pokemon);
    $("#pokedex .pokemon-detail").empty();
    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    pokemon.fetch();
  }
})
