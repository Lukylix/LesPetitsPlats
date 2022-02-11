async function displayCards(recipes) {
	const cardContainer = document.getElementById("card-container");
	cardContainer.innerHTML = "";
	// Add recipe cards to the card container
	recipes.forEach((recipe) => {
		const cardModel = cardFactory(recipe);
		const cardDom = cardModel.getCardDom();
		cardContainer.appendChild(cardDom);
	});
	// If no recipes are found, display a message
	if (recipes.length < 1) {
		const noResult = document.createElement("h2");
		noResult.textContent =
			"Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
		cardContainer.appendChild(noResult);
	}
}
// Filter recipes by search terms
function search(searchTerm) {
	if (!searchTerm.length > 2) return recipes;
	// Get all search terms in lowercase into an array
	const searchTerms = searchTerm.toLowerCase().split(" ");
	let results = [];
	for (const recipe of recipes) {
		let areWorldsFound = true;
		for (const searchTerm of searchTerms) {
			// If a search term is not found in the recipe name or description
			if (!(recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm))) {
				// Get all ingredients form the recipe in an single string
				const ingredients = recipe.ingredients.reduce((acc, ingredient) => (acc += ingredient.ingredient), "");
				// If the search term is also not found in the ingredients
				if (!ingredients.toLowerCase().includes(searchTerm)) {
					// The recipe is not added to the results
					areWorldsFound = false;
					// Stop checking the current recipe
					break;
				}
			}
		}
		// If all search terms are found in the recipe, add it to the results array
		if (areWorldsFound) results.push(recipe);
	}
	return results;
}

// Get all the unique ingredients from the recipes
function getIngredients(recipes) {
	const ingredients = [];
	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			ingredients.push(ingredient.ingredient);
		});
	});
	return [...new Set(ingredients)];
}

// Get all the unique appliance from the recipes
function getAppareils(recipes) {
	const appareils = [];
	recipes.forEach((recipe) => {
		appareils.push(recipe.appliance);
	});
	return [...new Set(appareils)];
}

// Get all the unique utensils from the recipes
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
	// Get all selected tags
	const tags = [
		{ type: "ingredients", selected: dataListIngredients.selected },
		{ type: "appareils", selected: dataListAppareils.selected },
		{ type: "ustensiles", selected: dataListUstensiles.selected },
	];
	// Add tags to the tags container
	tags.forEach((tag) => {
		const type = tag.type;
		tag.selected.forEach((selected) => {
			const tagDom = document.createElement("span");
			tagDom.classList.add("tag");
			tagDom.classList.add(type);
			tagDom.textContent = selected;
			const closeTagDom = document.createElement("i");
			closeTagDom.className = "far fa-times-circle";
			// Add a click event to remove the tag from is data list
			closeTagDom.addEventListener("click", () => {
				if (type === "ingredients") dataListIngredients.removeSelected(selected);
				else if (type === "appareils") dataListAppareils.removeSelected(selected);
				else if (type === "ustensiles") dataListUstensiles.removeSelected(selected);
			});
			tagDom.appendChild(closeTagDom);
			tagsContainer.appendChild(tagDom);
		});
	});
	// Update the search results
	recipesTags = searchTags();
	displayCards(recipesTags);
	// Update all the data list options that matches the remaining recipes
	dataListIngredients.dataOptions = getIngredients(recipesTags);
	dataListAppareils.dataOptions = getAppareils(recipesTags);
	dataListUstensiles.dataOptions = getUstensiles(recipesTags);
}

function searchTags() {
	// Get all the selected tags
	const tags = [
		{ type: "ingredients", selected: dataListIngredients.selected },
		{ type: "appareils", selected: dataListAppareils.selected },
		{ type: "ustensiles", selected: dataListUstensiles.selected },
	];
	const results = [];
	for (const recipe of recipesSearch) {
		let tagsFound = true;
		for (const tag of tags) {
			const tagType = tag.type;
			if (tagType === "ingredients") {
				// Get all the ingredients from the recipe into a single string
				const ingredients = recipe.ingredients.reduce((acc, ingredient) => (acc += ingredient.ingredient + " "), "");
				for (const selected of tag.selected) {
					// If the selected tag is not found in the recipe ingredients
					if (!ingredients.toLowerCase().includes(selected.toLowerCase())) {
						// The recipe is not added to the results
						tagsFound = false;
						// Stop checking the current tag and then the recipe
						break;
					}
				}
				// If the selected tags of type ingredient aren't found in the recipe ingredients, stop checking the current recipe
				if (!tagsFound) break;
			} else if (tagType === "appareils") {
				for (const selected of tag.selected) {
					// If the selected tag is not found in the recipe appliance
					if (!recipe.appliance.toLowerCase().includes(selected.toLowerCase())) {
						// The recipe is not added to the results
						tagsFound = false;
						// Stop checking the current tag and then the recipe
						break;
					}
				}
				// If the selected tags of type appliance aren't found in the recipe ingredients, stop checking the current recipe
				if (!tagsFound) break;
			} else if (tagType === "ustensiles") {
				// Get all the ustensils from the recipe into a single string
				let ustensiles = recipe.ustensils.reduce((acc, ustensile) => (acc += ustensile + " "), "");
				for (const selected of tag.selected) {
					// If the selected tag is not found in the recipe ustensils
					if (!ustensiles.toLowerCase().includes(selected.toLowerCase())) {
						// The recipe is not added to the results
						tagsFound = false;
						// Stop checking the current tag and then the recipe
						break;
					}
				}
				// If the selected tags of type ustensil aren't found in the recipe ingredients, stop checking the current recipe
				if (!tagsFound) break;
			}
		}
		// If all tags are found in the recipe, add it to the results array
		if (tagsFound) results.push(recipe);
	}
	return results;
}
// Initialize the data lists to their default container, options and callback on select
const dataListIngredients = new dataList("#ingrédient-container", getIngredients(recipes), displayTags);
const dataListAppareils = new dataList("#appareil-container", getAppareils(recipes), displayTags);
const dataListUstensiles = new dataList("#ustensile-container", getUstensiles(recipes), displayTags);

let recipesSearch = recipes;
let recipesTags = [];

async function init() {
	// Inilial display of the recipe cards
	displayCards(recipes);

	// Add a keyup event to the search input
	document.querySelector(".research-bar input").addEventListener("keyup", (event) => {
		const input = event.target;
		// Filter recipes by search terms
		recipesSearch = search(input.value);
		// Filter the remaining recipes by tags
		recipesTags = searchTags();

		displayCards(recipesTags);
		// Update all the data list options that matches the remaining recipes
		dataListIngredients.dataOptions = getIngredients(recipesTags);
		dataListAppareils.dataOptions = getAppareils(recipesTags);
		dataListUstensiles.dataOptions = getUstensiles(recipesTags);
	});
}

init();
