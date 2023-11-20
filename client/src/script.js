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
  const test = document.querySelector("#test");
  console.log(data);
 test.innerHTML=`<div class="container">
 <div id="myCarousel" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
     <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
     <li data-target="#myCarousel" data-slide-to="1"></li>
     <li data-target="#myCarousel" data-slide-to="2"></li>
   </ol>

   
   <div class="carousel-inner">

     <div class="item active">
       <img src="la.jpg"  id="imgurl" alt="farnak" style="width:100%;">
       <div class="carousel-caption">
         <iframe id="trailer" width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
         </iframe>
         <h2 id="title"></h2>
         <ul id="description">
           <li id="emotion">powercoders</li>
           <li id="genre"></li>
           <li id="year"></li>
           <li id="rating"></li>
           <li id="imdblink"></li>
       </ul>
       </div>
     </div>

    
     <a class="left carousel-control" href="#myCarousel" data-slide="prev">
       <span class="glyphicon glyphicon-chevron-left"></span>
       <span class="sr-only">Previous</span>
     </a>
     <a class="right carousel-control" href="#myCarousel" data-slide="next">
       <span class="glyphicon glyphicon-chevron-right"></span>
       <span class="sr-only">Next</span>
     </a>
 </div>
</div>
`

}



