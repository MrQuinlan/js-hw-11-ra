import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { messageParams } from './img-search';
import refs from './refs';
import { photoGallery } from './img-search';
import renderGallery from './render-gallery';

const onLoadMoreClick = async () => {
  photoGallery.totalHits -= photoGallery.per_page;
  photoGallery.page += 1;

  const gallery = await photoGallery.getPhoto();

  if (photoGallery.totalHits < photoGallery.per_page) {
    photoGallery.per_page = photoGallery.totalHits;

    refs.loadMoreBtn.classList.add('is-hidden');

    Notify.warning(
      "We're sorry, but you've reached the end of search results.",
      messageParams
    );
  }

  renderGallery(gallery.hits);
};

refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
