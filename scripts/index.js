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

function getIngredients(recipes) {
	const ingredients = [];
	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			ingredients.push(ingredient.ingredient);
		});
	});
	return [...new Set(ingredients)];
}

function getAppareils(recipes) {
	const appareils = [];
	recipes.forEach((recipe) => {
		appareils.push(recipe.appliance);
	});
	return [...new Set(appareils)];
}

function getUstensiles(recipes) {
	const ustensiles = [];
	recipes.forEach((recipe) => {
		recipe.ustensils.forEach((ustensile) => {
			ustensiles.push(ustensile);
		});
	});
	return [...new Set(ustensiles)];
}

function displayTags() {
	const tagsContainer = document.querySelector(".tags");
	tagsContainer.innerHTML = "";
	const tags = [
		{ type: "ingredients", selected: dataListIngredients.selected },
		{ type: "appareils", selected: dataListAppareils.selected },
		{ type: "ustensiles", selected: dataListUstensiles.selected },
	];
	tags.forEach((tag) => {
		const type = tag.type;
		tag.selected.forEach((selected) => {
			const tagDom = document.createElement("span");
			tagDom.classList.add("tag");
			tagDom.classList.add(type);
			tagDom.innerHTML = selected;
			const closeTagDom = document.createElement("i");
			closeTagDom.className = "far fa-times-circle";
			closeTagDom.addEventListener("click", () => {
				if (type === "ingredients") dataListIngredients.removeSelected(selected);
				if (type === "appareils") dataListAppareils.removeSelected(selected);
				if (type === "ustensiles") dataListUstensiles.removeSelected(selected);
			});
			tagDom.appendChild(closeTagDom);
			tagsContainer.appendChild(tagDom);
		});
	});
}

const dataListIngredients = new dataList("#ingrédient-container", getIngredients(recipes), displayTags);
const dataListAppareils = new dataList("#appareil-container", getAppareils(recipes), displayTags);
const dataListUstensiles = new dataList("#ustensile-container", getUstensiles(recipes), displayTags);

async function init() {
	displayCards(recipes);

	document.querySelector(".research-bar input").addEventListener("keyup", (event) => {
		const input = event.target;
		if (input.value.length > 2) {
			const results = search(input.value);
			displayCards(results);
			dataListIngredients.dataOptions = getIngredients(results);
			dataListAppareils.dataOptions = getAppareils(results);
			dataListUstensiles.dataOptions = getUstensiles(results);
		} else {
			displayCards(recipes);
			dataListIngredients.dataOptions = getIngredients(recipes);
			dataListAppareils.dataOptions = getAppareils(recipes);
			dataListUstensiles.dataOptions = getUstensiles(recipes);
		}
	});
}

init();
