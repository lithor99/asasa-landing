<script setup lang="ts">
const props = defineProps({
    route: {
        type: String,
        default: "",
    },
    btn: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits(["onClick"]);
function onConfirm() {
    emit("onClick");
}
</script>
<template>
    <button
        type="button"
        :class="
            !btn
                ? 'outlined rounded p-2 flex justify-between items-center'
                : 'btn flex justify-center items-center'
        "
        @click="
            () => {
                if (props.route) navigateTo(route);
                onConfirm();
            }
        "
    >
        <Icon name="carbon:view-filled" size="25" mode="svg" />
        <span v-if="!btn" class="ml-2">{{ _tl("view") }}</span>
    </button>
</template>

<style scoped>
.btn {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    color: #057cae;
}

.btn:hover {
    background-color: #057cae11;
}

.btn:active {
    background-color: #057cae55;
    opacity: 0.5;
}

.outlined {
    background-color: #057cae11;
    color: #057cae;
    border: #057cae solid 1px;
}

.outlined:hover {
    background-color: #057cae33;
}

.outlined:active {
    background-color: #057cae55;
    opacity: 0.5;
}
</style>
