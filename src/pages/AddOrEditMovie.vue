<template>
  <div class="flex justify-center row q-pa-sm relative window-height">
    <q-list bordered class="my-card col-sm-8 col-md-7 col-xs-12 relative-position">
      <q-item class="rounded-borders text-center col-12">
        <q-item-section>
          <div class="flex row justify-end">
            <q-btn v-if="$route.params.id" color="red" text-color="white" class="q-mr-xs q-pa-sm"
              @click="removeMovie($route.params.id)" label="Delete" />
            <q-btn :color="isAddButtonDisabled ? 'grey' : 'white'" :text-color="isAddButtonDisabled ? 'white' : 'black'"
              :label="$route.params.id ? 'Save' : 'Add'" @click="$route.params.id ? editMovie() : addMovie()"
              :disable="isAddButtonDisabled" />
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item class="q-py-md">
        <q-item-section>
          <q-input outlined v-model="title" label="Title" />
        </q-item-section>
      </q-item>
      <q-item class="q-py-md">
        <q-item-section>
          <q-input outlined label="Director" v-model="director" />
        </q-item-section>
      </q-item>
      <q-item class="q-py-md">
        <q-item-section>
          <q-input outlined label="summary" v-model="summary" type="textarea" />
        </q-item-section>
      </q-item>
      <q-item class="q-py-md">
        <q-item-section class="container-chip">
          <q-chip v-for="(genre, index) in genres" :key="index" :selected="selectedGenre.some(item => item === genre)"
            color="primary" text-color="white" @click="handleSelectedGenre(genre)">
            {{ genre }}
          </q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useMoviesStore } from "../stores/movies"

export default {
  name: 'IndexPage',
  data() {
    return {
      selectedGenre: [],
      genres: ["Drama", "Action", "Animation", "Sci-Fi", "Horror"],
      title: "",
      director: "",
      summary: ""
    }
  },
  mounted() {
    const isEditing = this.$route.params.id === 0 || Boolean(this.$route.params.id)
    if (isEditing) {
      const { genres, title, director, summary } = useMoviesStore().movies.find(({ id }) => id === Number(this.$route.params.id))
      this.selectedGenre = [...genres]
      this.title = title
      this.director = director
      this.summary = summary
    }
  },
  computed: {
    isAddButtonDisabled() {
      const isDisabled = this.title === "" || this.director === "" || this.summary === "" || this.selectedGenre.length === 0
      return isDisabled
    },
  },
  methods: {
    addMovie() {
      const useMovie = useMoviesStore()
      useMovie.addMovie({
        title: this.title,
        director: this.director,
        summary: this.summary,
        genres: this.selectedGenre,
        id: useMovie.generateUniqueId(),
      })
      this.$router.push('/')
    },
    editMovie() {
      const { id } = useMoviesStore().movies.find(({ id }) => id === Number(this.$route.params.id))
      const value = {
        title: this.title,
        director: this.director,
        summary: this.summary,
        genres: this.selectedGenre,
        id
      }
      useMoviesStore().editMovie(value)
      this.$router.push('/')
    },
    removeMovie(id) {
      const useMovie = useMoviesStore()
      useMovie.removeMovie(id)
      this.$router.push('/')
    },
    handleSelectedGenre(genre) {
      const isAlreadySelected = this.selectedGenre.includes(genre);
      if (isAlreadySelected) {
        this.selectedGenre = this.selectedGenre.filter(item => item !== genre);
      } else {
        this.selectedGenre = [...this.selectedGenre, genre];
      }
    }
  }
}
</script>

