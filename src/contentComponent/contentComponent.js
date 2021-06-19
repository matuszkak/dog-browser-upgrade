import '../css/listBreedsComponent.css';

import preloading from '../img/preloading.gif';
import yall from 'yall-js';

export default class ContentComponent {

  // ha van már kép megjelenítve akkkor töröljük
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  // errorok törlése
  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // megjelenít egy hibaüzenetet a felhasználónak
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }

  async getImages(dogbreed) {
    // fetches image via API for a specific dogbreed
    // error handling for empty search bar and Upper case scenario
    // breeds and sub-breeds possible as well

    if (!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudok keresni!');
      //megállítjuk a getImages függvény futását
      return;

    }
    let urlString = '';
    dogbreed = dogbreed.split(' ');
    // szétvágja a sztringet ha alítousra is keresünk, mostmár tömb lesz
    if (dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0].toLowerCase()}/images`;
    } else if (dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1].toLowerCase()}/${dogbreed[0].toLowerCase()}/images`;
    }
    // console.log(urlString);
    const response = await fetch(urlString);
    const data = await response.json();

    // data változó egy tömb amely objecteket tartalmaz
    return data;
  }

  // ez a metódus megjelenít egy képet (véletlenszerűen)
  displayImage(data) {
    const image = document.createElement('img');
    // eslint-disable-next-line quotes
    image.classList.add('lazy');
    image.src = preloading;
    image.dataset.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    // console.log(data);
    yall({
      events: {
        load: event => {
          if (event.target.nodeName == 'IMG' && !event.target.classList.contains('lazy')) {
            event.target.classList.add('yall-loaded');
          }
        }
      }
    });
  }

  handleContentDisplay(searchTerm) {
    // clear content and errors from srceen, get and display requested number of images
    // if NaN or non-integer typed in one image will be shown

    let count = Math.floor(parseInt(document.querySelector('#imageNumberInput').value));
    console.log(count);
    if (isNaN(count) || count < 1) {
      count = 1;
    }
    this.clearContent();
    this.clearErrors();
    for (let i = 1; i <= count; i++) {
      const searchTerm = document.querySelector('#dogSearchInput').value;
      // mivel getImages egy async method ezért ez is promisse-sal tér vissza
      // emiatt a promise objecten amit a getImages visszaad elérhető a .then() metódus 
      // ennek bemeneti paramétere egy callback function ami akkor fut le
      // a promise beteljesül (akkor jön létre a data amit visszaad a getImages metódus)
      // ha egy paraméter van az arrow functionben akkor elhagyható a zárójel
      this.getImages(searchTerm).then(result => {
        // ha csak egy dolgot kell csinálni az if blockban akkor a {} kódblokk elhagyható és egy sorba írható
        if (result) this.displayImage(result);
      });
    }
  }

  setSearchTerm(term) {
    // puts pre-defined term into search bar
    document.querySelector('#dogSearchInput').value = term;
  }

}