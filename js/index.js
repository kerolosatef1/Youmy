class HtmlHandler{
	constructor(page_content_id,loader_id,api_fetcher_class) {
		this.PageContent = document.getElementById(page_content_id)
		this.Loader = document.getElementById(loader_id)
		this.api_fetcher = api_fetcher_class
	}
	
	categoryHandler(data){
		this.handleSidebar()
		let category_list = ''
		let categories = JSON.parse(data)['categories']
		for(let i = 0;i < categories.length;i++){
			category_list += `<div id="` + categories[i]['idCategory'] + `" onclick="api_fetcher.Filter.filterByCategory('` + categories[i]['strCategory'] + `',(data) => {html_handler.categoryFilterHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden ">
                    <div class="team-box my-4 overflow-hidden">
                        <div class="card">
                            <div class="team_image position-relative">
                                <img src="` + categories[i]['strCategoryThumb'] + `" class="card-img-top" alt="...">
                                <div class="team_image_overlay position-absolute ">
                                    <h1 class="fs-1">` + categories[i]['strCategory'] + `</h1>
                                    <p>` + String(categories[i]['strCategoryDescription']).substring(0,150) + `...</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>`
		}
		this.PageContent.innerHTML = category_list
		this.Loader.style.display = 'none'
	}
	
	allMealsHandler(data){
		let menue = ''
		let items = JSON.parse(data)['meals']
		for(let i = 0;i < items.length;i++){
			menue += `<div id="` + items[i]['idMeal'] + `" onclick="api_fetcher.Getter.getMealDetailsByID(` + items[i]['idMeal'] + `,(data) => {html_handler.MealFilterByIdHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden rounded-2">
                    <div class="team-box my-4 overflow-hidden">
                        <div class="card">
                            <div class="team_image position-relative">
                                <img src="` + items[i]['strMealThumb'] + `" class="card-img-top" alt="...">
                                <div class="team_image_overlay position-absolute ">
                                    <h1 class="fs-1">` + items[i]['strMeal'] + `</h1>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>`
		}
		this.PageContent.innerHTML = menue
		this.Loader.style.display = 'none'
	}
	
	MealFilterByIdHandler(data){
		let item = JSON.parse(data)['meals'][0]
		let itemInfo = `
                <div class="col-md-4">
                    <img class="w-100 rounded-3" src="` + item['strMealThumb'] + `" alt="">
                    <h2>` + item['strMeal'] + `</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>` + item['strInstructions'] + `</p>
                    <h3><span class="fw-bolder">Area : </span>` + item['strArea'] + `</h3>
                    <h3><span class="fw-bolder">Category : </span>` + item['strCategory'] + `</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">`
		let i = 1
		let ingeredientKey = 'strIngredient'
		let measureKey = 'strMeasure'
		while (item[ingeredientKey + i.toString()]){
			itemInfo += `<li class="alert alert-info m-2 p-1">` + item[measureKey + i.toString()] + ` ` + item[ingeredientKey + i.toString()] + `</li>`
			i += 1
		}
		itemInfo += `</ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">`

		if(item['strTags'] !== "" && item['strTags'] !== undefined && item['strTags'] !== null){
			let tags = item['strTags'].split(",");
			let i = 0
			while(tags[i]){
				itemInfo += `<li class="alert alert-danger m-2 p-1">` + tags[i] + `</li>`
				i += 1
			}
		}

		itemInfo += `</ul>
                    <a target="_blank" href="` + item['strSource'] + `" class="btn btn-success">Source</a>
                    <a target="_blank" href="` + item['strYoutube'] + `" class="btn btn-danger">Youtube</a>
                </div>`
		this.PageContent.innerHTML = itemInfo
		this.Loader.style.display = 'none'
	}
	
	SerachInitialization(){
		this.handleSidebar()
		this.PageContent.innerHTML = `
                <div class="col-12 d-flex flex-wrap gap-3 justify-content-center pb-4">
                    <div class="col-md-5 col-sm-12">
                        <input id="nameSearch"  onkeyup="html_handler.searchNameHandler(this.value)"   type="text" placeholder="Search By Name" class="form-control bg-transparent text-white custom-serach-placeholder">
                    </div>
                    <div class="col-md-5 col-sm-12">
                        <input id="firstLetterSearch"  onkeyup="html_handler.searchFirstLetterHandler(this.value)" maxlength="1"  type="text" placeholder="Search By First letter" class="form-control bg-transparent text-white custom-serach-placeholder">
                    </div>
                </div>
                <div class="d-flex m-auto">
                    <div class="row w-100" id="filter-results">
                    </div>
                </div>
            `
	}
	
	searchNameHandler(input){
		this.api_fetcher.Search.serachByName(input, (data) => {
			let menue = ''
			if(data){
				let items = JSON.parse(data)['meals']
				for(let i = 0;i < items.length;i++){
					menue += `<div id="` + items[i]['idMeal'] + `" onclick="api_fetcher.Getter.getMealDetailsByID(` + items[i]['idMeal'] + `,(data) => {html_handler.MealFilterByIdHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden rounded-2">
	                    <div class="team-box my-4 overflow-hidden">
	                        <div class="card">
	                            <div class="team_image position-relative">
	                                <img src="` + items[i]['strMealThumb'] + `" class="card-img-top" alt="...">
	                                <div class="team_image_overlay position-absolute ">
	                                    <h1 class="fs-1">` + items[i]['strMeal'] + `</h1>
	                                </div>
	                            </div>

	                        </div>

	                    </div>

	                </div>`
				}
				document.getElementById('filter-results').innerHTML = menue
			}
			this.Loader.style.display = 'none'
		})
	}
	
	searchFirstLetterHandler(input){
		this.api_fetcher.Search.serachByFirstLetter(input, (data) => {
			let menue = ''
			if(data){
				let items = JSON.parse(data)['meals']
				for(let i = 0;i < items.length;i++){
					menue += `<div id="` + items[i]['idMeal'] + `" onclick="api_fetcher.Getter.getMealDetailsByID(` + items[i]['idMeal'] + `,(data) => {html_handler.MealFilterByIdHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden rounded-2">
                    <div class="team-box my-4 overflow-hidden">
                        <div class="card">
                            <div class="team_image position-relative">
                                <img src="` + items[i]['strMealThumb'] + `" class="card-img-top" alt="...">
                                <div class="team_image_overlay position-absolute ">
                                    <h1 class="fs-1">` + items[i]['strMeal'] + `</h1>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>`
				}
				document.getElementById('filter-results').innerHTML = menue
			}
			this.Loader.style.display = 'none'
		})
	}
	
	categoryFilterHandler(data){
		let category_list = ''
		let categories = JSON.parse(data)['meals']
		for(let i = 0;i < categories.length;i++){
			category_list += `<div id="` + categories[i]['idMeal'] + `" onclick="api_fetcher.Getter.getMealDetailsByID(` + categories[i]['idMeal'] + `,(data) => {html_handler.MealFilterByIdHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden rounded-2">
                    <div class="team-box my-4 overflow-hidden">
                        <div class="card">
                            <div class="team_image position-relative">
                                <img src="` + categories[i]['strMealThumb'] + `" class="card-img-top" alt="...">
                                <div class="team_image_overlay position-absolute ">
                                    <h1 class="fs-1">` + categories[i]['strMeal'] + `</h1>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>`
		}
		this.PageContent.innerHTML = category_list
		this.Loader.style.display = 'none'
	}
	
	AreaListHandler(data){
		this.handleSidebar()
		let area_list = ''
		let areas = JSON.parse(data)['meals']
		for(let i = 0;i < areas.length;i++){
			area_list += `
                    <div class="col-md-3" onclick="api_fetcher.Filter.filterByArea('` + areas[i]['strArea'] + `',(data) => {html_handler.areaFilterHandler(data)})">
                        <div class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>` + areas[i]['strArea'] + `</h3>
                        </div>
                    </div>`
		}
		this.PageContent.innerHTML = area_list
		this.Loader.style.display = 'none'
	}
	
	areaFilterHandler(data){
		let area_list = ''
		let areas = JSON.parse(data)['meals']
		for(let i = 0;i < areas.length;i++){
			area_list += `<div id="` + areas[i]['idMeal'] + `" onclick="api_fetcher.Getter.getMealDetailsByID(` + areas[i]['idMeal'] + `,(data) => {html_handler.MealFilterByIdHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden rounded-2">
                    <div class="team-box my-4 overflow-hidden">
                        <div class="card">
                            <div class="team_image position-relative">
                                <img src="` + areas[i]['strMealThumb'] + `" class="card-img-top" alt="...">
                                <div class="team_image_overlay position-absolute ">
                                    <h1 class="fs-1">` + areas[i]['strMeal'] + `</h1>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>`
		}
		this.PageContent.innerHTML = area_list
		this.Loader.style.display = 'none'
	}
	
	ingredientsHandler(data){
		this.handleSidebar()
		let ingredient_list = ''
		let ingredients = JSON.parse(data)['meals']
		let max_length = 30
		for(let i = 0;i < ingredients.length;i++){
			if(ingredients[i]['strDescription'] === null || ingredients[i]['strDescription'] === '')
				continue
			ingredient_list += `
                    <div onclick="api_fetcher.Filter.filterByIngredient('` + ingredients[i]['strIngredient'] + `',(data) => {html_handler.areaFilterHandler(data)})" class="col-md-3">
                        <div class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>` + ingredients[i]['strIngredient'] + `</h3>
                            <p>` + String(ingredients[i]['strDescription']).substring(0,150) + `...</p>
                        </div>
                  </div>
                `
			if(i > max_length)
				break
		}
		this.PageContent.innerHTML = ingredient_list
		this.Loader.style.display = 'none'
	}
	
	ingredientFilterHandler(data){
		let ingredient_meals_list = ''
		let ingredients_meals = JSON.parse(data)['meals']
		for(let i = 0;i < ingredients_meals.length;i++){
			ingredient_meals_list += `<div id="` + ingredients_meals[i]['idMeal'] + `" onclick="api_fetcher.Getter.getMealDetailsByID(` + ingredients_meals[i]['idMeal'] + `,(data) => {html_handler.MealFilterByIdHandler(data)})" class="col-md-3 col-sm-12 overflow-hidden rounded-2">
                    <div class="team-box my-4 overflow-hidden">
                        <div class="card">
                            <div class="team_image position-relative">
                                <img src="` + ingredients_meals[i]['strMealThumb'] + `" class="card-img-top" alt="...">
                                <div class="team_image_overlay position-absolute ">
                                    <h1 class="fs-1">` + ingredients_meals[i]['strMeal'] + `</h1>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>`
		}
		this.PageContent.innerHTML = ingredient_meals_list
		this.Loader.style.display = 'none'
	}
	
	handleSidebar(){
		let buttons = $(".sidebar .nav-content .nav-buttons button");
		let sidebar = document.getElementById('sidebar')
		let open_close_button = document.getElementById('sidebar-open-close-button')
		if(sidebar.classList.contains("closed")){
			sidebar.style.transitionDelay = 0 + 's';
			for (let i = 0;i<buttons.length;i++){
				let delay = i * 0.1;
				buttons[i].style.transitionDelay = delay + 's';
			}
			sidebar.classList.remove("closed")
			open_close_button.className = "fa-solid fa-x"
		}else{
			sidebar.style.transitionDelay = 0.2 + 's';
			for (let i = 0;i<buttons.length;i++){
				let delay = (buttons.length - i) * 0.05;
				buttons[i].style.transitionDelay = delay + 's';
			}
			sidebar.classList.add("closed")
			open_close_button.className = "fa-solid fa-bars"
		}
	}
	
	ContactUsInitialization(){
		this.handleSidebar()
		this.PageContent.innerHTML = `
                <div class="row py-5 g-4 " id="rowData"><div style="height: 70vh !important;" class="contact d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input id="nameInput" onkeyup="html_validator.nameValidator()" type="text" class="form-control" placeholder="Enter Your Name">
                                <div id="nameWarning" class="alert alert-danger w-100 mt-2 d-none">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" onkeyup="html_validator.emailValidator()" type="email" class="form-control " placeholder="Enter Your Email">
                                <div id="emailWarning" class="alert alert-danger w-100 mt-2 d-none">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneInput" onkeyup="html_validator.phoneValidator()" type="text" class="form-control " placeholder="Enter Your Phone" >
                                <div id="phoneWarning" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput" onkeyup="html_validator.ageValidator()" type="number" class="form-control " placeholder="Enter Your Age">
                                <div id="ageWarning" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="passwordInput" onkeyup="html_validator.passwordValidator()" type="password" class="form-control " placeholder="Enter Your Password">
                                <div id="passwordWarning" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="repasswordInput" onkeyup="html_validator.repasswordValidator()" type="password" class="form-control " placeholder="Repassword">
                                <div id="repasswordWarning" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid repassword 
                                </div>
                            </div>
                        </div>
                        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div>
            `
	}
}

