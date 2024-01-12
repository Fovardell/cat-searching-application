import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_l6BMumGMsTtSiO3uupFxmKaEwGNovrtu9OXvZyLPct79ZRWP2DyMeJQ2D9cbVtv3";


function fetchBreeds() {
	return axios.get('https://api.thecatapi.com/v1/breeds').then(res => {
		return res.data;
	}).catch(err => console.log(err.message));
}
function fetchCatByBreed(breedId) {
	return axios.get('https://api.thecatapi.com/v1/images/search', {
		params: {
			breed_ids: breedId,
		}
	}).then(res => { return res.data[0]; })
		.catch(err => console.log(err.message));
}
export { fetchBreeds, fetchCatByBreed };