
import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';


class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }

  async getFullList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    //  ha az url nem elérhető akkor hibajelzét ad
    if (response.status === 404) {
      this.displayError('Page not found!');
      return;
    }
    const data = await response.json();
    return data;
  }

  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
    document.querySelector('#content').appendChild(item);
  }

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