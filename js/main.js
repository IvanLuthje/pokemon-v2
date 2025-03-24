// Función para activar/desactivar el menú hamburguesa
function menuBar() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');
}


function cerrar() {
    modal.style.display = "none";
}

function Compartir() {
    window.location.href = 'compartir.html';
  
  };





$(document).ready(function () {
    // Cargar la lista de favoritos desde localStorage
    loadFavorites();
    loadHistorial();




    // Función para buscar Pokémon
    $('.boton_busqueda').click(function () {
        var id_nombre = $("#nombre").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        var url = `https://pokeapi.co/api/v2/pokemon/${id_nombre}`;
        var alert_pokemon = `<i class='fas fa-exclamation-triangle'></i> Pokémon ${id_nombre.charAt(0).toUpperCase() + id_nombre.slice(1)} no disponible`
        var alert_item = `<i class='fas fa-exclamation-triangle'></i> Item ${id_nombre.charAt(0).toUpperCase() + id_nombre.slice(1)} no disponible`
        if (filtro.value == 'nombre') {
            $.ajax({
                url: url,
                method: 'GET',
                success: function (data) {
                    mostrarPokemon(data);
                },
                error: function () {
                    $('#pokedex-info').html(alert_pokemon);
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
                    $('#pokedex-info').html(alert_item);
                }
            });
        }



    });

    // Mostrar info sobre Pokemons e Items

    function mostrarPokemon(data) {
        $('#pokedex-info').empty();
        var entry;
        var image = data.sprites.front_default;
        var experiencia = data.base_experience
        var id = data.id
        var peso = data.weight / 10
        var altura = data.height / 10

        var pokemonCard = `
          <div class="pokemon-card">
              <p><strong>#${id}</strong></p>
              <img src="${image}" alt="${data.name}">
              <div>
                  <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                  <button class="compartir" onclick="Compartir(${data.id}, '${data.name}')"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                  <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                  <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
              </div>
          </div>
      `;

      


        window.descripcion = function () {

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon-species/' + data.name,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var desc = data.flavor_text_entries[1].flavor_text;
                    var imagen = image;
                    modal.style.display = "block";
                        var info = `
                        <p><strong>#</strong>${id}</p>
                        <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                        <img src=${imagen}>
                        <p><strong>Descripción:</strong>${desc}</p>
                        <p><strong>Altura:</strong>${altura.toFixed(2)}m</p>
                        <p><strong>Experiencia:</strong>${experiencia}</p>
                        <p><strong>Peso:</strong>${peso}kg</p>
                        <button class='compartir' onclick='Compartir()'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>

                        `
                

                    $('.info').html(info);
                },

            });



        }


        $('#pokedex-info').html(pokemonCard);
    }

 
    function mostrarItem(data) {
        $('#pokedex-info').empty();
        var image = data.sprites.default;
        var id = data.id

        var pokemonCard = `
        <div class="pokemon-card">
            <p><strong>#${id}</strong></p>
            <img src="${image}" alt="${data.names[5].name}">
            <div>
                <h3>${data.names[5].name.charAt(0).toUpperCase() + data.names[5].name.slice(1)}</h3>
                <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                <button class="descripcion" onclick="descripcion(${data.id}, '${data.name}', '${data.sprites.front_default}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                <button class="favoritos" onclick="addToFavorites(${data.id}, '${data.name}', '${image}')"><i class='fa fa-heart' aria-hidden='true'></i></button>
            </div>
        </div>
    `;

        document.descripcion = function () {

            $.ajax({
                url: 'https://pokeapi.co/api/v2/item/' + data.id,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var imagen = image;
                    var costo = data.cost
                    var tipo = data.category.name
                    var tran = $('body').translate({lang: "en", t: dict});
                    var desc = data.flavor_text_entries[13].text
                    var modal = document.getElementById("modal");
                    modal.style.display = "block";
                    var info = `
                            <p><strong>#</strong>${data.id}</p>
                            <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                            <div class='item'><img src=${imagen}></div>
                            <p>Costo: ${costo} </p>
                            <p>Tipo:  ${tipo} </p>
                            <p>Descripción: ${desc} </p>`

                    $('.info').html(info);
                },

            });



        }


        $('#pokedex-info').html(pokemonCard);



    }

    // Función para agregar Pokémon a favoritos
    document.addToFavorites = function (id, name, sprite) {
        var alert_added = `<i class='fa fa-heart' aria-hidden='true'></i> ${name.charAt(0).toUpperCase() + name.slice(1)} ya está agregado a la lista`
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Comprobar si el Pokémon ya está en favoritos
        if (!favorites.some(fav => fav.name === name)) {
            favorites.push({ id, name, sprite });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            loadFavorites();
        }

        else {
            $('#alert-favoritos-pokedex').html(alert_added)
        }


    };

    



    // Función para cargar la lista de favoritos desde localStorage
    function loadFavorites() {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#favorites-list').empty();
        $('#favorites-list-r').empty();


        if (favorites.length) {

            favorites.forEach(function (fav) {
                var favoriteItem = `
                  <li>
                      <span>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</span>
                      <button id="eliminar" onclick="eliminar(${fav.id})">&times;</button>
                  </li>
              `;
                $('#favorites-list').append(favoriteItem);
                $('#favorites-list-r').append(favoriteItem);
            });

        }

        else {
            $('#favorites-list').html("No se encuentran favoritos")
            $('#favorites-list-r').html("No se encuentran favoritos")
        }

    }

    function loadHistorial() {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#historial-list').empty();

        

        if (favorites.length) {
            favorites.forEach(function (fav) {
                var favoriteItem = `  
                    <div class="pokemon-card">
                        <img src=${fav.sprite}>
                        <h3>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</h3>
                        <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                        <button class="descripcion" onclick="descripcion(${fav.id}, '${fav.name}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                        <button id="eliminar" onclick="eliminar(${fav.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
                   </div>
            `;


                $('#historial-list').append(favoriteItem);
                
            });

            
        }


        else {
            $('#historial-list').html("No se encuentran favoritos")
        }


    }


    function loadHistorial() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        $('#historial-list').empty();

        if (favorites.length) {
            favorites.forEach(function (fav) {
                const favoriteItem = `  
                        <div class="pokemon-card">
                            <img src=${fav.sprite}>
                            <h3>${fav.name.charAt(0).toUpperCase() + fav.name.slice(1)}</h3>
                            <button class="compartir" onclick="Compartir()"><i class='fa fa-share-alt' aria-hidden='true'></i></button>
                            <button class="descripcion" onclick="descripcion(${fav.id}, '${fav.name}')"><i class='fa fa-binoculars' aria-hidden='true'></i></button>
                            <button id="eliminar" onclick="eliminar(${fav.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                `;
                $('#historial-list').append(favoriteItem);
            });
        }


        else {
            $('#historial-list').html("No se encuentran favoritos")
        }


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
