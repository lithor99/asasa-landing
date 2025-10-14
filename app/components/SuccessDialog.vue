<template>
    <transition name="fade">
        <div v-if="open" class="flex justify-center">
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                class="block rounded-xl bg-transparent text-center text-sm font-medium text-transparent"
                type="button"
            ></button>
            <div
                style="
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    z-index: 40;
                "
                class="bg-black opacity-10"
            ></div>
            <div
                style="
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    z-index: 40;
                "
                class="bg-success opacity-20"
            ></div>
            <div
                class="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full items-center justify-center overflow-y-auto overflow-x-hidden p-0 md:inset-0"
                aria-modal="true"
                role="dialog"
            >
                <div
                    class="relative max-h-full w-full md:max-w-[380px] max-w-[350px]"
                >
                    <div class="relative rounded-xl bg-white shadow">
                        <div class="p-4 text-center">
                            <div class="flex justify-center items-center mt-2">
                                <Icon
                                    size="70"
                                    name="icon-park-solid:check-one"
                                    class="text-success"
                                    mode="svg"
                                />
                            </div>
                            <div
                                class="mb-2 mt-5 text-success font-bold md:text-xl text-lg"
                            >
                                {{ title || _tl("success") }}
                            </div>
                            <dvi v-if="subTitle" class="mb-2 text-base">
                                {{ subTitle || _tl("are_you_sure") }}
                            </dvi>
                            <div class="flex justify-end mt-6">
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    class="items-center text-green-500 bg-green-50 rounded-xl px-5 py-2.5 text-center text-sm font-medium"
                                    @click="onClose"
                                >
                                    {{ _tl("close") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup lang="ts">
defineProps({
    open: { type: Boolean, default: false },
    title: { type: String, default: "" },
    subTitle: { type: String, default: "" },
});
const emit = defineEmits(["onClose"]);

function onClose() {
    emit("onClose", false);
}
</script>
