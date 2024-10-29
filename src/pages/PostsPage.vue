<script setup lang="ts">
import axios from 'axios';
import { computed, onBeforeMount, ref } from 'vue';

import Pagination from '../components/Pagination.vue';
import Search from '../components/Search.vue';
import Wrapper from '../components/Wrapper.vue';
import Post from '../components/Post.vue';
import Preloader from '../components/Preloader.vue';

import { PostTypes } from '../types/post.types';

import { usePostStore } from '../../stores/posts';
import { DEFAULT_COUNT_POSTS_ON_PAGES } from '../constants';
const postsStore = usePostStore();

const firstPosts = ref(0);
const filterValue = ref('');
const filterAllPosts = ref(false);
const isShowPreloader = ref(false);

onBeforeMount(async () => {
    isShowPreloader.value = true;
    const { data } = await axios.get<PostTypes[]>(
        'https://jsonplaceholder.typicode.com/posts',
    );
    await postsStore.setPosts(data);
    isShowPreloader.value = false;
});

const posts = computed((): PostTypes[] => {
    const array = [...postsStore.posts].splice(
        firstPosts.value,
        DEFAULT_COUNT_POSTS_ON_PAGES,
    );

    if (filterValue.value.length && filterAllPosts.value) {
        return getNewListPosts();
    }

    if (filterValue.value.length) {
        return filterPosts(array);
    }

    postsStore.setFilteredPosts([]);

    return array;
});

const isShowPagination = computed((): boolean => {
    return (
        (filterValue.value.length && filterAllPosts.value) ||
        !filterValue.value.length
    );
});

const changePage = (numberPage: number): void => {
    if (numberPage > 1) {
        firstPosts.value = DEFAULT_COUNT_POSTS_ON_PAGES * (numberPage - 1);
        return;
    }

    firstPosts.value = 0;
};

const getNewListPosts = (): PostTypes[] => {
    const newListPosts = postsStore.posts.filter((item: PostTypes) => {
        return (
            item.title.toLocaleLowerCase().includes(filterValue.value) ||
            item.body.toLocaleLowerCase().includes(filterValue.value)
        );
    });

    postsStore.setFilteredPosts(newListPosts);

    return newListPosts.splice(firstPosts.value, DEFAULT_COUNT_POSTS_ON_PAGES);
};
const filterPosts = (list: PostTypes[]): PostTypes[] => {
    return list.filter((item: PostTypes) => {
        return (
            item.title.toLocaleLowerCase().includes(filterValue.value) ||
            item.body.toLocaleLowerCase().includes(filterValue.value)
        );
    });
};

const filterPostsEmit = (value: string): void => {
    filterValue.value = value;
};

const filterAllEmit = (value: boolean): void => {
    filterAllPosts.value = value;
};
</script>

<template>
    <Preloader v-if="isShowPreloader" />
    <Search
        is-show-filter-all-posts
        @filter-posts="filterPostsEmit"
        @filter-all="filterAllEmit"
    />
    <div v-if="posts.length">
        <Wrapper class="center">
            <Post v-for="post in posts" :key="post.id" :post="post" />
        </Wrapper>
        <Pagination v-if="isShowPagination" @go-to-page="changePage" />
    </div>
    <div v-else>Ничего не найдено</div>
</template>

<style scoped lang="scss">
.center {
    justify-content: center;
}
</style>
