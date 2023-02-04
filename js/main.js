const changeModeBtn = document.querySelector('.top__btn')
const changeModeIcon = document.querySelector('.top__btn__icon')
const logo = document.querySelector('.top__logo')
const app = document.querySelector('.app')
const header = document.querySelector('.top')
const search = document.querySelector('.search')
const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')
const boxes = document.querySelectorAll('.box')
const nameInfo = document.querySelector('.box__info-name')
const carbohydratesInfo = document.querySelector('.box__info-carbohydrates')
const proteinInfo = document.querySelector('.box__info-protein')
const fatInfo = document.querySelector('.box__info-fat')
const caloriesInfo = document.querySelector('.box__info-calories')
const fiberInfo = document.querySelector('.box__info-fiber')

const darkMode = () => {
	document.body.classList.toggle('bg-dark')
	app.classList.toggle('text-dark')
	changeModeBtn.classList.toggle('main-dark')
	document.body.classList.contains('bg-dark')
		? changeModeIcon.setAttribute('src', 'img/moon.svg')
		: changeModeIcon.setAttribute('src', 'img/sun.svg')
	logo.classList.toggle('fill-white')
	header.classList.toggle('main-dark')
	search.classList.toggle('main-dark')
	searchInput.classList.toggle('main-dark')
	searchInput.classList.toggle('text-dark')
	searchBtn.classList.toggle('bg-dark')
	searchBtn.classList.toggle('text-dark')
	searchInput.classList.toggle('border-dark')
	boxes.forEach(box => box.classList.toggle('main-dark'))
}
const getFood = () => {
	const fruit = searchInput.value || 'Banana'
	const API_ID = '6da6660d'
	const API_KEY = 'b4113f6a87d30d8facfa4aea12bb41bb'
	const URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${API_ID}&app_key=${API_KEY}&ingr=${fruit}`
	return new Promise((resolve, reject) => {
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				const foodInfo = data.hints[0].food.nutrients
				nameInfo.textContent = fruit
				carbohydratesInfo.textContent = `${foodInfo.CHOCDF} g`
				proteinInfo.textContent = `${foodInfo.PROCNT} g`
				fatInfo.textContent = `${foodInfo.FAT} g`
				caloriesInfo.textContent = `${foodInfo.ENERC_KCAL} kcal`
				fiberInfo.textContent = `${foodInfo.FIBTG} g`
				searchInput.value = ''
				resolve('Succes')
				reject('Error')
			})
	})
}

const api = async () => {
	try {
		const succes = await getFood()
		console.log(succes)
	} catch {
		const error = await getFood()
		console.log(error)
	}
}

const enterCheck = e => {
	if (e.key === 'Enter') {
		api()
	}
}

changeModeBtn.addEventListener('click', darkMode)
searchBtn.addEventListener('click', api)
searchInput.addEventListener('keyup', enterCheck)
