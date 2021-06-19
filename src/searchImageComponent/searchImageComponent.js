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



  render() {
    //megjelíníti a keresőt
    const markup = `
  <form class="dog-search">
    <span class="search-icon"></span>
    <input type="text" id="dogSearchInput">
    <input type="text" id="imageNumberInput" placeholder="1">
    <button>Search</button>
  </form>
`;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);

    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      this.handleContentDisplay(document.querySelector('#dogSearchInput').value);
    });
  }

}

export default SearchImage;
