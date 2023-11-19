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
    // console.log(moviesData);
    showMovieSuggestion(moviesData); // main function where we assign movies data to the page elements;
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
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  title.textContent = data[0].title; // assign movie's title to the title in the first object of the array;
  //need more code and logic here;
}
