import api from './api';

interface ReviewData {
  movie_id: number;
  rating: number;
  content: string;
}

export const reviewService = {
  async getMovieReviews(movieId: number) {
    const response = await api.get(`/movies/${movieId}/reviews`);
    return response.data;
  },

  async createReview(reviewData: ReviewData) {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  async updateReview(id: number, reviewData: Partial<ReviewData>) {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  },

  async deleteReview(id: number) {
    await api.delete(`/reviews/${id}`);
  },

  async getMyReviews() {
    const response = await api.get('/my-reviews');
    return response.data;
  }
};
