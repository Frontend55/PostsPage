<script setup lang="ts">
import type { PostTypes } from '../types/post.types';

const { post } = defineProps<{ post: PostTypes }>();
</script>

<template>
    <RouterLink
        :to="{
            name: 'post',
            params: { id: post.id },
        }"
        class="post"
    >
        <div>{{ post.id }}</div>
        <div class="post__title">
            {{ post.title }}
        </div>
        <div class="post__body">
            {{ post.body }}
        </div>
    </RouterLink>
</template>

<style scoped lang="scss">
.post {
    border: 1px solid #eee;
    padding: 10px;
    max-width: 320px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    margin: 0 10px 10px;
    min-height: 190px;
    color: #eee;

    &:hover {
        outline: 4px auto #9370db;
    }

    &__title {
        font-size: 16px;
        margin-bottom: 10px;
        text-align: center;
        font-weight: 700;
    }

    &__body {
        font-size: 13px;
        text-align: left;
    }
}
</style>
