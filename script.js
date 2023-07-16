const pokemonName = document.querySelector(".pokemonName");
const pokemonNumber = document.querySelector(".pokemonNumber");
const pokemonImg = document.querySelector(".pokemonImg");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".inputSearch");
const buttonPrev = document.querySelector(".btnPrev");
const buttonNext = document.querySelector(".btnNext");
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
};
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImg.style.display = "block";
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
      ];
    inputSearch.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImg.style.display = "none";
    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Not Found :(";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
