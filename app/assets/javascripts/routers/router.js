Pokedex.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'pokemonIndex',
    'pokemon/:id': 'pokemonDetail',
    'pokemon/:pokemonId/toys/:toyId' : 'toyDetail'
  },

  pokemonIndex: function(callback) {
    var pokemonIndex = new Pokedex.Views.PokemonIndex();
    pokemonIndex.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(pokemonIndex.$el);
    this._pokemonIndex = pokemonIndex;
  },

  pokemonDetail: function(id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
      return;
    }

    var pokemon = this._pokemonIndex.collection.get(id);
    var pokemonDetail = new Pokedex.Views.PokemonDetail({model: pokemon});

    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    $('#pokedex .toy-detail').html('');
    pokemonDetail.model.fetch({
      success: function() {callback && callback();}
    });
    this._pokemonDetail = pokemonDetail;
  },

  toyDetail: function(pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
      return;
    }

    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({model: toy});

    $("#pokedex .toy-detail").html(toyDetail.$el);
    toyDetail.render();
  }
})
