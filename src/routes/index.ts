import { createWebHistory, createRouter } from 'vue-router'

import PostPage from '../pages/PostPage.vue';
import PostsPage from '../pages/PostsPage.vue';

const routes = [
  { path: '/:id', name: 'post', component: PostPage },
  { path: '/', component: PostsPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})