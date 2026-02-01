const foodContainer = document.getElementById("food-container");

const handleFetchFoods = async () => {
  const response = await fetch("./data/foods.json");
  return response.json();
};

const renderCards = (data) => {
  data.map((food, index) => {
    const card = document.createElement("div");
    card.classList = "card";
    const cardImage = document.createElement("img");
    cardImage.src = food.imageUrl;
    cardImage.classList = "card-image";
    const cardHeader = document.createElement("a");
    cardHeader.textContent = food.name;
    cardHeader.href = `food/${food.id}`;
    cardHeader.classList = "card-header";

    card.appendChild(cardImage);
    card.appendChild(cardHeader);

    foodContainer.appendChild(card);
  });
};

window.onload = async () => {
  const data = await handleFetchFoods();
  renderCards(data);
};
