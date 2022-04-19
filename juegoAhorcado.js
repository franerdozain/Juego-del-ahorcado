let inputPalabra = document.querySelector("#inputPalabra");
let nuevaPalabra = document.querySelector("#nuevaPalabra");
let palabraIngresada = document.querySelector("#palabraIngresada");
let btnAgregarPalabra = document.querySelector("#btnAgregarPalabra");
let continuarJuego = document.querySelector('#continuarJuegoPausado');
let nuevoJuego = document.querySelector("#nuevoJuego");
let virtualKeyboard = document.querySelector("#virtual-keyboard");
let palabras = ["PIANO", "GUITARRA", "BAJO", "TROMPETA", "BATERIA", "TIMBAL", "CAJA", "CELLO"];
let palabra;
let pantalla = document.querySelector("canvas");
let cerrarTextarea = document.querySelector("#cerrarTextarea")
let lapiz = pantalla.getContext("2d");
let aciertos = 0;
let juegoHabilitado = false;
let permitirIngresarPalabra = false;
let posicionesEjeX = [];
let intentos = 6;
let palabraUsuario = "";
let palabraDiccionarioUsuario = "";
let NuevoJuegoCliqueado = false;
let borrar = document.querySelector("#del")
let letraPresionada;
let arrayLetrasPresionadas = []; 
let teclitas = document.querySelectorAll(".key");
let teclitasInhabilitadas;


pantalla.width = window.innerWidth;
pantalla.height = window.innerHeight;

function crearJuego(e) {
    palabraUsuario = ""
    arrayLetrasPresionadas = []; 
    del.style.visibility = "hidden";
    NuevoJuegoCliqueado = true;
    aciertos = 0;
    e.preventDefault();
    inputPalabra.value = "";
    lapiz.clearRect(0, 0, pantalla.width, pantalla.height);
    let teclasAnuladas = document.querySelectorAll(":disabled");
    for (let i = 0; i < teclasAnuladas.length; i++) {
        teclasAnuladas[i].removeAttribute("disabled");
        teclasAnuladas[i].style.background = "linear-gradient(86deg, #ffffffd4, #6e6868";
        teclasAnuladas[i].style.color = "black";
    }
    habilitarJuego();
    intentos = 6;
};
function habilitarJuego() {
    juegoHabilitado = true;
    posicionesEjeX = []
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let numeroGuiones = palabra.length;
    let x = 350;  
    for (let i = 0; i < numeroGuiones; i++) {
        dibujarGuiones(x, 480);
        posicionesEjeX.push(x);
        x += 50;
    };
    dibujarHorca();
    console.log(palabra)
};

function dibujarGuiones(x, y) {
    lapiz.strokeStyle = "black";
    lapiz.beginPath();
    lapiz.lineWidth = 5;
    lapiz.lineCap = "round";
    lapiz.moveTo(x, y);
    lapiz.lineTo(x + 35, y);
    lapiz.stroke();
};
function dibujarHorca() {
    lapiz.strokeStyle = "black";
    lapiz.beginPath();
    lapiz.lineWidth = 5;
    lapiz.lineJoin = "round";
    lapiz.lineCap = "round";
    lapiz.moveTo(80, 480);//poste principal y transversal
    lapiz.lineTo(80, 100);//poste principal y transversal
    lapiz.lineTo(220, 100);//poste principal y transversal
    lapiz.stroke();
    lapiz.moveTo(10, 480);//base
    lapiz.lineTo(150, 480);//base
    lapiz.stroke();
    lapiz.moveTo(220, 100);//palo porta horca
    lapiz.lineTo(220, 180);//palo porta horca
    lapiz.stroke();
    lapiz.moveTo(80, 150); //palo diagonal estructural horca
    lapiz.lineTo(120, 100);//palo diagonal estructural horca
    lapiz.stroke();
    lapiz.moveTo(195, 100);//palo diagonal estructural horca pequeño
    lapiz.lineTo(220, 130);//palo diagonal estructural horca pequeño
    lapiz.stroke();       
};

//dibujar elipses de partes del cuerpo
function dibujarElipse(x, y, rx, ry, r, sa, ea) {
    lapiz.fillStyle = "black";
    lapiz.beginPath();
    lapiz.ellipse(x, y, rx, ry, r, sa, ea);
    lapiz.fill();
};

