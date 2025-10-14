<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps({
    items: {
        type: Array as () => {
            title: string;
            to?: string;
            disabled: boolean;
        }[],
        default: () => [],
    },
});
</script>
<template>
    <div
        class="bg-secondary p-2 border-l-2 border-secondary md:flex justify-between items-center"
    >
        <div class="text-lg font-medium flex items-center space-x-2">
            <template v-for="(item, index) in items" :key="index">
                <nuxt-link
                    v-if="item.to && !item.disabled"
                    :to="item.disabled ? '' : item.to"
                    :disabled="item.disabled"
                    :class="`${
                        item.disabled
                            ? 'cursor-default'
                            : 'text-white font-bold hover:underline'
                    } `"
                >
                    {{ item.title }}
                </nuxt-link>
                <span v-else class="text-gray-400">{{ item.title }}</span>

                <Icon
                    v-if="index < items.length - 1"
                    name="uiw:right"
                    class="text-gray-400"
                    mode="svg"
                />
            </template>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
