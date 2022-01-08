let input = document.querySelector(".card-body input");
let times = document.querySelector(".times");

let infoText = document.querySelector(".starttext");

let meaning = document.querySelector(".meansDec");

let wordData = document.querySelector(".meanding");

let cardsElements = document.querySelector(".card_elements");
let exampleMeans = document.querySelector(".exp");

let char = document.querySelector(".char");

let v_up = document.querySelector(".v-up");

let synonyms = document.querySelector(".synonyms span");
// console.log(synonyms);

let img_set = document.querySelector('.img_set');

const data = (result, word) => {
  if (result.title) {
    cardsElements.style.display = "none";
    infoText.innerHTML = `can't find meaning of ${word}`;
    img_set.style.display = "none";
} else {
      img_set.style.display = "block";
    cardsElements.style.display = "block";
    infoText.innerHTML = "";
    wordData.innerHTML = word;
    let definitions = result[0].meanings[0].definitions[0].definition;
    meaning.innerHTML = definitions;
    exampleMeans.innerHTML = result[0].meanings[0].definitions[0].example;
    char.innerHTML = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}`;
    audioData = new Audio("https:" + result[0].phonetics[0].audio);

    let def = result[0].meanings[0].definitions[0];

    if (def.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";
      for (let index = 0; index < 5; index++) {
        console.log(def.synonyms[index]);
        let tag = `  <span class="syn border  border-end-0 border-start-0 border-top-0" onclick = "searchFunction('${def.synonyms[index]}')">${def.synonyms[index]}</span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }

    // console.log(definitions.synonyms[0]);
  }
};

function searchFunction (word){
    fetchApi(word);
    input.value = word;
    img_set.style.display = "block";
    let tagImg = `https://source.unsplash.com/120x120/?${word}`;
    img_set.src = tagImg;

}

const fetchApi = (word) => {
  infoText.innerHTML = `searching meaning of ${word}`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      data(result, word);
    });
  // .catch(infoText.innerHTML = `can't find meaning of ${word}`)
};

const fetchApi2 = (word) =>{
    img_set.style.display = "block";
    let tagImg = `https://source.unsplash.com/70x70/?${word}`;
    img_set.src = tagImg;
}

input.addEventListener("keyup", (e) => {
  let inptVal = input.value;
  if (inptVal.length > 0) {
    times.style.display = "block";
  } else {
    times.style.display = "none";
  }

  if (e.key == "Enter") {
    fetchApi(inptVal);
    fetchApi2(inptVal);
  }
});

times.addEventListener("click", () => {
  input.value = "";
});
v_up.addEventListener("click", () => {
  v_up.style.opacity = ".6";
  audioData.play();
  setTimeout(() => {
    v_up.style.opacity = "1";
  }, 800);
});

// https://source.unsplash.com/720x600/?fitness,gym
