// Función para activar/desactivar el menú hamburguesa
function menuBar() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}


$(document).ready(function () {
  // Cargar la lista de favoritos desde localStorage
  loadFavorites();

  // Función para buscar Pokémon
  $('#search-btn').click(function () {
      const pokemonName = $('#pokemon-name').val().toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

      if (!pokemonName) return;

      $.ajax({
          url: url,
          method: 'GET',
          success: function (data) {
              displayPokemon(data);
          },
          error: function () {
              alert("Pokémon no encontrado");
          }
      });
  });

  // Función para mostrar la información del Pokémon
  function displayPokemon(data) {
      $('#pokemon-info').empty();

      const pokemonCard = `
          <div class="pokemon-card">
              <img src="${data.sprites.front_default}" alt="${data.name}">
              <div>
                  <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} (#${data.id})</h3>
                  <button class="favorite-btn" onclick="addToFavorites(${data.id}, '${data.name}', '${data.sprites.front_default}')">Agregar a Favoritos</button>
              </div>
          </div>
      `;

      $('#pokemon-info').html(pokemonCard);
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
                  <span>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)} (#${fav.id})</span>
                  <button onclick="removeFromFavorites(${fav.id})">Eliminar</button>
              </li>
          `;
          $('#favorites-list').append(favoriteItem);
      });
  }

  // Función para eliminar un Pokémon de los favoritos
  window.removeFromFavorites = function (id) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites();
  };
});
