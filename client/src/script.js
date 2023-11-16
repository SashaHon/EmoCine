// import { moviesList, emotions } from "./movies-mocks.js";

const title = document.querySelector("#title");
const description = document.querySelector("#description");

async function getMoviesData(link) {
  const response = await fetch(link);
  const movieData = await response.json();

  console.log(movieData);
  movieData.map((obj) => {
    title.textContent = obj.Title;
    description.textContent = `Year: ${obj.Year} 
      Genre: ${obj.Genre}
      IMBD Rating: ${obj.Rating}`;
  });
}
getMoviesData("http://localhost:3005/movies");
