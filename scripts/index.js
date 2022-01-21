async function displayCards(recipes) {
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";
	recipes.forEach((recipe) => {
		const cardModel = cardFactory(recipe);
		const cardDom = cardModel.getCardDom();
		cardContainer.appendChild(cardDom);
	});
}

function search(searchTerm) {
	const searchTerms = searchTerm.toLowerCase().split(" ");
	let results = [];
	for (const recipe of recipes) {
		let areWorldsFound = true;
		for (const searchTerm of searchTerms) {
			if (!(recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm))) {
				const ingredients = recipe.ingredients.reduce((acc, ingredient) => (acc += ingredient.ingredient), "");
				if (!ingredients.toLowerCase().includes(searchTerm)) {
					areWorldsFound = false;
					break;
				}
			}
		}
		if (areWorldsFound) results.push(recipe);
	}
	return results;
}

async function init() {
	document.querySelector(".research-bar input").addEventListener("keyup", (event) => {
		const input = event.target;
		if (input.value.length > 2) {
			const results = search(input.value);
			displayCards(results);
		} else {
			displayCards(recipes);
		}
	});
	displayCards(recipes);
}

init();
