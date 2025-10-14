<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["onClose"]);

function onClose() {
    emit("onClose", false);
}
</script>

<template>
    <transition name="fade">
        <div v-if="open" class="flex justify-center">
            <div
                v-click-outside="
                    () => {
                        onClose();
                    }
                "
                class="fixed left-0 right-0 top-0 z-50 bg-black bg-opacity-50 flex h-[calc(100%-1rem)] w-full h-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
                aria-modal="true"
                role="dialog"
            >
                <div class="relative max-h-full w-full max-w-md">
                    <div class="relative rounded-xl bg-white inset-shadow-card">
                        <div class="p-6 text-center">
                            <!-- <div class="flex justify-center">
                                    <Icon
                                        size="40"
                                        class="text-red-500"
                                        name="hugeicons:logout-01"
                                        mode="svg"
                                    />
                                </div> -->
                            <h3 class="mb-4 mt-2 md:text-xl text-lg">
                                {{ _tl("please_login_first") }}...!
                            </h3>
                            <div class="flex justify-end text-white">
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    class="flex mr-3 items-center rounded-lg px-3 py-1 text-center text-sm font-medium text-red-500"
                                    @click="onClose()"
                                >
                                    <Icon
                                        size="20"
                                        class="text-red-500"
                                        name="iconoir:cancel"
                                        mode="svg"
                                    />
                                    {{ _tl("cancel") }}
                                </button>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    class="flex items-center rounded-lg px-3 py-1 text-center text-sm font-medium text-orange-600 border border-orange-500"
                                    @click="
                                        () => {
                                            onClose();
                                            navigateTo('/login');
                                        }
                                    "
                                >
                                    <Icon
                                        size="20"
                                        class="text-orange-500"
                                        name="mdi:arrow-right-thin"
                                        mode="svg"
                                    />
                                    {{ _tl("go_login") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
