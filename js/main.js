// Función para activar/desactivar el menú hamburguesa
function menuBar() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}




$(document).ready(function () {
  // Cargar la lista de favoritos desde localStorage
  loadFavorites();
  loadHistorial();

  // Función para buscar Pokémon
  $('.boton_busqueda').click(function () {
      const id_nombre = $("#nombre").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      const url = `https://pokeapi.co/api/v2/pokemon/${id_nombre}`;
      if (filtro.value == 'nombre') {   
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                mostrarPokemon(data);
            },
            error: function () {
                $('#pokemon-info').html("Pokémon " + id_nombre + " no disponible");            
            }
        });
     }

     if (filtro.value == 'item') {   
        $.ajax({
            url: "https://pokeapi.co/api/v2/item/" + id_nombre,
            method: 'GET',
            success: function (data) {
                mostrarItem(data);
            },
            error: function () {
                $('#pokemon-info').html("Item " + id_nombre + " no disponible");
            }
        });
     }

 

  });

// Mostrar info sobre Pokemons e Items

  function mostrarPokemon(data) {
      $('#pokemon-info').empty();

      const image = data.sprites.front_default;

      const pokemonCard = `
          <div class="pokemon-card">
              <img src="${image}" alt="${data.name}">
              <div>
                  <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                  <button class="compartir"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                  <button class="descripcion"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                  <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      $('#pokemon-info').html(pokemonCard);
  }

  function mostrarItem(data) {
    $('#pokemon-info').empty();
    const image = data.sprites.default;

    const pokemonCard = `
        <div class="pokemon-card">
            <img src="${image}" alt="${data.names[5].name}">
            <div>
                <h3>${data.names[5].name.charAt(0).toUpperCase() + data.names[5].name.slice(1)}</h3>
                <button class="compartir"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="descripcion" onclick="descripcion${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
            </div>
        </div>
    `;

    window.descripcion = function (data){
    
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + nombre,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var desc = data.flavor_text_entries[26].flavor_text;
                modal.style.display = "block";
                $(".info").html(
                    "<h1>" + nombre + "</h1>" +
                    "</div>" +
                    "<div class='pokemon'>" + "<img src='" + imagen + "'>" +
                    "<p><strong>Exp: </strong>" + experiencia + "</p>" + "<strong>Peso: </strong>" + peso
                    + "kg</p>" + "<p><strong>Altura: </strong>" + altura
                    + "cm</p>" + "<div>" +
                    "<p>" + "<strong> Descripción: </strong>" + desc + "</p>" +
                    "<button class='compartir'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>");
            },
    
        });
    
    }

    $('#pokemon-info').html(pokemonCard);


}


// Función para mostrar la información del Pokémon


  // Función para agregar Pokémon a favoritos
  window.addToFavorites = function (id, name, sprite) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Comprobar si el Pokémon ya está en favoritos
      if (!favorites.some(fav => fav.id === id)) {
          favorites.push({ id, name, sprite });
          localStorage.setItem('favorites', JSON.stringify(favorites));
          loadFavorites();
          loadHistorial();
      }

      else{
        alert("El elemento ya está agregado")
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

  function loadHistorial() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    $('#historial-list').empty();

    favorites.forEach(function (fav) {
        const favoriteItem = `
                <div class="pokemon-card">
                    <span>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</span>
                    <button id="eliminar" onclick="eliminar(${fav.id})">&times;</button>
                    <button class="compartir"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                    <button class="descripcion"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
               </div>
        `;
        $('#historial-list').append(favoriteItem);
    });
}

  // Función para eliminar un Pokémon de los favoritos
  window.eliminar = function (id) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //   favorites = favorites.filter(fav => fav.id !== id);
      favorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites();
      loadHistorial();
 
  };
  
  $('#eliminar-todos').click(function () {
    localStorage.clear();
    loadFavorites();
    loadHistorial();
  });


});
