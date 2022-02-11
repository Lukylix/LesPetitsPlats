function cardFactory(recipe) {
	const { name, ingredients, time, description } = recipe;

	function getCardDom() {
		const figure = document.createElement("figure");
		figure.className = "card";
		const fakeImg = document.createElement("img");
		fakeImg.className = "fake-image";
		const figcaption = document.createElement("figcaption");
		const recipeTitle = document.createElement("h2");

		const recipeNameSpan = document.createElement("span");
		recipeNameSpan.textContent = name;

		const timeSpan = document.createElement("span");
		timeSpan.className = "bold";
		const clockIcon = document.createElement("i");
		clockIcon.className = "far fa-clock";
		const timeText = document.createTextNode(` ${time} min`);
		timeSpan.appendChild(clockIcon);
		timeSpan.appendChild(timeText);

		recipeTitle.appendChild(recipeNameSpan);
		recipeTitle.appendChild(timeSpan);

		const ingredientList = document.createElement("ul");
		ingredients.forEach((ingredient) => {
			const { ingredient: name, quantity, unit } = ingredient;
			const listItem = document.createElement("li");

			const ingredientNameSpan = document.createElement("span");
			ingredientNameSpan.textContent = `${name}${quantity ? ": " : ""}`;
			ingredientNameSpan.className = "bold";

			const ingredientQuantity = document.createTextNode(`${quantity || ""} ${unit || ""}`);

			listItem.appendChild(ingredientNameSpan);
			listItem.appendChild(ingredientQuantity);
			ingredientList.appendChild(listItem);
		});

		const descriptionP = document.createElement("p");
		descriptionP.textContent = description;

		figcaption.appendChild(recipeTitle);
		figcaption.appendChild(ingredientList);
		figcaption.appendChild(descriptionP);

		figure.appendChild(fakeImg);
		figure.appendChild(figcaption);
		return figure;
	}
	return { getCardDom };
}
