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
        default: "bg-primary",
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
    kycStatus: {
        type: Boolean,
        default: false,
    },
    isMember: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["confirm", "update:open"]);
</script>

<template>
    <div
        v-if="open"
        class="fixed w-screen h-screen inset-0 z-50 bg-black bg-opacity-45 transition-opacity"
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
                    <button
                        class="absolute top-2 right-2"
                        @click="emit('update:open', false)"
                    >
                        <Icon
                            size="25"
                            name="fontisto:close"
                            class="text-slate-500 hover:text-danger"
                            mode="svg"
                        />
                    </button>
                    <div
                        class="flex justify-center items-center mt-8 space-x-4"
                        :class="{
                            'flex-row-reverse': isMember,
                        }"
                    >
                        <Icon
                            size="55"
                            name="lsicon:user-portrayal-outline"
                            :class="
                                kycStatus ? 'text-primary' : 'text-orange-400'
                            "
                            mode="svg"
                        />
                        <Icon
                            size="55"
                            name="lets-icons:arrow-right-long-light"
                            :class="
                                kycStatus ? 'text-slate-400' : 'text-orange-400'
                            "
                            mode="svg"
                        />
                        <Icon
                            size="55"
                            name="clarity:employee-line"
                            :class="
                                kycStatus ? 'text-primary' : 'text-orange-400'
                            "
                            mode="svg"
                        />
                    </div>
                    <br />
                    <div
                        class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-base text-center"
                        :class="kycStatus ? 'text-main' : 'text-orange-500'"
                    >
                        {{ content }}
                    </div>
                    <div class="flex justify-end px-4 py-3 sm:px-6 gap-2">
                        <button
                            v-if="kycStatus"
                            class="flex items-center px-2 py-1 text-primary rounded-md bg-blue-100"
                            @click="emit('confirm')"
                        >
                            <Icon
                                size="25"
                                name="flowbite:arrow-right-outline"
                                class="mr-2"
                                mode="svg"
                            /><span class="font-bold">{{
                                _tl("switch_now")
                            }}</span>
                        </button>
                        <button
                            v-else
                            class="flex items-center px-2 py-1 text-orange-500 rounded-md bg-orange-100"
                            @click="emit('confirm')"
                        >
                            <Icon
                                size="25"
                                name="flowbite:arrow-right-outline"
                                class="mr-2"
                                mode="svg"
                            /><span class="font-bold">KYC</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
