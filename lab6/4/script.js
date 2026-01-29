const handleFetchData = () => {
  const data = localStorage.getItem("movies");
  return JSON.parse(data);
};

const handleAddData = () => {
  const name = document.getElementById("name-input");
  if (!name) {
    alert("กรุณาใส่ชื่อ");
    return;
  }
  const oldData = handleFetchData();
  let newData = [];
  if (oldData) {
    newData = [...oldData, name];
  } else {
    newData = [name];
  }
  localStorage.setItem("movies", JSON.stringify(newData));
};

const handleDeleteData = () => {
  const name = document.getElementById("name-input");
  if (!name) {
    alert("กรุณาใส่ชื่อ");
    return;
  }
  const oldData = handleFetchData();
  const newData = oldData.filter((item) => item != name);
  localStorage.setItem("movies", newData);
};

const handleClearData = () => {
  localStorage.clear("movies");
};

document
  .getElementById("add-button")
  .addEventListener("click", () => handleAddData());

// document
//   .getElementById("delete-button")
//   .addEventListener("click", () => handleDeleteData());

document
  .getElementById("clear-button")
  .addEventListener("click", () => handleClearData());

const movieList = document.getElementById("movie-list");
const moviesData = handleFetchData();

if (!moviesData) {
  const noMoviesBanner = document.createElement("div");
  noMoviesBanner.className = "no-movies-banner";

  const noMoviesText = document.createElement("h1");
  noMoviesText.textContent = "ยังไม่มีรายการโปรด";

  noMoviesBanner.appendChild(noMoviesText);
  movieList.appendChild(noMoviesBanner);
}
