import './css/styles.css';
import NewAPIService from './JS/new-service';
import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/' ;
const KEY = 'key=30951910-62deaf9663a2ad8fd5a993571';
const options = 'image_type=photo&orientation=horizontal&horizontal=true';
let page = 1;

const searchFormEL = document.querySelector('.search-form');
const galleryEL = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

searchFormEL.addEventListener('submit', onSearchPhoto);
loadMore.addEventListener('click', onloadMore);

const newAPIService = new NewAPIService();

function onSearchPhoto(event) {
  event.preventDefault();
  galleryEL.innerHTML = '';
  const value = event.currentTarget.elements.searchQuery.value;
  axios.get(`${BASE_URL}?${KEY}&${options}&q=${value}&page=${page}&per_page=40`)
    .then(res => {
      console.log(res.data.hits);
     const marcap = res.data.hits.map(info => 
          `<div class="photo-card">
            <img src="${info.webformatURL}" alt="${info.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${info.likes}
              </p>
              <p class="info-item">
               <b>Views</b> ${info.views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${info.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${info.downloads}
              </p>
            </div>
            </div>
          
        `).join('');
      galleryEL.insertAdjacentHTML('beforeend', marcap);
      console.log(galleryEL);
  });
  loadMore.classList.remove('visually-hidden');
  console.log(loadMore);  
  onloadMore();
 

};

function onloadMore(){
  page = page + 1;
  return page
  }

