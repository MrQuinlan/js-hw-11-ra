import galleryTmpl from '../templates/gallery-template.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderGallery = gallery => {
  refs.imgList.insertAdjacentHTML('beforeEnd', galleryTmpl(gallery));
  new SimpleLightbox('.img-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};
