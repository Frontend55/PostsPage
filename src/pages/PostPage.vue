<script setup lang="ts">
import { computed } from 'vue';
import { PostTypes } from '../types/post.types.js';
import { useRoute } from 'vue-router';
import { usePostStore } from '../../stores/posts.js';
const postsStore = usePostStore();

const route = useRoute();

const post = computed((): PostTypes | undefined => {
    const post = postsStore.posts.find(
        (post: PostTypes): boolean => post.id === Number(route.params.id),
    );
    return post;
});
</script>

<template>
    <div v-if="post" class="post">
        <div class="post__number-post">Пост номер: {{ post.id }}</div>
        <div class="post__title">
            {{ post.title }}
        </div>
        <div class="post__content">
            {{ post.body }}
        </div>
    </div>
    <div v-else>Что то пошло не так...</div>
</template>

<style scoped lang="scss">
.post {
    &__number-post {
        font-size: 18px;
        text-align: left;
        margin-bottom: 20px;
    }

    &__title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
        text-align: left;
    }

    &__content {
        font-size: 14px;
        text-align: left;
    }
}
</style>
