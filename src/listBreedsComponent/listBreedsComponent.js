
import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';


class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
    // localStorage törlés browser frissítéskor
    localStorage.clear();
  }

  // gets full list of breeds-subbreeds
  // basic error handling for network errors
  // list loaded to localStorage at first download to increase performance

  async getFullList() {
    // console.log(localStorage.getItem('infiniteScrollEnabled'));

    // ha a localStorage nincs feltöltve - infiniteScrollEnabled nincs megkeletkeztetve - akkor letöltjük a listát
    if (localStorage.getItem('infiniteScrollEnabled') === null) {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');

      if (response.status === 404) {
        this.displayError('Page not found!');
        return;
      }

      const data = await response.json();

      // bele is tesszük a letöltött listát a localStorage-ba, stringként
      localStorage.setItem('dogs', JSON.stringify(data));
      // console.log('betöltve');
      // és beállítjuk az infiniteScrollEnabled jelző értékét is
      localStorage.setItem('infiniteScrollEnabled', 'true');
      // console.log(localStorage);
      return data;

      // ha már volt letöltés, akkor csak kiszedjük az adatokat a localStorage-ból és azt return-öljük
    } else {
      const dogs = JSON.parse(localStorage.getItem('dogs'));
      // console.log('visszatöltve');
      return dogs;
    }
  }

  // creates list item for a dog breed-subbreed on screen
  // activates even listener for clicking
  // cares for displaying result on UI
  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
    item.addEventListener('click', () => {
      // console.log(title);
      // sets search term based on item clicked
      this.setSearchTerm(title);
      // display pic
      this.handleContentDisplay(title);
    });
    document.querySelector('#content').appendChild(item);
  }

  // puts together full list of dog breeds-subbreeds
  // cares for displaying them on UI by element
  displayList(results) {
    // a result.message egy object amin végigmegyünk key-value páronként
    for (let breed in results.message) {
      // ha a value (ami egy tömb) hossza nem 0
      if (results.message[breed].length !== 0) {
        // akkor végigmegyünk és kiírjuk a fajtákat alfajjal együtt
        for (const subBreed of results.message[breed]) {
          // minden alfaj mögé odaírjuk a főfaj nevét pl. boston bulldog, french bulldog, stb.
          this.createListItem(subBreed + ' ' + breed);
        }
      } else {
        // ha nincs alfaja, a tömb hossza 0 akkor csak a főfajt jelenítsük meg
        this.createListItem(breed);
      }
    }
  }

  // prepares screen and activates listBreed button
  // once clicked cares for displaying full range of dogbreeds and subbreeds
  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'ListBreeds';
    // button html elemnek van onclick attribútuma
    button.onclick = () => {
      this.clearContent();
      this.getFullList().then(results => {
        // shortcircuit evaluation - ha van eredmény csak akkor jeleníti meg...
        results && this.displayList(results);
      });
    };
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;