function cerrar(){
    modal.style.display = "none";
}

function Compartir() {
    window.location.href = 'compartir.html';

};



    $(document).ready(function() {
        loadHistorial();
        const url = "https://pokeapi.co/api/v2/pokemon/";
      
        for (let i = 1; i <= 12; i++) {
          $.ajax({
            url: url + i,
            method: 'GET',
            success: function(data) {
                mostrarPokemon(data);
                ("main").html("<button class='vermas' onclick='verMas()' type='button' aria-label='Buscar'><i class='fa-solid fa-ellipsis'></i></button>")

                

            },
            error: function() {
              alert("Error al obtener los datos del Pokémon");
            }
            
            
          });
        }
      });

      function verMas(){
        const url = "https://pokeapi.co/api/v2/pokemon/";
        for (let i = 13; i <= 24; i++) {
            $.ajax({
              url: url + i,
              method: 'GET',
              success: function(data) {
                  mostrarPokemon(data);
              },
              error: function() {
                alert("Error al obtener los datos del Pokémon");
              }
              
            });
        }

      }
      


      function mostrarPokemon(data) {
    
        const image = data.sprites.front_default;
    
        const pokemonCard = `
          <div class="pokemon-card">
              <img src="${image}" alt="${data.name}">
              <div>
                  <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                  <button class="compartir"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      window.descripcion = function () {

        $.ajax({
            
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + data.name ,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var desc = data.flavor_text_entries[26].flavor_text;
                var imagen = image;
                modal.style.display = "block";
                $(".info").html(
                    "<h3>" + data.name.charAt(0).toUpperCase() + data.name.slice(1) + "</h3>" +
                    "<img src='" + imagen + "'>" +
                    "</div>" +
                    "<p>" + "<strong> Descripción: </strong>" + desc + "</p>" +
                    "<button class='compartir' onclick='Compartir()'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>");
            },

        });

            }
      
    
        $('#pokemon-info').append(pokemonCard);
    }


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

        else {
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
                    <button id="eliminar" onclick="eliminar(${fav.id})">&times;</button>
                    <h3>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</h3>
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
        loadHistorial();

    };

    
  

    $('#eliminar-todos').click(function () {
        localStorage.clear();
        loadFavorites();
        loadHistorial();
    });



