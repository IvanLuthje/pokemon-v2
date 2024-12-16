function cancelar (){
    var respuesta = confirm('Desea volver a la pagina principal?')
    if (respuesta == true){
      location.href="index.html"
    }
    else{
     return false;
    }
 }

function reset() {
    location.reload(true)
}

function enviar() {
    const form = document.getElementById('formulario_compartir');
    // const emaile = form.email_emisor.value;
    const emailr = form.email_receptor.value;

    const comentario = form.comentario.value;

    // if (emaile == "") {
    //     $(".alert").html("Debe ingresar el correo electrónico");
    //     return false;
    // }

    // if (emaile == "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/") {
    //     $(".alert").html("Debe ingresar el correo electrónico válido");
    //     return false;
    // }


    if (emailr == "") {
        $(".alert").html("Debe ingresar el correo electrónico");
        return false;
    }

    if (emailr == "/^([\w.]+)@([\w.]+)$/") {
        $(".alert").html("Debe ingresar el correo electrónico válido");
        return true;
    }

    else {
        $(".alert").html("Redireccionando al gestor de correo")
        window.location = 'mailto: ' + $("#email_receptor").val() + '?subject=' + $("#subject").val() + '&body=' + $("#comentario").val();
        return true;
    }


}

