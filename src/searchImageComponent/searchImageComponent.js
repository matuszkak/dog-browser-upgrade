import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class SearchImage extends ContentComponent {

  // eslint-disable-next-line constructor-super
  constructor() {
    super();
    // példányosításkor megjelenítjük a keresőt automatikusan
    this.render();
  }

  // letöltjük az API-ról az adatot
  async getImages(dogbreed) {

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
    this.clearContent();
    this.clearErrors();
    const image = document.createElement('img');
    image.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    // console.log(data);
  }

  render() {
    //megjelíníti a keresőt
    const markup = `
  <form class="dog-search">
    <span class="search-icon"></span>
    <input type="text" id="dogSearchInput">
    <button>Search</button>
  </form>
`;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    // console.log(this);
    // const self = this;
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(this);
      // console.log(event);
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
    });

  }
}

export default SearchImage;
