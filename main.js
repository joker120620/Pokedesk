
async function traer(i,calback) {
    res= await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    res = await res.json();
    let nombre=res.name
    //console.log(res)
    let url =res.sprites.other.dream_world.front_default;
    let tipo=res.types[0].type.name
    calback(url,nombre,tipo, habilidad, i)
    
    
    
}
function crearTarjet(url,nombre,tipo, habilidad, i) {
    
    let contenedor = document.querySelector("#container_pokemon");
    let div = document.createElement("div");
    let divImagen = document.createElement("div");
    let titulo = document.createElement("h3");
    let textNombre = document.createTextNode(nombre);
    titulo.appendChild(textNombre)
    let imagen = document.createElement("img");
    imagen.setAttribute("src", url);
    
    
    imagen.setAttribute("class", "imagen")
    divImagen.setAttribute("class", "imagen_pokemon")
    
    switch(tipo){
      case "fire":
      div.setAttribute("class", "target_pokemon_red")
      div.setAttribute("onclick", `abrirModal(${i},"#ff485b" )`)
      
      break
    case "water":
      div.setAttribute("class", "target_pokemon_blue")
      div.setAttribute("onclick", `abrirModal(${i},"#00a5ff" )`)
      
      
      break
    case "rock":
      div.setAttribute("class", "target_pokemon_gray")
      div.setAttribute("onclick", `abrirModal(${i},"#7d7575" )`) 
      
      break
    case "grass":
      div.setAttribute("class", "target_pokemon_green")
      div.setAttribute("onclick", `abrirModal(${i},"rgba(63, 244, 63, 0.505)" )`)
      break
    case "electric":
      div.setAttribute("class", "target_pokemon_yellow")
      div.setAttribute("onclick", `abrirModal(${i},"#eac74a" )`)
      
      break
    default:
      div.setAttribute("class", "target_pokemon_default")
      div.setAttribute("onclick", `abrirModal(${i},"#f4eaf5")`)
      
    }
    
    div.setAttribute("id", "target_pokemon")
    
    
    divImagen.appendChild(imagen)
    div.appendChild(divImagen)
    div.appendChild(titulo)
    contenedor.appendChild(div)
}
async function inicio() {
    
        for (let i=1; i < 50; i++) {
                await traer(i,crearTarjet)
        }
}
inicio()
let buscador=document.getElementById("buscador");
let btnBuscador=document.getElementById("btnBuscar");
buscador.addEventListener("keydown",()=>{
    if(buscador.value!==""){
      btnBuscador.addEventListener("click", ()=>{
        
        for (let i = 0; i < 50; i++) {
          let con = document.getElementById("container_pokemon")
          let rem = document.getElementById("target_pokemon")
          con.removeChild(rem)
        
        }
        traer(buscador.value, crearTarjet)
      })

       
    
  }else {
      inicio()
    }
 
})
function abrirModal(i, color) {
    let modal = document.querySelector("#modal")
    document.getElementById("container_pokemon").classList.replace('container_pokemon', 'ocultar' ) 
  
    let cont_modal=document.getElementById("container_modal")
    cont_modal.style.backgroundColor=color
    modal.style.top="0px";
    traer(i,cambiarDatos)
}

function cambiarDatos(url,nombre,i) {
    let imgModal = document.querySelector("#modal_image")
    let nomModal = document.querySelector("#modal_nombre")
    imgModal.setAttribute("src",url);
    nomModal.innerHTML = nombre;
    document.querySelector("#habilidad").innerHTML=`Habilidad: ${res.abilities[0].ability.name} `
    document.querySelector("#tipo").innerHTML=`Tipo: ${res.types[0].type.name} `
    
}
function cerrarModal() {
    let modal = document.querySelector("#modal")
    modal.style.top="-1000px";
    document.getElementById("container_pokemon").classList.replace( 'ocultar', 'container_pokemon') 
    
}