function jugar(e) {
    e.preventDefault();
    letraPresionada = e.target.textContent;
    e.target.setAttribute("disabled", true);
    //borrar caracteres del input con botón 'borrar'
    if (e.target == borrar) {
        e.target.removeAttribute("disabled")
        palabraDiccionarioUsuario = palabraDiccionarioUsuario.slice(0, -1);
        inputPalabra.value = palabraDiccionarioUsuario;
    };
    //escribir en la textarea
    if (e.target.tagName !== "DIV" && !NuevoJuegoCliqueado && e.target !== borrar) {
        e.target.removeAttribute("disabled")
        palabraDiccionarioUsuario += e.target.textContent;
        inputPalabra.value = palabraDiccionarioUsuario;        
    };
    //pintar teclas teclado virtual
    if (e.target.tagName !== "DIV") {
        if (NuevoJuegoCliqueado) {
            e.target.style.color = "whitesmoke"
            e.target.style.background = "black"
            arrayLetrasPresionadas.push(letraPresionada);         
        } else {
            e.target.style.background = "black";
            e.target.style.color = "whitesmoke";
            setTimeout(function () {
                e.target.style.color = "black"
                e.target.style.background = "linear-gradient(86deg, #ffffffd4, #6e6868)"
            }, 70) 
        }
    };
    if (!juegoHabilitado && !permitirIngresarPalabra) {
        alert('Haga click en "Nuevo Juego" para iniciar');
        let teclaDeshabilitada = document.querySelector(":disabled")
        teclaDeshabilitada.removeAttribute("disabled")
        teclaDeshabilitada.style.color = "black"
        teclaDeshabilitada.style.background = "linear-gradient(86deg, #ffffffd4, #6e6868)"
    };
    if (NuevoJuegoCliqueado) {
        if (palabra && e.target.tagName !== "DIV" && !palabra.includes(letraPresionada)) {
            intentos--;
            if (intentos == 5) {
                
               dibujarElipse(237, 167, 13, 22, 0.9, 0, 2 * Math.PI)//cabeza
               imprimirLetra(`${letraPresionada} -`, 460, 120)
            } 
            if (intentos == 4) {
               dibujarElipse(219, 230, 15, 50, 0, 0, 2 * Math.PI)//torso 
               imprimirLetra(`${letraPresionada} -`, 520, 120); 
            }
            if (intentos == 3) {
               dibujarElipse(202, 211, 30, 5, 2, 0, 2 * Math.PI)//brazoIzquierdo 
              dibujarElipse(190, 250, 20, 3.5, 1.6, 0, 2 * Math.PI)//antebrazoIzquierdo 
               dibujarElipse(190, 270, 10, 3.7, 1.5, 0.9, 2 * Math.PI)//ManoIzquierda
               imprimirLetra(`${letraPresionada} -`, 580, 120); 
            }
            if (intentos == 2) {
                dibujarElipse(235, 208, 30, 5, 1.25, 0, 2 * Math.PI)//brazoDerecho 
                dibujarElipse(243, 246, 20, 3.5, 1.6, 0, 2 * Math.PI)//antebrazoDerecho 
                dibujarElipse(240, 269, 10, 3.7, 1.8, 0.9, 2 * Math.PI)//manoDerecha 
                imprimirLetra(`${letraPresionada} -`, 640, 120);

            }
            if (intentos == 1) {
                dibujarElipse(210, 293, 30, 6.5, 1.8, 0, 2 * Math.PI)//musloIzquierdo 
                dibujarElipse(203, 336, 20, 5, 1.59, 0, 2 * Math.PI)//piernaIzquierda  
                dibujarElipse(203.5, 357, 10, 5, 1.4, 0, 2 * Math.PI)//pieIzquierdo 
                imprimirLetra(`${letraPresionada} -`, 700, 120);
            }
            if (intentos == 0) {
                dibujarElipse(228, 293, 30, 6.5, 1.3, 0, 2 * Math.PI);//musloDerecho 
                dibujarElipse(235, 335, 20, 5, 1.61, 0, 2 * Math.PI);//piernaDerecha 
                dibujarElipse(232.5, 356.5, 10, 5, 1.75, 0, 2 * Math.PI);//pieDerecho 
                imprimirLetra(letraPresionada, 760, 120);
                setTimeout(() => {
                    alert('¡Se te acabaron los intentos, apretá en "Nuevo juego" para volver a intentarlo!');
                }, 1);
                juegoHabilitado = false;

            }
        };//coincidencias teclas presionadas con letras de palabra a ser adivinada
        if (palabra && e.target.tagName !== "DIV" && palabra.includes(letraPresionada)) {
            let indices = [];
            let letras = palabra.split("");
            let indice = letras.indexOf(letraPresionada);
            while (indice != -1) {
                indices.push(indice);
                indice = letras.indexOf(letraPresionada, indice + 1);
                aciertos++
            }
            for (let i = 0; i < indices.length; i++) {
                imprimirLetra(letraPresionada, posicionesEjeX[indices[i]], 470);
            };
            if (aciertos === posicionesEjeX.length) {
                setTimeout(() => alert('¡Ganaste! Presioná en "Nuevo juego" para volver a jugar'), 1);
                juegoHabilitado = false;
            };
        };
    }
};console.log(palabra)

