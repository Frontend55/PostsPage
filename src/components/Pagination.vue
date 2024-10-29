<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import { usePostStore } from '../../stores/posts';
import { DEFAULT_COUNT_POSTS_ON_PAGES } from '../constants';
const postsStore = usePostStore();

const activeIndexButton = ref<Number>(1);

const emit = defineEmits<{
    (e: 'goToPage', number: number): void;
}>();

const pages = computed(() => {
    if (postsStore.filteredPosts.length) {
        return calculationCountPages(postsStore.filteredPosts.length);
    }

    return calculationCountPages(postsStore.posts.length);
});

const changePage = (numberPage: number) => {
    activeIndexButton.value = numberPage;
    emit('goToPage', numberPage);
};

const calculationCountPages = (countPosts: number): number => {
    const isHaveRemainder =
        Math.floor(countPosts % DEFAULT_COUNT_POSTS_ON_PAGES) > 0;
    const intager = Math.floor(countPosts / DEFAULT_COUNT_POSTS_ON_PAGES);

    return isHaveRemainder ? intager + 1 : intager;
};
</script>

<template>
    <ul class="pagination">
        <li v-for="number in pages" :key="number" class="pagination__item">
            <button
                type="button"
                class="pagination__button"
                :class="{ active: activeIndexButton === number }"
                @click="changePage(number)"
            >
                {{ number }}
            </button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.pagination {
    display: flex;
    list-style-type: none;
    justify-content: center;

    &__button {
        &:hover {
            outline: 4px auto #9370db;
        }
    }
}

.active {
    outline: 4px auto #9370db;
}
</style>
