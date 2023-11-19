import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [
      {
        name: "Power Ranger",
        director: "Dean Israelite",
        summary: "Film Power Ranger",
        genre: ["Action", "Scifi"]
      },
    ]
  }),
  actions: {
    removeMovie(id){
      const filterMovies = [...this.movies].filter((item) => item.id !== id)
      return this.movies = filterMovies
    },
    addMovie(item){
      const addingMovie = [...this.movies, item]
      return this.movies = addingMovie
    }
  }
})
