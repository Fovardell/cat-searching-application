import axios from "axios";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";



const info = document.querySelector('.cat-container');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

let slim = new SlimSelect({
	select: '.breed-select',
	settings: {
		showSearch: false,
		disabled: true,
	},
	events: {
		afterClose: () => {
			const ID = slim.getSelected().join('');
			loader.style.display = "block";
			info.style.display = "none";
			slim.disable();
			fetchCatByBreed(ID).then(({ url, breeds }) => {
				const { name, description, temperament } = breeds[0];
				loader.style.display = "none";
				info.style.display = "flex";
				slim.enable();
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
				loader.style.display = "none";
				slim.disable();
				Notiflix.Report.failure(
					'Oops! Something went wrong!',
					'Try reloading the page!',
					'Reload',
					function cb() {
						location.reload();
					},
				);
			});

		},
	}
});

fetchBreeds().then(res => {
	loader.style.display = "none";
	slim.setData(renderOptions(res));
	slim.enable();
}).catch(err => {
	slim.disable();
	Notiflix.Report.failure(
		'Oops! Something went wrong!',
		'Try reloading the page!',
		'Reload',
		function cb() {
			location.reload();
		},
	);
});
function renderOptions(arr) {
	return arr.map(({ id, name }) => {
		return { text: name, value: id, };
	});
}


