let x = document.getElementById("boton");
let listaItems = document.getElementById("listaItems");
let cargarApi = document.getElementById("cargarApi");
let tarjetas;

//evento cuando se recarga la pagina
window.addEventListener("DOMContentLoaded", callBack);

x.addEventListener("click", myFunction);
cargarApi.addEventListener("click", callBack);

function callBack() {
  consumirApi().then((data) => {
    data.forEach((element) => {
      cargarDatos(element.title, element.id, element.content);
    });
  });
}

async function consumirApi() {
  const response = await fetch(
    "https://my-json-server.typicode.com/SantiagoVaraldo/Equipo1Task/posts"
  );
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}

function cargarDatos(title, id, content) {
  let value = title;
  let listaItems = document.getElementById("listaItems");
  let newDiv = document.createElement("div");
  let newItem = document.createElement("li");
  let newH2 = document.createElement("h2");
  let newP = document.createElement("p");
  newH2.setAttribute("class", "newH2");
  newDiv.setAttribute("class", "newDiv");
  newP.setAttribute("class", "newP");
  newP.setAttribute("id", id);
  newH2.innerHTML = value;
  newP.innerHTML = content;
  newDiv.appendChild(newH2);
  newDiv.appendChild(newP);
  newItem.appendChild(newDiv);
  listaItems.appendChild(newItem);
  newItem.addEventListener("click", removeElement);
}

function myFunction() {
  let input = document.getElementById("input");
  if (input) {
    let value = input.value;
    let listaItems = document.getElementById("listaItems");
    let newItem = document.createElement("li");
    newItem.innerHTML = value;
    listaItems.appendChild(newItem);
    newItem.addEventListener("click", removeElement);
  }
}

function removeElement() {
  this.parentNode.removeChild(this);
  console.log(this);
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data,
  });
  return response.json();
}

// postData("https://my-json-server.typicode.com/SantiagoVaraldo/Equipo1Task/posts", { answer: 42 }).then((data) => {
// 	console.log(data);
// });

async function translateApi(content,id) {
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "21b0fc5a69msh9b45f3303585286p129062jsnd0f8c79f022e",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: "en",
      target_language: "es",
      text: content,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    var json = JSON.parse(result);
    console.log(json["data"].translatedText);
    var elementoP = document.getElementById(id)
    elementoP.innerHTML = json["data"].translatedText;
  } catch (error) {
    console.error(error);
  }
}

function cargarTarjetas(){
  consumirApi().then((data) => {
    data.forEach((element) => {
      translateApi(element.content, element.id);
    });
  });
}

document.getElementById("translate").addEventListener("click",cargarTarjetas);
