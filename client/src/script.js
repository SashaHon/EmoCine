const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

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
    const moviesData = await response.json();
    showMovieSuggestion(moviesData);
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
function showMovieSuggestion(data) {
  const list = document.querySelector("#movieList");
  if (list.childElementCount !== 0) {
    list.innerHTML = "";
  }
  data.map((obj) => {
    const listItem = document.createElement("li");
    const embedLink = obj.trailerLink.replace(/watch\?v=/, "embed/");
    console.log("here", embedLink);
    listItem.innerHTML = `
    <article>
      <h2 id="title">${obj.title}</h2>
      <div id="wrapper">
      <img id="poster" src=${obj.imgUrl} alt="${obj.title} poster">
       <iframe id="trailer" width="420" height="345" src=${embedLink} title="video"></iframe>
     </div>
      <ul id="description">
        <li id="year">Year: ${obj.year}</li>
        <li id="genre">Genre: ${obj.genre}</li>
        <li id="rating">IMDB Rating: ${obj.imdbRating}</li>
        <li id="imdblink"><a href=${obj.imdbLink} target='_blank'>See more info at IMDB</a></li>
      </ul>
     
    </article >
    `;
    list.append(listItem);
  });
}
