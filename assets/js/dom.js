export let movieList = null;
export let inputSearch = null;
export let triggerMode = false;
export let movieListContainer;
export let infoField;
let searchBox;


const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  evt = null,
  handler = null,
  }) => {
  const el = document.createElement(type);
  for (let key in attrs) {
    if (key !== 'innerText') {
      el.setAttribute(key, attrs[key]) 
    } else {
      el.innerHTML = attrs[key]
    }
  };
  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);
  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);
  
  return el;
};

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerText: `
      * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      padding: 20px;
      max-width: 1280px;
      margin: 0 auto;
    }
    .movies {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    .movie {
      display: flex;
      align-content: center;
      justify-content: center;
    }
    .movie__image {
      width: 100%;
      object-fit: cover;
    }
    .search {
      margin-bottom: 30px;
      position: relative;
    }
    .search__label-input {
      display: block;
      margin-bottom: 7px;
    }
    .search__input {
      display: block;
      width: 400px;
      padding: 10px 15px;
      margin-bottom: 10px;
      border: 1px solid lightsteelblue;
      border-radius: 4px;
    }
    .search__label-checkbox {
      font-size: 12px;
      display: block;
      margin-top: -17px;
      margin-left: 25px;
    }
    
    .search__info {
      display: block;
      background-color: sandybrown;
      padding: 20px;
      width: 400px;
      font-size: 12px;
      font-weight: 200;
      border-radius: 4px;
      border: 1px solid rgb(247, 155, 75);
      position: absolute;
      z-index: 10;
      top: 15px;
      left: 0;
    }
    .search__movie-list {
      width: 400px;
      padding: 10px 20px;
      margin-top: 15px;
      border: 1px solid lightsteelblue;
      border-radius: 4px;
    }
    .search__movie-title {
      font-size: 14px;
    }
    .search__movie-item {
      font-size: 12px;
    }
      `
      },
    container:  document.head,
  });
};

export const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: {class: 'container'},
    container: document.body,
    position: 'prepend'}); 
  
  createElement({
    type: 'h1',
    attrs: {
      innerText: 'Приложение для поиска фильмов'},
    container});
  
  searchBox = createElement({
    type: 'div',
    attrs: {class: 'search'},
    container});
  
  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerText: 'Поиск фильмов',
    },
    container: searchBox});
  
    inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'text',
      placeholder: 'Начните вводить текст...'
    },
    container: searchBox});
  
  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox',
    },
    container: searchBox,
    evt: 'click',
    handler: () => {
      triggerMode = !triggerMode;
      triggerMode ? createListContainer() : movieListContainer.remove();
      return triggerMode;
    }

  });
  
  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerText: 'Добавить фильм к существующему списку',
    },
    container: searchBox,
  });
  
  movieList = createElement({
    type: 'div',
    attrs: {class: 'movies'},
    container});

};

export const addMovieToList = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: {
      class: 'movie',
    },
    container: movieList});
  const img = createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^https*:\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/8.jpg',
      alt: movie.Title,
      title: movie.Title,
    },
    container: item});

};

export const createInfoField = (infoText) => {
  if (infoText !==undefined) {
    infoField = createElement({
      type: 'p',
      attrs: {
        class: 'search__info',
        innerText: infoText},
      container: searchBox});
  }
};
export const deleteInfoField = () => { 
  document.addEventListener('click', () => infoField.remove());
};

const createListContainer = () => {
  movieListContainer = createElement({
    type: 'div',
    attrs: {class: 'search__movie-list'},
    container: searchBox});
  createElement({
    type: 'ul',
      attrs: {
        class: 'search__movie-title',
        innerText: 'Перечень фильмов в списке'},
    container: movieListContainer});
};
// const deleteListContainer = () => {
  
// }
export const createMovieList = (searchFilm) => {
    createElement({
      type: 'li',
      attrs: {
        class: 'search__movie-item',
        innerText: searchFilm},
      container: movieListContainer});
};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');