class HtmlValidator{
	constructor(validator) {
		this.validator = validator
	}
	
	nameValidator(){
		if(this.validator.nameValidation()){
			document.getElementById("nameWarning").classList.replace("d-block", "d-none")
		}else{
			document.getElementById("nameWarning").classList.replace("d-none", "d-block")
		}
		this.contactUsButtonHandler()
	}
	
	emailValidator(){
		if(this.validator.emailValidation()){
			document.getElementById("emailWarning").classList.replace("d-block", "d-none")
		}else{
			document.getElementById("emailWarning").classList.replace("d-none", "d-block")
		}
		this.contactUsButtonHandler()
	}

	phoneValidator(){
		if(this.validator.phoneValidation()){
			document.getElementById("phoneWarning").classList.replace("d-block", "d-none")
		}else{
			document.getElementById("phoneWarning").classList.replace("d-none", "d-block")
		}
		this.contactUsButtonHandler()
	}

	ageValidator(){
		if(this.validator.ageValidation()){
			document.getElementById("ageWarning").classList.replace("d-block", "d-none")
		}else{
			document.getElementById("ageWarning").classList.replace("d-none", "d-block")
		}
		this.contactUsButtonHandler()
	}

	passwordValidator(){
		if(this.validator.passwordValidation()){
			document.getElementById("passwordWarning").classList.replace("d-block", "d-none")
		}else{
			document.getElementById("passwordWarning").classList.replace("d-none", "d-block")
		}
		this.contactUsButtonHandler()
	}

	repasswordValidator(){
		if(this.validator.repasswordValidation()){
			document.getElementById("repasswordWarning").classList.replace("d-block", "d-none")
		}else{
			document.getElementById("repasswordWarning").classList.replace("d-none", "d-block")
		}
		this.contactUsButtonHandler()
	}

	contactUsButtonHandler(){
		if (this.validator.nameValidation() && this.validator.emailValidation() && this.validator.phoneValidation() && this.validator.ageValidation() && this.validator.passwordValidation() && this.validator.repasswordValidation()) {
			document.getElementById('submitBtn').removeAttribute("disabled")
		} else {
			document.getElementById('submitBtn').setAttribute("disabled","true")
		}
	}
}