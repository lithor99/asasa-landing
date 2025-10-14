<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <span v-if="digits">
        {{
            Number(formattedValue || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        }}
    </span>
    <span v-else>
        {{ Number(formattedValue || 0).toLocaleString() }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: Number,
        required: true,
    },
    digits: {
        type: Boolean,
        default: false,
    },
});
const duration = ref(2000);
const displayValue = ref(0);

const formattedValue = computed(() => {
    const formatted = displayValue.value;
    return formatted;
});

const animateValue = () => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration.value, 1);

        displayValue.value = progress * props.value;

        if (progress < 1) {
            window?.requestAnimationFrame(step);
        } else {
            displayValue.value = props.value;
        }
    };
    window?.requestAnimationFrame(step);
};
watch(
    () => props.value,
    () => {
        if (window) {
            displayValue.value = 0; // Reset to 0 before starting the animation
            animateValue();
        }
    },
    { immediate: true },
);
onMounted(() => {
    animateValue();
});
</script>

<style scoped></style>
