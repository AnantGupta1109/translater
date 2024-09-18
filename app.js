const fromlang = document.querySelector("#fromlang");
const tolang = document.querySelector("#tolang");
const fromtxt = document.querySelector("#source-text")
const totxt = document.querySelector("#translated-text");

{
  let dropdowns = document.querySelectorAll("select");

  for(let select of dropdowns){
    for(let code in LANGUAGES){
        let option = document.createElement("option");
        option.innerText = LANGUAGES[code]
        option.value = code;
      
        select.append(option);
    }
    
  }
fromlang.value = "en"
tolang.value = "hi"
}

document.getElementById("btn").addEventListener("click", translate);


async function translate() {


  let to = tolang.value
  let from = fromlang.value
  let text = fromtxt.value

  if(text === ""){
    return;
  }

  document.querySelector("body").style.cursor = 'progress'
  document.querySelector(".loader").style.display = "inline"
  document.querySelector(".container").style.display = "none"

  const KEY = "ae41a0d113msh45b223beec7dcabp16cfdcjsndb7c59e61b67";

  const url =
    `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${to}&from=${from}`; // Translating to French
  
    const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": KEY, // Replace with your actual key
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        Text: text, // Replace with the text you want to translate
      },
    ]),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result[0].translations[0].text);
    document.querySelector("body").style.cursor = 'default'
    totxt.value = result[0].translations[0].text;
    document.querySelector(".loader").style.display = "none"
    document.querySelector(".container").style.display = "block"


  } catch (error) {
    console.error(error);
    document.querySelector("body").style.cursor = 'default'
    document.querySelector(".loader").style.display = "none"
    document.querySelector(".container").style.display = "block"

  }

}
