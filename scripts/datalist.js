class dataList {
	constructor(containerSelector, data, selectedCallBack = () => {}) {
		this.data = data;
		this.selectedCallBack = selectedCallBack;
		this.parentContainer = document.querySelector(containerSelector).parentNode;
		this.container = document.querySelector(containerSelector);
		this.input = document.querySelector(containerSelector + " input[list]");
		this.dataList = document.querySelector(containerSelector + " + datalist");
		this.options = this.dataList.querySelectorAll("option");
		this.selected = [];
		this._setDataList();
		this._addEventListeners();
		this._setParentWidth();
	}
	set dataOptions(data) {
		this.data = data;
		this._setDataList();
		this._setParentWidth();
	}

	removeSelected(value) {
		this.selected = this.selected.filter((item) => item !== value);
		this.selectedCallBack();
	}

	_setDataList() {
		this.dataList.innerHTML = "";
		this.data.forEach((item) => {
			let option = document.createElement("option");
			option.value = item;
			option.textContent = item;
			this.dataList.appendChild(option);
		});
		this.options = this.dataList.querySelectorAll("option");
	}
	_setParentWidth() {
		this.parentContainer.classList.remove("w30");
		this.parentContainer.classList.remove("w20");
		if (this.data.length > 20) {
			this.parentContainer.classList.add("w30");
			return;
		}
		if (this.data.length > 10) {
			this.parentContainer.classList.add("w20");
			return;
		}
	}
	_addEventListeners() {
		this.input.addEventListener("focus", () => {
			this.dataList.style.display = "grid";
			this.parentContainer.classList.add("active");
		});
		this.input.addEventListener("blur", () => {
			setTimeout(() => {
				this.dataList.style.display = "none";
				this.parentContainer.classList.remove("active");
			}, 100);
		});
		this.input.addEventListener("input", () => {
			this.options.forEach((option) => {
				if (option.value.toLowerCase().includes(this.input.value.toLowerCase())) {
					option.style.display = "block";
				} else {
					option.style.display = "none";
				}
			});
		});
		this.options.forEach((option) => {
			option.addEventListener("click", () => {
				//this.input.value = option.value;
				// Unique selection value
				this.selected = [...new Set([...this.selected, option.value])];
				this.selectedCallBack();
			});
		});
	}
}

//new dataList("#ingrédient-container", ["Pomme", "Poire", "Cerise", "Pattate"]);
