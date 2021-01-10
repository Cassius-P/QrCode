/*jQuery*/


const Store = require('electron-store');
const storage = new Store()
let parameters = storage.get('parameters');

$(document).ready(function(){
    /*Recuperation des parametres et remplissage des champs*/
    $('#sizes option[value="'+parameters.size+'"]').prop('selected', true)
    $('#cp').val(parameters.cp);
    $('#cs').val(parameters.cs);

    /*Implemantation des selecteurs de couleurs*/
    $('.basic').spectrum({
        showPalette: false,
        showAlpha: false,
        preferredFormat: "hex",
    })
});




$('#setInfos').click(function() {
    setInfos()
})

function setInfos(){
    try{
        var size = $('#sizes :selected').val()

        var cp = $('#cp').val()
        var cs = $('#cs').val()

        console.log(size, cp, cs)
        if(size != parameters.size || cp.toLowerCase() != parameters.cp.toLowerCase() || cs.toLowerCase() != parameters.cs.toLowerCase()){
            parameters.size = size;
            parameters.cp = cp;
            parameters.cs = cs;
            storage.set('parameters', parameters)
            alertUser('success', "Vos changements ont bien été pris en compte")
        }else{
            alertUser('warning', "Il semblerait qu'aucun changement n'est été effectué")
        }


        console.log(parameters)
    }catch (error){
        console.log(error)
        alertUser('danger', "Il semblerait qu'il y ait eu une erreur")
    }
}

function alertUser(state, text){
    $('#alert').html(text)
    $('#alert').removeClass().addClass("alert alert-"+state+" visible my-1 ")
    setTimeout(() => {
        $('#alert').removeClass().addClass("invisible")
    }, 3500)
}
