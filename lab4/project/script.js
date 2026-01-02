const fetchFoodData = async () => {
    const response = await fetch("./data.json")
    const data = await response.json()
    return data
}
const foodCatalog = document.getElementById("foods")

const renderFoodCatalog = (data) => {
    data.forEach(food => {
        const foodCard = document.createElement("div")
        foodCard.className = "bg-white/20 backdrop-blur-md rounded-md border-1 border-gray-100 p-8 space-y-4 shadow-md hover:scale-105 transition-transform cursor-pointer"

        const foodImage = document.createElement("img")
        foodImage.className = "rounded-md"
        foodImage.src = food.imageUrl
        foodImage.alt = food.name

        const foodInfo = document.createElement("div")
        foodInfo.className = "text-center space-y-2"

        const foodName = document.createElement("h1")
        foodName.className = "text-2xl font-semibold"
        foodName.textContent = food.name

        const recipeLink = document.createElement("p")
        recipeLink.className = "text-blue-500"
        recipeLink.textContent = "คลิ๊กเพื่อดูสูตร"

        foodInfo.appendChild(foodName)
        foodInfo.appendChild(recipeLink)

        foodCard.appendChild(foodImage)
        foodCard.appendChild(foodInfo)

        foodCatalog.appendChild(foodCard)

        foodCard.addEventListener("click", () => {
            const modal = document.createElement("div")
            modal.className = "fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"

            const modalContent = document.createElement("div")
            modalContent.className = "bg-white rounded-md p-6 max-w-lg w-full relative"

            const closeButton = document.createElement("span")
            closeButton.className = "absolute top-2 right-4 text-2xl font-bold cursor-pointer"
            closeButton.innerHTML = "&times;"
            closeButton.addEventListener("click", () => {
                document.body.removeChild(modal)
            })

            const modalTitle = document.createElement("h2")
            modalTitle.className = "text-3xl font-semibold mb-4"
            modalTitle.textContent = food.name

            const cookingMethod = document.createElement("p")
            cookingMethod.className = "whitespace-pre-line"
            cookingMethod.textContent = food.cookingMethod

            modalContent.appendChild(closeButton)
            modalContent.appendChild(modalTitle)
            modalContent.appendChild(cookingMethod)
            modal.appendChild(modalContent)
            document.body.appendChild(modal)
        })

    })
}

window.onload = async () => {
    const data = await fetchFoodData()
    renderFoodCatalog(data)
}
