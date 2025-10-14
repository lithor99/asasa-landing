<script setup lang="ts">
defineProps({
    route: {
        type: String,
        default: "",
    },
    btn: {
        type: Boolean,
        default: true,
    },
});
</script>
<template>
    <button
        type="button"
        :class="`${
            !btn
                ? 'outlined rounded p-2 px-4 flex justify-between items-center'
                : 'btn flex justify-center items-center'
        }`"
        @click="navigateTo(route)"
    >
        <Icon name="bx:edit" size="24" mode="svg" />
        <span v-if="!btn" class="ml-2">{{ _tl("edit") }}</span>
    </button>
</template>
<style scoped>
.btn {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    color: #f39c12;
}

.btn:hover {
    background-color: #f39c1211;
}

.btn:active {
    background-color: #f39c1255;
    opacity: 0.5;
}

.outlined {
    background-color: #f39c1211;
    color: #f39c12;
    border: #f39c12 solid 1px;
}

.outlined:hover {
    background-color: #f39c1233;
}

.outlined:active {
    background-color: #f39c1255;
    opacity: 0.5;
}
</style>
