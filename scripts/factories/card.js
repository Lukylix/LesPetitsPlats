function cardFactory(recipe) {
	const { name, ingredients, time, description } = recipe;

	function getCardDom() {
		const card = document.createElement("figure");
		card.className = "card";
		const fakeImg = document.createElement("img");
		fakeImg.className = "fake-image";
		const figcaption = document.createElement("figcaption");

		// const titleContainer = document.createElement("div");
		// titleContainer.className = "title-container";

		const recipeName = document.createElement("h2");
		recipeName.textContent = name;
		const timeSpan = document.createElement("span");
		const clockIcon = document.createElement("i");
		clockIcon.className = "far fa-clock";
		const timeText = document.createElement("text");
		timeText.textContent = ` ${time} min`;
		timeSpan.appendChild(clockIcon);
		timeSpan.appendChild(timeText);

		recipeName.appendChild(timeSpan);
		// titleContainer.appendChild(recipeName);
		// titleContainer.appendChild(timeP);

		// const descriptionContainer = document.createElement("div");
		// descriptionContainer.className = "description-container";
		const ingredientList = document.createElement("ul");
		ingredients.forEach((ingredient) => {
			const { ingredient: name, quantity, unit } = ingredient;
			const listItem = document.createElement("li");
			listItem.textContent = `${name} ${quantity ? quantity : ""} ${unit ? unit : ""}`;
			ingredientList.appendChild(listItem);
		});
		const descriptionP = document.createElement("p");
		descriptionP.textContent = description;
		// descriptionContainer.appendChild(ingredientList);
		// descriptionContainer.appendChild(descriptionP);

		figcaption.appendChild(recipeName);
		figcaption.appendChild(ingredientList);
		figcaption.appendChild(descriptionP);
		// figcaption.appendChild(titleContainer);
		// figcaption.appendChild(descriptionContainer);
		card.appendChild(fakeImg);
		card.appendChild(figcaption);
		return card;
	}
	return { getCardDom };
}
