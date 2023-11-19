<template>
  <div class="flex justify-center row q-pa-sm relative"
    :class="{ 'full-height': listMovie.length >= 5, 'window-height': listMovie.length < 5 }">
    <q-list bordered class="col-sm-8 col-md-7 col-xs-12 relative-position">
      <q-item class="rounded-borders text-center col-12">
        <q-item-section>
          <span class="text-weight-bold text-h4 ">Movie Collection</span>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item class="q-py-md">
        <q-item-section>
          <q-input outlined placeholder="Search Movie" v-model="search" />
        </q-item-section>
      </q-item>
      <q-item v-if="listMovie.length === 0" class="rounded-borders text-center col-12">
        <q-item-section>
          <span class="text-h5">There is no data</span>
          <span class="text-h5">U can add movie on + button</span>
        </q-item-section>
      </q-item>
      <q-item v-for="({ title, director, genres, id }) in filterData" :key="id">
        <q-item-section class="row">
          <q-card class="rounded-borders q-pa-sm" @click="goTodetail(id)">
            <span class="row text-h5">{{ title }} </span>
            <span class="row">{{ director }} </span>
            <div class="flex justify-end">
              <q-chip v-for="(item, key) in genres" :key="key" text-color="black">
                {{ item }}
              </q-chip>
            </div>
          </q-card>
        </q-item-section>
      </q-item>
      <q-item class="offset-6">
        <q-item-section>
          <div class="flex justify-end">
            <q-btn round color="white" text-color="black" id="button-add" label="+" @click="goTodetail()" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useMoviesStore } from "../stores/movies"
const useMovies = useMoviesStore()
export default {
  name: 'IndexPage',
  data() {
    return {
      listMovie: [],
      search: ''
    }
  },
  computed: {
    filterData() {
      const searchTerm = this.search.toLowerCase();
      const listMovie = [...this.listMovie]
      const checkMovie = this.search.length > 0 ? listMovie.filter(({ title }) => title.toLowerCase().includes(searchTerm)) : listMovie
      return checkMovie
    }
  },
  mounted() {
    this.listMovie = useMovies.movies
  },
  methods: {
    goTodetail(id) {
      if (id !== undefined) {
        this.$router.push(`/detail/${id}`)
      } else {
        this.$router.push(`/detail/`)
      }

    }
  }
}
</script>

