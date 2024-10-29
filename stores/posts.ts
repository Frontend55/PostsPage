import { defineStore } from "pinia";
import { ref } from "vue";
import { PostTypes } from "../src/types/post.types";

export const usePostStore = defineStore('posts', () => {
  const posts = ref<PostTypes[]>([]);
  const filteredPosts = ref<PostTypes[]>([])

  const setPosts = (list: PostTypes[]): void => {
    posts.value = list;
  }

  const setFilteredPosts = (list: PostTypes[]): void => {
    filteredPosts.value = list;
  }

  return { posts, filteredPosts, setPosts, setFilteredPosts };
})