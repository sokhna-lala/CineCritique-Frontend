import api from './api';

export const movieService = {
  async searchMovies(query: string) {
    const response = await api.get('/movies/search', { params: { query } });
    return response.data;
  },

  async getPopularMovies() {
    const response = await api.get('/movies/popular');
    return response.data;
  },

  async getTopRatedMovies() {
    const response = await api.get('/movies/top-rated');
    return response.data;
  },

  async getMovieDetails(id: number) {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  async discoverMovies(filters?: { genre?: number; year?: number }) {
    const response = await api.get('/movies/discover', { params: filters });
    return response.data;
  },

  async getGenres() {
    const response = await api.get('/genres');
    return response.data;
  }
};
