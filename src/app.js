import './css/style.css';
import './index.html';
import ListBreeds from './listBreedsComponent/listBreedsComponent';
import SearchImage from './searchImageComponent/searchImageComponent';

// separation of concerns
// ez itt a példányosítás - ha nem hivatkozunk később a változóra akkor nem kell létrehozni, elég a new expression
new SearchImage();

new ListBreeds();

