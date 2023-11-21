const emotions = document.querySelector("#emotionsList");
const list = document.querySelector("#movieList");
const clearBtn = document.querySelector(".clear_btn");
emotions.addEventListener("click", handleClickEmotions);
clearBtn.addEventListener("click", clearMovieList);

async function handleClickEmotions(e) {
  const emotion = e.target.getAttribute("emotion");
  const isActive = document.querySelector(".active");
  isActive.removeAttribute("class");

  e.target.classList.add("active");

  try {
    const response = await fetch("http://localhost:3005/movies-db", {
      method: "POST",
      body: createBodyRequest(emotion),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const moviesData = await response.json();
    showMovieSuggestion(moviesData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function createBodyRequest(value) {
  return JSON.stringify({ emotion: value });
}

// function parseFormData(formData) {
//   let obj = {};
//   for (let [key, value] of formData.entries()) {
//     obj[key] = value;
//   }

//   return JSON.stringify(obj);
// }

function showMovieSuggestion(data) {
  // const list = document.querySelector("#movieList");
  if (list.childElementCount !== 0) {
    clearMovieList();
  }

  data.map((obj) => {
    const listItem = document.createElement("li");
    const embedLink = obj.trailerLink.replace(/watch\?v=/, "embed/");

    listItem.innerHTML = `
    <article>
      <h2 id="title">${obj.title}</h2>
      <ul id="description">
        <li id="year">Year: ${obj.year}</li>
        <li id="genre">Genre: ${obj.genre}</li>
        <li id="rating">IMDB Rating: ${obj.imdbRating}</li>
        <li id="imdblink"><a href=${obj.imdbLink} target='_blank'>See more info at IMDB</a></li>
      </ul>
      <div id="wrapper">
       <img src=${obj.imgUrl} alt="${obj.title} poster">
        <iframe id="trailer" width="420" height="345" src=${embedLink} title="video"></iframe>
      </div>
    </article >
    `;

    list.append(listItem);
  });
}

function clearMovieList() {
  list.innerHTML = "";
}
