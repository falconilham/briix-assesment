import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: []
  }),
  actions: {
    removeMovie(id){
      const updatedMovies = this.movies.slice();
      const index = updatedMovies.findIndex(movie => movie.id === id);
      updatedMovies.splice(index, 1);
      this.movies = updatedMovies;
    },
    addMovie(item){
      const addingMovie = [...this.movies, item]
      return this.movies = addingMovie
    },
    editMovie(item){
      const updatedMovies = this.movies.slice();
      const index = updatedMovies.findIndex(movie => movie.id === item.id);
      updatedMovies.splice(index, 1);
      const result = [...updatedMovies, item]
      this.movies = result;
    },
    generateUniqueId() {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000000);
      const uniqueId = `${timestamp}${random}`;
      return Math.ceil(uniqueId);
    }
  }
})
