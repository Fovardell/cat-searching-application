import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";


const info = document.querySelector('.cat-container');
const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');



fetchBreeds().then(res => {
	select.style.display = "block";
	select.innerHTML = renderOptions(res);

}).catch(err => {
	select.style.display = "none";

	error.style.display = "block";
});

function renderOptions(arr) {
	return arr.map(({ id, name }) => {
		return `<option value="${id}">${name}</option>`;
	}).join('');
}


select.addEventListener('input', (e) => {
	const ID = e.currentTarget.selectedOptions[0].value;
	loader.style.display = "block";

	fetchCatByBreed(ID).then(({ url, breeds }) => {
		const { name, description, temperament } = breeds[0];
		loader.style.display = "none";
		select.style.display = "block";
		info.innerHTML = `
				<div class="img-container">
			<img class="cat-img"
			src="${url}"
			alt="">
		</div>
				<div class="cat-info">
			<h1 class="cat-info__title">${name}</h1>
			<p class="cat-info__text">
				${description}
			</p>
			<p class="cat-info__text">
				<strong>Temperament:</strong> ${temperament}
			</p>
		</div>`;
	}).catch(err => {
		select.style.display = "none";
		error.style.display = "block";
	});

});


// { name, description, temperament; }