function imprimirLetra(letra, x, y) {
    lapiz.font = 'bold 35px arial';
    lapiz.fillText(letra, x, y);
};
//abrir textarea para ingrsar palabra al array de palabras aleatorias
function ingresarPalabra(e) {
    e.preventDefault();
    inputPalabra.value = "";
    palabraDiccionarioUsuario = "";
    NuevoJuegoCliqueado = false;
    permitirIngresarPalabra = true;
    del.style.visibility = "visible";
    inputPalabra.style.visibility = "visible";
    btnAgregarPalabra.style.visibility = "visible";
    cerrarTextarea.style.visibility = "visible";
    continuarJuego.style.visibility = "visible";
    inputPalabra.focus();
    let teclasAnuladas = document.querySelectorAll(":disabled");
    for (let i = 0; i < teclasAnuladas.length; i++) {
        teclasAnuladas[i].removeAttribute("disabled");
        teclasAnuladas[i].style.background = "linear-gradient(86deg, #ffffffd4, #6e6868";
        teclasAnuladas[i].style.color = "black";
    }
};
//agregar palabras al array de palabras aleatorias
function agregarPalabra(e) {
    let validarPalabraIngresada = /^[A-Z-ÿ\u00d1]+$/g;
    let palabraParaValidar = inputPalabra.value;
    if (palabraParaValidar.match(validarPalabraIngresada)) {
        let palabraAgregadaPorJugador = inputPalabra.value;
        palabras.push(palabraAgregadaPorJugador);
        inputPalabra.value = "";
        palabraIngresada.style.visibility = "visible";
        setTimeout(() => (palabraIngresada.style.visibility = "hidden"), 2500);
        inputPalabra.focus();
        palabraDiccionarioUsuario = "";
    } else {
        alert("Ingrese solo mayúsculas, sin tildes ni caracteres especiales");
        inputPalabra.value = "";
        inputPalabra.focus();
    }
};
//ocultar textarea 
function cerrarIngresarPalabra(e) {
    e.preventDefault();
    inputPalabra.style.visibility = "hidden";
    cerrarTextarea.style.visibility = "hidden";
    btnAgregarPalabra.style.visibility = "hidden";
    palabraIngresada.style.visibility = "hidden";
    del.style.visibility = "hidden";
    NuevoJuegoCliqueado = true;
    del.style.visibility = "hidden";
    continuarJuego.style.visibility = "hidden";
    for(let tecla of teclitas) {
        for(let letraApretada of arrayLetrasPresionadas) {
            if(tecla.textContent == letraApretada) {
                tecla.setAttribute("disabled", true)
                tecla.style.background = "black" 
                tecla.style.color = "whitesmoke"
            }
        }
    }

};

function continuarJuegoPausado(e) {
    e.preventDefault();
    NuevoJuegoCliqueado = true;
    del.style.visibility = "hidden";
    for (let i = 0; i < teclitas.length; i++) {  
        for (let x = 0; x < arrayLetrasPresionadas.length; x++) {  

            if (teclitas[i].textContent == arrayLetrasPresionadas[x]) {  
                    teclitas[i].setAttribute("disabled", true)
                    teclitas[i].style.background = "black" 
                    teclitas[i].style.color = "whitesmoke"
            }
        }
    }
};

cerrarTextarea.addEventListener('click', cerrarIngresarPalabra);
nuevoJuego.addEventListener('click', crearJuego);
virtualKeyboard.addEventListener("click", jugar);
btnAgregarPalabra.addEventListener("click", agregarPalabra);
nuevaPalabra.addEventListener('click', ingresarPalabra);
continuarJuego.addEventListener('click', continuarJuegoPausado);