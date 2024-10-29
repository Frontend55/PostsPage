<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { debounce } from 'vue-debounce';

const searchValue = ref('');
const searchAll = ref(false);

const { isShowFilterAllPosts } = withDefaults(
    defineProps<{
        isShowFilterAllPosts: boolean;
    }>(),
    {
        isShowFilterAllPosts: true,
    },
);

const emit = defineEmits<{
    (e: 'filterPosts', value: string): void;
    (e: 'filterAll', value: boolean): void;
}>();

const inputChange = debounce(() => {
    emit('filterPosts', searchValue.value);
}, '400ms');

const changeToggle = () => {
    emit('filterAll', searchAll.value);
};
</script>

<template>
    <div class="search">
        <label v-if="isShowFilterAllPosts" class="search__checkbox">
            <input type="checkbox" v-model="searchAll" @change="changeToggle" />
            <span>Искать по всем страницам</span>
        </label>
        <div class="search__wrapper-input">
            <input
                type="text"
                class="search__input"
                placeholder="Искать на этой странице"
                v-model="searchValue"
                @input="inputChange"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.search {
    margin-bottom: 20px;
    display: flex;
    flex-flow: row wrap;
    flex: 100%;

    &__input {
        height: 15px;
        padding: 10px;
        width: 100%;
    }

    &__checkbox {
        margin-bottom: 10px;
    }

    &__wrapper-input {
        display: flex;
        flex: 100%;
    }
}
</style>
