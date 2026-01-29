const handleFetchData = () => {
  const data = localStorage.getItem("movies");
  return data ? JSON.parse(data) : [];
};

const renderMovies = () => {
  const movieList = document.getElementById("movie-list");
  const moviesData = handleFetchData();

  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }

  if (moviesData.length === 0) {
    const noMoviesBanner = document.createElement("div");
    noMoviesBanner.className = "no-movies-banner";

    const noMoviesText = document.createElement("h1");
    const textNode = document.createTextNode("ยังไม่มีรายการโปรด");
    noMoviesText.appendChild(textNode);

    noMoviesBanner.appendChild(noMoviesText);
    movieList.appendChild(noMoviesBanner);
  } else {
    moviesData.forEach((movieName, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "movie-item";
      itemDiv.style.display = "flex";
      itemDiv.style.justifyContent = "space-between";
      itemDiv.style.alignItems = "center";
      itemDiv.style.padding = "10px";
      itemDiv.style.borderBottom = "1px solid #eee";

      const span = document.createElement("span");
      const movieText = document.createTextNode(movieName);
      span.appendChild(movieText);

      const deleteBtn = document.createElement("button");
      const btnText = document.createTextNode("ลบ");
      deleteBtn.appendChild(btnText);
      deleteBtn.style.backgroundColor = "#ff4d4d";

      deleteBtn.addEventListener("click", () => {
        handleDeleteData(index);
      });

      itemDiv.appendChild(span);
      itemDiv.appendChild(deleteBtn);
      movieList.appendChild(itemDiv);
    });
  }
};

const handleAddData = () => {
  const nameInput = document.getElementById("name-input");
  const nameValue = nameInput.value.trim();

  if (nameValue === "") {
    alert("กรุณาใส่ชื่อภาพยนตร์");
    return;
  }

  const oldData = handleFetchData();
  const newData = [...oldData, nameValue];

  localStorage.setItem("movies", JSON.stringify(newData));
  nameInput.value = "";
  renderMovies();
};

const handleDeleteData = (index) => {
  const oldData = handleFetchData();
  const newData = oldData.filter((_, i) => i !== index);
  localStorage.setItem("movies", JSON.stringify(newData));
  renderMovies();
};

const handleClearData = () => {
  if (confirm("คุณต้องการลบรายการทั้งหมดใช่หรือไม่?")) {
    localStorage.removeItem("movies");
    renderMovies();
  }
};

document.getElementById("add-button").addEventListener("click", handleAddData);
document
  .getElementById("clear-button")
  .addEventListener("click", handleClearData);

renderMovies();
