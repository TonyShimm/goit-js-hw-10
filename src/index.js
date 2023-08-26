import { fetchBreeds } from './js/cat-browser';
import { fetchEachCat } from './js/cat-browser';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './css/styles.css';

const refs = {
  selectField: document.querySelector(`.breed-select`),
  cartdCard: document.querySelector(`.cat-info`),
  loader: document.querySelector(`.loader`),
  error: document.querySelector(`.error`),
};

showLoader();
hideError();
hideSelect();

fetchBreeds()
  .then(breeds => {
    populateSelectWithBreeds(breeds.data);
  })
  .catch(error => {
    console.log(error);
    hideLoader();
  })
  .finally(() => {
    refs.loader.style.display = 'none';
  });

refs.selectField.addEventListener('change', showCardCat);

function populateSelectWithBreeds(breeds) {
  const optionsMarkup = breeds
    .map(({ id, name }, index) => `<option value="${id}">${name}</option>`)
    .join('');

  refs.selectField.insertAdjacentHTML(`afterbegin`, optionsMarkup);

  hideLoader();

  new SlimSelect({
    select: refs.selectField,
  });

  showSelect();
}

function showCardCat(event) {
  event.preventDefault();
  const selectedBreedId = event.target.value;

  showLoader();
  hideError();

  fetchEachCat(selectedBreedId)
    .then(catData => {
      hideLoader();

      refs.cartdCard.innerHTML = `<img src="${catData.data[0].url}" alt="" />
      <div class="characteristics-cat">
        <h2>${catData.data[0].breeds[0].name}</h2>
        <p>${catData.data[0].breeds[0].description}</p>
        <p><span class="temp">Temperament: </span>${catData.data[0].breeds[0].temperament}</p>
      </div>`;
    })
    .catch(error => {
      hideLoader();
      showError();

      console.error('Error fetching cat data:', error);
    });
}

function showLoader() {
  refs.cartdCard.innerHTML = ``;
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

function showError() {
  refs.error.classList.remove('hidden');
}

function hideError() {
  refs.error.classList.add('hidden');
}

function showSelect() {
  refs.selectField.classList.remove('hidden');
}

function hideSelect() {
  refs.selectField.classList.add('hidden');
}
