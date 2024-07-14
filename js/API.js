class GetMethods{
	constructor() {
	}
	
	getAllMealsByCategory(handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/categories.php", true);
		my_request.send()
	}
	
	getAllMeals(handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?s=", true);
		my_request.send()
	}
	
	getMealDetailsByID(ID,handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + ID, true);
		my_request.send()
	}
	
	getAreas(handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/list.php?a=list", true);
		my_request.send()
	}
	
	getIngredients(handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/list.php?i=list", true);
		my_request.send()
	}
}

class FilterMethods{
	constructor() {
	}
	
	filterByIngredient(ingredient,handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient, true);
		my_request.send()
	}
	
	filterByCategory(category,handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category, true);
		my_request.send()
	}
	
	filterByArea(area,handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area, true);
		my_request.send()
	}
}

class SearchMethods{
	constructor() {
	}
	
	serachByName(name,handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name, true);
		my_request.send()
	}
	
	serachByFirstLetter(letter,handler){
		document.getElementById('loader').style.display = 'flex'
		let my_request = new XMLHttpRequest();
		my_request.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				handler(this.responseText)
			}
		};
		my_request.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter, true);
		my_request.send()
	}
}

class API_Fetcher{
	Getter =  new GetMethods()
	Filter = new FilterMethods()
	Search = new SearchMethods()
	constructor(){
	}
}