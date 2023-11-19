<template>
  <div class="flex justify-center row q-pa-sm relative"
    :class="{ 'full-height': listMovie.length >= 5, 'window-height': listMovie.length < 5 }">
    <q-list bordered class="my-card col-sm-8 col-md-7 col-xs-12 relative-position">
      <q-item class="rounded-borders text-center col-12">
        <q-item-section>
          <span class="text-weight-bold text-h4 ">Movie Collection</span>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item class="q-py-md">
        <q-item-section>
          <q-input outlined v-model="text" placeholder="Search Movie" />
        </q-item-section>
      </q-item>
      <q-item v-for="({ name, director, genre }, index) in listMovie" :key="index">
        <q-item-section class="row">
          <q-card class="rounded-borders q-pa-sm">
            <span class="row text-h5">{{ name }} </span>
            <span class="row">{{ director }} </span>
            <div class="flex justify-end">
              <q-chip v-for="(item, key) in genre" :key="key" text-color="black">
                {{ item }}
              </q-chip>
            </div>
          </q-card>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <div class="flex justify-end">
            <q-btn round color="white" text-color="black" id="button-add" label="+" />
          </div>
        </q-item-section>
      </q-item>
      <!-- <div id="button-add" class="">
        +
      </div> -->
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
      listMovie: useMovies.movies
    }
  },
}
</script>

