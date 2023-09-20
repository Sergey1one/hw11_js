import axios from "axios";
import Notiflix from 'notiflix';
import { createGallery } from "./card-markup";
export { fetchPix,resetPage}

const BASE_URL = "https://pixabay.com/api/";
const DEFAULT_PAGE = 1;
const EL_PER_PAGE = 40;
let page_number = DEFAULT_PAGE;
const loadMoreBtn=document.querySelector(".load-more")

function resetPage() {
    page_number=DEFAULT_PAGE
}
async function fetchPix(searchWord) {
    const urlSearch = new URLSearchParams({
    key: '38310415-880d668019c8861033767a4c2',
    q:`${searchWord}`,
    image_type: 'photo',
        orientation: 'horizontal',
        per_page: EL_PER_PAGE,
        page: page_number,
    safesearch: true
    })
    await axios.get(`${BASE_URL}?${urlSearch}`).then((response) => {
        
        totalHits = response.data.totalHits;
         
        if (totalHits === 0) {
             Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.', {
                 timeout: 4000,
             position:"center-center"});
        
            loadMoreBtn.style.display="none";
            
         }
        
         response = response.data.hits;
         const lastPage = Math.ceil(totalHits /EL_PER_PAGE);
        console.log(lastPage);
        console.log(page_number)
         if (page_number===lastPage) {
             loadMoreBtn.style.display = "none";
              Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {
                 timeout: 4000,
             position:"center-bottom"});
         }
         page_number += 1;
         console.log(page_number)
         createGallery(response);
         
     })
    document.querySelector(".load-more").classList.remove('is-hidden');
   
}



