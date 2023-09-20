export{createGallery}

function createGallery(response) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.insertAdjacentHTML("beforeend", cardMarkup(response));
}
function cardMarkup(response) {
  return response.map(data => `<div class="photo-card">
  <a class= 'simple_link' href='${data.webformatURL}'>
  <img src='${data.webformatURL}' alt="${data.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:${data.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${data.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${data.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${data.downloads}</b>
    </p>
  </div>
</div>` ).join("")
}