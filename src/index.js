import { fetchPix, resetPage } from './fetch-pix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

const refs = {
    inputForm: document.querySelector(".search-form"),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    infScroll:document.querySelector('.scroll-guard')
}
let imageName = "";
let totalHits = 0;
console.log(refs.loadMoreBtn);


refs.loadMoreBtn.classList.add('is-hidden')
refs.inputForm.addEventListener("submit", onSearchFormSubmit);
refs.loadMoreBtn.addEventListener("click", onLoadMoreBtn)

async function onSearchFormSubmit(evt) {
    evt.preventDefault();
    refs.galleryContainer.innerHTML = "";
    resetPage();
    imageName = searchRequestString(evt.target.searchQuery.value);

    if (imageName === "") {
        return Notiflix.Notify.failure('Write something....');

    }
   try{await fetchPix(imageName);
    refs.loadMoreBtn.classList.remove('is-hidden')
        evt.target.searchQuery.value = "";
    } 
   catch (error) {
       Notiflix.Notify.failure("THIS IS THE END")
    }
    infiniteScroll();
}
function searchRequestString(str) {
  return  str=str.trim().split(" ").join("+")
}
async function onLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('is-hidden');
    await fetchPix(imageName);
    simpleLightFunction();
   refs.loadMoreBtn.classList.remove('is-hidden');
}


refs.galleryContainer.addEventListener('click', onGalleryClick)

function onGalleryClick(evt) {
    evt.preventDefault();
    simpleLightFunction();
}


function simpleLightFunction() {
    let gallery = new SimpleLightbox('.simple_link');
  
    gallery.refresh()
}
function infiniteScroll() {
  const observerOptions = {
     rootMargin: '400px',
    threshold: 1.0
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            onLoadMoreBtn();
        }
    })
 },observerOptions)
observer.observe(refs.infScroll)  
}
