import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderGallery } from './render-gallery';
import Photo from './IMG_API';
import { refs } from './refs';

export const messageParams = {
  clickToClose: true,
  timeout: '5000',
};

export const photoGallery = new Photo();

const onSubmit = async e => {
  e.preventDefault();

  try {
    photoGallery.query = e.currentTarget.elements.searchQuery.value;
    photoGallery.page = 1;

    const gallery = await photoGallery.getPhoto();

    if (!gallery.hits.length) {
      refs.imgList.innerHTML = '';
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    photoGallery.totalHits = gallery.totalHits;

    refs.imgList.innerHTML = '';
    renderGallery(gallery.hits);
    Notify.success(`Hooray! We found ${gallery.totalHits} images.`);

    e.target.lastElementChild.setAttribute('disabled', '');
    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    Notify.failure(error.message, messageParams);
  }
};

const onInput = e => {
  const query = e.currentTarget.elements.searchQuery.value;

  if (photoGallery.query === '' || photoGallery.query === query) {
    e.currentTarget.lastElementChild.setAttribute('disabled', '');
    refs.loadMoreBtn.classList.remove('is-hidden');

    return;
  }

  refs.loadMoreBtn.classList.add('is-hidden');
  e.currentTarget.lastElementChild.removeAttribute('disabled', '');
};

refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);
