console.log("hello");
let access_token = "5a3eb071";

const search = document.getElementById("search");
const suggestion = document.getElementById("match-list");
let currentMovie = {};

// function to add the "favourite" movie to the local storage: We use local storage to make it persistant.
function favMovie(e) {
    const first = e.target.name.split(" ");
    const movieName = first[0] + first[1];
    console.log("details", movieName);
    if (e.target.innerHTML == "Favourite") {
        e.target.innerHTML = "Unfavourite";
        let favmovie = JSON.parse(localStorage.getItem("favMovie")) || [];
        let results = JSON.parse(localStorage.getItem("results")) || [];
        favmovie.push(results[Number(e.target.id)]);
        localStorage.setItem("favMovie", JSON.stringify(favmovie));
        e.target.value = " ";
        // var div = this.parentElement;
        // div.style.display = "none";
    }
}


// Function to see the movie details
function movieDetails(event) {
    // variable get the items stored in the localstorage(i.e. results).
    let results = JSON.parse(localStorage.getItem("results")) || [];

    let current_movie = results[Number(event.target.id)];

    localStorage.setItem("current_movie", JSON.stringify(current_movie));

    // Will open the location where the movie.html is stored.
    window.location.assign("movie.html");
}



// Function fetch api OF words typed by the user whenever it entters the words in input tag

search.addEventListener("input", (e) => {
    // Async function expression.
    const fetchApi = async function () {

        const response = await fetch(
            `https://www.omdbapi.com/?t=${e.target.value}&apikey=${access_token}`
        );
        const data = await response.json();



        let results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(data);
        localStorage.setItem("results", JSON.stringify(results));
        const avatar = data.Title;
        const imgsrc = data.Poster;
        currentMovie = data;

        // Creating a suggestion for the user. below code will create a section to show all the data comming from the API.

        suggestion.innerHTML += `
          <div class="card-body">
        <h5 class="card-title">${avatar}</h5>
        <img src="${imgsrc}" class="img-mov" >
        <button class="btn btn-primary" id="${results.length - 1}" name=${JSON.stringify(
            data
        )} onclick="favMovie(event)">Favourite</button>
        <button class="btn btn-primary" id="${results.length - 1
            }" onclick=movieDetails(event)>Details</button>
      </div>`;


    };

    fetchApi();
});