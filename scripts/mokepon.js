window.addEventListener('load', iniciarJuego)

let ataqueJugador = null
let ataqueEnemigo = null
let vidasJugador = 3
let vidasEnemigo = 3
let juegoFinalizado = false

//===================================================     COMIENZO JUEGO     ===============================================================
function iniciarJuego(){
    let btn_mascota = document.getElementById("seleccionarMascota");
    let btnReset = document.getElementById("resetear");
    let seccionAtaque = document.getElementById("seleccionar_ataque");
    
    let btnFuego = document.getElementById("btnFuego")
    let btnAgua = document.getElementById("btnAgua")
    let btnTierra = document.getElementById("btnTierra")

    // Oculto secciones inicialmente
    seccionAtaque.style.display = 'none'

    // Event Listeners de los botones
    btn_mascota.addEventListener('click',seleccionarMascota)
    btnReset.addEventListener('click', reiniciarJuego)
    btnFuego.addEventListener('click', ataqueFuego)
    btnAgua.addEventListener('click', ataqueAgua)
    btnTierra.addEventListener('click', ataqueTierra)   
}
function seleccionarMascota(){

    let input1 = document.getElementById("Hipodoge")
    let input2 = document.getElementById("Capipepo")
    let input3 = document.getElementById("Ratihueya")
    let input4 = document.getElementById("Langostelvis")
    let input5 = document.getElementById("Tucapalma")
    let input6 = document.getElementById("Pydos")

    let mascotaJugador = null

    if(input1.checked){
        mascotaJugador = input1
    } else if(input2.checked){
        mascotaJugador = input2
    } else if(input3.checked){
        mascotaJugador = input3
    } else if(input4.checked){
        mascotaJugador = input4
    } else if(input5.checked){
        mascotaJugador = input5
    } else if(input6.checked){
        mascotaJugador = input6
    } else {
        alert('Debes seleccionar una mascota')
    }

    if (mascotaJugador != null) {
        document.getElementById("mascota_jugador").innerHTML = 'Tu mascota es ' + mascotaJugador.id;
        seleccionarMascotaEnemigo(mascotaJugador)
        document.getElementById("seleccionarMascota").disabled = true;
    }
}
function seleccionarMascotaEnemigo(mascotaJugador){

    let ataqueAleatorio = aleatorio(1,6)
    let mascotaEnemigo
    if(ataqueAleatorio != parseInt(mascotaJugador.value)){
        if(ataqueAleatorio == 1){
            mascotaEnemigo = document.getElementById("Hipodoge")
        } else if (ataqueAleatorio == 2){
            mascotaEnemigo = document.getElementById("Capipepo")
        } else if (ataqueAleatorio == 3){
            mascotaEnemigo = document.getElementById("Ratihueya")
        } else if (ataqueAleatorio == 4){
            mascotaEnemigo = document.getElementById("Langostelvis")
        } else if (ataqueAleatorio == 5){
            mascotaEnemigo = document.getElementById("Tucapalma")
        } else {
            mascotaEnemigo = document.getElementById("Pydos")
        }
        document.getElementById("mascota_enemigo").innerHTML = 'El enemigo ha elegido a ' + mascotaEnemigo.id; 
    }
    else {
        seleccionarMascotaEnemigo(mascotaJugador)
    }
    document.getElementById("resetear").disabled = false;
    document.getElementById("seleccionar_ataque").style.display = 'block'
   
}
// ===================================================   metodos de ataque    ==============================================================
function ataqueFuego(){
        ataqueJugador = 'FUEGO'
        ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
    
}
function ataqueAleatorioEnemigo(){
    
    let opcion = aleatorio(1,3)
    if(opcion ==1){
        ataqueEnemigo = 'FUEGO'
    } else if (opcion ==2){ 
        ataqueEnemigo = 'AGUA'
    }else{
        ataqueEnemigo = 'TIERRA'
    }
    crearMensaje()
    combate()

}
function combate(){
    
    let vidasJ = document.getElementById("vidasJugador")
    let vidasE = document.getElementById("vidasEnemigo")
    
    if(ataqueJugador == ataqueEnemigo){
        crearMensaje('has empatado')
    } else if ((ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')){
        crearMensaje('Has ganado!!!')
        --vidasEnemigo 
    } else {
        crearMensaje('Has perdido!!!')
        --vidasJugador
    }

    vidasJ.innerHTML = vidasJugador
    vidasE.innerHTML = vidasEnemigo

    revisarVidas()
}
function revisarVidas(){
    if(vidasEnemigo == 0){
        alert('Has ganado')
        finalizarJuego()
    } else if (vidasJugador == 0){
        alert('Has perdido')
        finalizarJuego()
    }
}
function finalizarJuego(){
    juegoFinalizado = true;
    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;   
}
function reiniciarJuego(){
    location.reload()
}
//==================================================     METODOS COMPLEMENTARIOS      ========================================================
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min +1) + min )
}
function crearMensaje(texto){
    let parrafo
    parrafo = document.createElement('p');
    let seccionMensajes = document.getElementById("mensajes");
    if (texto == null){    
        parrafo.innerHTML = 'Ataque jugador: ' + ataqueJugador + '\n Ataque enemigo: ' + ataqueEnemigo
        
    } else {
        parrafo.innerHTML = texto
    }
    seccionMensajes.appendChild(parrafo)
}