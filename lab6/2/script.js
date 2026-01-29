const cardContainer = document.getElementById("card-container");

const renderCards = (data) => {
  data.map((student, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${student.gender === "Male" ? "./assets/male.png" : "./assets/img_female.png"}" alt="${student.name}">
      <h2>${index + 1}. ${student.name}</h2>
      <p>Physics: ${student.physics}</p>
      <p>Mathematics: ${student.maths}</p>
      <p>English: ${student.english}</p>
    `;
    cardContainer.appendChild(card);
  });
};

const handleFetch = () => {
  fetch("./student-score.json")
    .then((response) => response.json())
    .then((data) => {
      renderCards(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

window.onload = () => {
  handleFetch();
};
