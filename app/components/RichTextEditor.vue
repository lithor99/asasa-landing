<template>
    <div>
        <div :id="divId"></div>
    </div>
</template>

<script setup>
let editor = null;
let clientInterval = null;
const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    id: {
        type: String,
        default: "editor",
    },
    loading: {
        type: Boolean,
        default: true,
    },
    placeholder: {
        type: String,
        default: "Enter text here...",
    },
});
const emit = defineEmits(["update:modelValue"]);

const value = computed({
    get() {
        return props.modelValue;
    },
    // set(value) {
    //     emit('update:modelValue', editor.getHTMLCode())
    // },
});

const divId = computed({
    get() {
        return props.id;
    },
    // set(value) {
    //     emit('update:modelValue', editor.getHTMLCode())
    // },
});

if (import.meta.client) {
    try {
        setTimeout(() => {
            editor = new RichTextEditor(divId.value);
            if (editor) editor.setHTMLCode(value.value || "");
        }, 200);
        // sinterval = setInterval(() => {
        //     if (editor) editor.setHTMLCode(value.value || "");
        // }, 1100);
    } catch (error) {
        console.error("RichTextEditor error: ", error);
    }

    try {
        clientInterval = setInterval(() => {
            emit("update:modelValue", editor.getHTMLCode());
        }, 1000);
    } catch (error) {
        console.error("RichTextEditor error: ", error);
    }
}
watch(
    () => value.value,
    (newValue) => {
        if (editor && props.loading) editor.setHTMLCode(newValue || "");
    },
    { immediate: true },
);
onUnmounted(() => {
    // clearInterval(sinterval);
    clearInterval(clientInterval);
});
</script>
<style>
rte-content {
    background: #e0e0e0 !important;
    box-shadow: inset 0 0 2rem #bdbdbd !important;
}
rte-toolbar,
rte-bottom {
    background: #bdbdbd !important;
}
</style>
