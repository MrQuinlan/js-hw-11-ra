import axios from 'axios';

export default class Photo {
  constructor(query) {
    this.API_KEY = '25737469-5e8bfc7bf6c680f39c339b92a';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.query = query;
    this.page = 1;
    this.per_page = 40;
    this.totalHits = 0;
  }

  get _query() {
    return this.query;
  }

  set _query(newQuery) {
    this.query = newQuery;
  }

  get _page() {
    return this.page;
  }

  set _page(newPage) {
    this.page = newPage;
  }

  get _totalHits() {
    return this.totalHits;
  }

  set _totalHits(newTotalHits) {
    this.totalHits = newTotalHits;
  }

  async getPhoto() {
    const photoGallery = await axios.get(
      `${this.BASE_URL}?key=${this.API_KEY}&q=${this.query}&page=${this.page}&per_page=${this.per_page}&image_type=photo&orientation=horizontal&safesearch=true`
    );

    return photoGallery.data;
  }
}
