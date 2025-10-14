<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: "",
    },
    titleClass: {
        type: String,
        default: "bg-primary text-white",
    },

    content: {
        type: String,
        default: "",
    },
    cancelText: {
        type: String,
        default: "",
    },
    confirmText: {
        type: String,
        default: "",
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["confirm", "update:open"]);
const mainStore = useMainStore();
</script>

<template>
    <div
        v-if="open"
        class="fixed w-screen h-screen inset-0 z-50 bg-black bg-opacity-50 transition-opacity"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 text-center"
            >
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg ease-out duration-300"
                >
                    <div
                        class="w-full flex align-center p-1 gap-2"
                        :class="titleClass"
                    >
                        <div
                            class="flex items-center justify-center rounded-full w-10 h-10"
                        >
                            <Icon
                                name="bitcoin-icons:alert-circle-filled"
                                :class="`w-7 h-7 font-bold`"
                                mode="svg"
                            />
                        </div>
                        <span class="text-xl">
                            {{ title || _tl("warning") }}</span
                        >
                    </div>
                    <div
                        class="bg-white bg-opacity-20 text-main px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-xl"
                    >
                        {{ content || _tl("delete_confirm_massage") }}?
                    </div>
                    <div
                        class="bg-white bg-opacity-20 px-4 py-3 flex justify-end sm:px-6 gap-2"
                    >
                        <button
                            type="button"
                            class="inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2"
                            @click="emit('update:open', false)"
                        >
                            {{
                                mainStore.isDialog.cancelText ||
                                _tl("cancel_text")
                            }}
                        </button>
                        <button
                            type="button"
                            class="inline-flex w-full justify-center rounded-md bg-primary/20 px-5 py-2 text-secondary"
                            @click="emit('confirm')"
                        >
                            {{
                                mainStore.isDialog.confirmText ||
                                _tl("confirm_text")
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
