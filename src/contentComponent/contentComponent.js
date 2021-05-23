import '../css/listBreedsComponent.css';


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
}