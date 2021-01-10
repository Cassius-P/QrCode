/*Javascript Natif*/


var QRCode = require('qrcode')
const Store  = require('electron-store');
const storage = new Store()

/*Création d'un evenement pour generer le QR Code quand le bouton est cliqué '*/
var generate = document.querySelector('#generate')
generate.addEventListener('click', ()=>{
    checkText()
})

var input = document.querySelector('#textToConvert')
var dl = document.querySelector('#dl');
var copy = document.querySelector('#copy');
copy.disabled = true;
var image = document.getElementById('canvas');
var notice = document.querySelector('#notice');

copy.addEventListener('click', ()=>{
    copyImg()
})

function checkText(){
    var text = input.value;
    console.log(text)
    if(text != ""){
        createQRCode(text)
    }else{
        notice.classList.replace('invisible', 'visible')
        notice.classList.add('text-danger')
        notice.innerHTML = "Veuillez saisir du texte !"
        setTimeout(()=>{
            notice.classList.replace('visble', 'invisible')
            notice.classList.remove('text-danger')
            notice.innerHTML = ""
        }, 3000)
    }

}

function createQRCode(text){
    let parameters = storage.get('parameters');

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width:parameters.size,
        scale:4,
        quality: 1,
        margin: 0.1,
        color: {
            dark:parameters.cp,
            light:parameters.cs
        }
    }

    QRCode.toDataURL(text, opts, function (err, url) {
        if (err) throw err
        image.src = url;
        dl.setAttribute('download', "QRCode " +text+ " "+parameters.size+"px");
        dl.classList.replace('invisible', 'visible')
        dl.href = url;
        copy.classList.replace("invisible", "visible")
        copy.dataset.img = url;
        copy.disabled = false;
    })
}

async function copyPermission(){
    console.log(copy.dataset.img)
    try{
        const {state} = await navigator.permissions.query({name: "clipboard"})
        return state === "granted"
    }catch (e){
        return false
    }


}

async function copyImg(){

    notice.classList.add('invisible')
    if(copyPermission()){
        try{
            const setToClipClipBoard = async blob => {
                const data = [new ClipboardItem({[blob.type]: blob})]
                await navigator.clipboard.write(data)
            }
            const response = await fetch(copy.dataset.img);
            const blob = await response.blob()
            await setToClipClipBoard(blob)
            notice.classList.replace('invisible', 'visible')
            notice.innerHTML = "Copié !"
            notice.classList.add('text-success')
            setTimeout(()=>{
                notice.classList.replace('visible', 'invisible')
                notice.classList.remove('text-success')
                notice.innerHTML = ""
            },1500)
        }catch (e){

        }

    }
}


