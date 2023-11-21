const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

const movieItem = document.querySelector("#movieItem");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

let currentMovieIndex = 0;
let moviesData = [];

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch("http://localhost:3005/movies-db", {
      method: "POST",
      body: parseFormData(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    moviesData = await response.json();
    showMovieSuggestion(currentMovieIndex);
  } catch (error) {
    console.error("Error:", error);
  }
}

function parseFormData(formData) {
  let obj = {};
  for (let [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return JSON.stringify(obj);
}

function showMovieSuggestion(index) {
  if (moviesData.length > 0) {
    const movie = moviesData[index];
    const embedLink = movie.trailerLink.replace(/watch\?v=/, "embed/");
    movieItem.innerHTML = `
      <article>
      <h1 id="messagetext">This movie matches your mood!</h1>
        <h2 id="title">${movie.title}</h2>
        <div id="wrapper">
          <img id="poster" src=${movie.imgUrl} alt="${movie.title} poster">
          <iframe id="trailer" width="420" height="345" src=${embedLink} title="video"></iframe>
        </div>
        <ul id="description">
          <li id="year">Year: ${movie.year}</li>
          <li id="genre">Genre: ${movie.genre}</li>
          <li id="rating">IMDB Rating: ${movie.imdbRating}</li>
          <li id="imdblink"><a href=${movie.imdbLink} target='_blank'>See more info at IMDB</a></li>
        </ul>
      </article>
    `;
    currentMovieIndex = index;
    updateButtons();
  } else {
    movieItem.innerHTML = "No movies found.";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
}

function updateButtons() {
  if (moviesData.length > 1) {
    prevButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
  } else {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
}

nextButton.addEventListener("click", showNextMovie);

function showNextMovie() {
  if (currentMovieIndex < moviesData.length - 1) {
    currentMovieIndex++;
    showMovieSuggestion(currentMovieIndex);
  }
}

prevButton.addEventListener("click", showPreviousMovie);

function showPreviousMovie() {
  if (currentMovieIndex > 0) {
    currentMovieIndex--;
    showMovieSuggestion(currentMovieIndex);
  }
}
