import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { infoHandler } from './index';
import { refs } from './index';
export { fetchCountries };


function fetchCountries(name) {
    if (name === "") {
        refs.info.classList.add("hidden");
        refs.ul.innerHTML = "";
        refs.info.innerHTML = "";
    } else {

        fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(object => {
                if (object.length > 10) {
                    Notify.info(`Too many matches found. Please enter a more specific name.`);
                    refs.ul.innerHTML = "";
                }
                if (object.length > 1 && object.length < 11) {
                    refs.info.classList.add("hidden");
                    createList(object);


                }

                if (object.length === 1) {
                    refs.info.classList.remove("hidden");
                    Notify.success('Country found');
                    refs.info.innerHTML = "";
                    object.map(el => infoHandler(el));
                }
            })
            .catch(error => {
                refs.info.classList.add("hidden");
                console.log(error);
                Notify.failure(`Oops, there is no country with that name `);
                refs.info.innerHTML = "";
            })
    }
};

function createList(object) {
    object.map(el => {
        const li = document.createElement('li')
        li.innerHTML = `<img src="${el.flags.png}" alt="flag" width="30px"><h3 class="singlr-country"><span class="country-image">${el.name}</h3>`;
        refs.ul.append(li)
    }
    )
}