// Función para activar/desactivar el menú hamburguesa
function menuBar() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');
}


function cerrar(){
    modal.style.display = "none";
}

function Compartir() {
    window.location.href = 'compartir.html';

};



$(document).ready(function () {
    // Cargar la lista de favoritos desde localStorage
    loadFavorites();
  

    // Función para buscar Pokémon
    $('.boton_busqueda').click(function () {
        var id_nombre = $("#nombre").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        var url = `https://pokeapi.co/api/v2/pokemon/${id_nombre}`;
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

        var image = data.sprites.front_default;
        var experiencia = data.base_experience
        var id = data.id
        var peso = data.weight / 10
        var altura = data.height * 10

        var pokemonCard = `
          <div class="pokemon-card">
              <img src="${image}" alt="${data.name}">
              <div>
                  <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                  <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                  <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                  <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      window.descripcion = function () {

        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + data.id,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var desc = data.flavor_text_entries[26].flavor_text;
                var imagen = image;
                modal.style.display = "block";
                var info = `
                    <p><strong>#</strong>${id}</p>
                    <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                    <img src=${imagen}>
                    <p><strong>Descripción:</strong>${desc}</p>
                    <p><strong>Altura:</strong>${altura}m</p>
                    <p><strong>Experiencia:</strong>${experiencia}</p>
                    <p><strong>Peso:</strong>${peso}kg</p>
                    <button class='compartir' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                `
                $('.info').html(info);
            },

        });



    }

        $('#pokemon-info').html(pokemonCard);
    }

    function mostrarItem(data) {
        $('#pokemon-info').empty();
        var image = data.sprites.default;

        var pokemonCard = `
        <div class="pokemon-card">
            <img src="${image}" alt="${data.names[5].name}">
            <div>
                <h3>${data.names[5].name.charAt(0).toUpperCase() + data.names[5].name.slice(1)}</h3>
                <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
            </div>
        </div>
    `;


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
        }

        else {
            alert("El elemento ya está agregado")
        }


    };

    // Función para cargar la lista de favoritos desde localStorage
    function loadFavorites() {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#favorites-list').empty();

        favorites.forEach(function (fav) {
            var favoriteItem = `
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
        //   favorites = favorites.filter(fav => fav.id !== id);
        favorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();


    };

    $('#eliminar-todos').click(function () {
        localStorage.clear();
        loadFavorites();
    });


});
