// const siteUrl = 'http://www.omdbapi.com/';
import {addMovieToList,
clearMoviesMarkup,
createMarkup,
createStyle,
createInfoField,
deleteInfoField,
createMovieList,
triggerMode,
movieList,
inputSearch,
movieListContainer
} from './dom.js';

let siteUrl = null;

let searchLast = null;
let searchList = null;
// let searchListDomEl = null;

const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms);
  }
})();

const getData = (url) => fetch(url)
.then((res) => res.json())
.then((json) => {
  if (!json || !json.Search) throw Error('Сервер вернул неправильный объект')
  return json.Search;
});

const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();
    
    if (searchString && searchString.length > 3 && searchString !== searchLast) {
     
      
      if (!triggerMode) {
        clearMoviesMarkup(movieList);
        searchList = [];
      } 
      else {
        // let el = document.querySelector('.search__movie-item');
        // console.log(el);
        if (searchList.length ===1 &&  document.querySelector('.search__movie-item') === null) createMovieList(searchList[searchList.length - 1]);
        };
      
      getData(`${siteUrl}?s=${searchString}&apikey=cb6da3fb`)
        .then((movies) =>{
          if (searchList.indexOf(searchString) !=-1) {
            createInfoField('Такой запрос уже выполен. Для продолжения кликните мышью');
            deleteInfoField();
          } else {
            searchList.push(searchString);
            if (triggerMode) createMovieList(searchString);
            
            movies.forEach((movie) => addMovieToList(movie))}}
          )
    
        .catch((err) => {
          createInfoField('Фильм не найден. Кликните мышью');
          deleteInfoField();
          console.error(err)});
    }
    
    searchLast = searchString;
  }, 2000)
};

export const appInit = (url) => {
  createMarkup();
  createStyle();
  siteUrl = url;
  inputSearch.addEventListener('keyup', inputSearchHandler);
}