
const routes = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue')
  },
  {
    path: '/detail/:id?',
    component: () => import('pages/AddOrEditMovie.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
