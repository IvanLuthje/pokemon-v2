// Función para activar/desactivar el menú hamburguesa
function menuBar() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}


$(document).ready(function () {
  // Cargar la lista de favoritos desde localStorage
  loadFavorites();

  // Función para buscar Pokémon
  $('.boton_busqueda').click(function () {
      const pokemonName = $('#pokemon-name').val().toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;


      $.ajax({
          url: url,
          method: 'GET',
          success: function (data) {
              mostrarPokemon(data);
          },
          error: function () {
              alert("Pokémon no encontrado");
          }
      });
  });

  // Función para mostrar la información del Pokémon
  function mostrarPokemon(data) {
      $('#pokemon-info').empty();

      const pokemonCard = `
          <div class="pokemon-card">
              <img src="${data.sprites.front_default}" alt="${data.name}">
              <div>
                  <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                  <button class="compartir"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                  <button class="descripcion"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                  <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      $('#pokemon-info').html(pokemonCard);
  }

  function descripcion(data){
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            mostrarPokemon(data);
        },
        error: function () {
            alert("Pokémon no encontrado");
        }
    });

  }

  // Función para agregar Pokémon a favoritos
  window.addToFavorites = function (id, name, sprite) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Comprobar si el Pokémon ya está en favoritos
      if (!favorites.some(fav => fav.id === id)) {
          favorites.push({ id, name, sprite });
          localStorage.setItem('favorites', JSON.stringify(favorites));
          loadFavorites();
      }
  };

  // Función para cargar la lista de favoritos desde localStorage
  function loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      $('#favorites-list').empty();

      favorites.forEach(function (fav) {
          const favoriteItem = `
              <li>
                  <span>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</span>
                  <button id="eliminar" onclick="eliminar(${fav.id})">&times;</button>
              </li>
          `;
          $('#favorites-list').append(favoriteItem);
      });
  }

  // Función para eliminar un Pokémon de los favoritos
  window.eliminar = function (id) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites();
  };
  
  $('#eliminar-todos').click(function () {
    localStorage.clear();
    loadFavorites();
  });


});
