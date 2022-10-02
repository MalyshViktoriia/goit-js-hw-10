import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from "lodash.debounce";

export { infoHandler };
export { refs };

const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    ul: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.info.classList.add("hidden");

function inputHandler(e) {
    const inputValue = refs.input.value.trim();
    fetchCountries(inputValue);
}

function infoHandler({ name, capital, population, flags, languages }) {
    console.log(flags);
    console.log(languages);
    refs.info.insertAdjacentHTML('afterbegin',
        `<img src="${flags.png}" alt="flag" width="30px"><h3 class="country">${name}</h3>
        <p class="info">Capital: ${capital}</p
        <p class="info">Population: ${population}</p>
        <p class="info">Languages: ${parseLangArr(languages)}</p>`
    );
    refs.ul.innerHTML = "";
    console.log(typeof (Object.values(languages)));
};

function parseLangArr(arr) {
    const lang = arr.map(elem => elem.name);
    return lang.join(',');
};

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));