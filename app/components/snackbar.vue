<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Icon } from "@iconify/vue";

const mainStore = useMainStore();
watchEffect(() => {
    if (mainStore.isShowSnackbar.isOpen) {
        const time = setTimeout(() => {
            mainStore.setShowSnackbar({
                isOpen: false,
                message: "",
                isSuccess: false,
                timeout: 2000,
            });
            clearTimeout(time);
        }, 3000);
    }
});
</script>

<template>
    <div
        v-if="mainStore.isShowSnackbar?.isOpen"
        :class="`border-[1px] border-opacity-80 fixed top-14 ml-4 right-4 z-50 ${
            mainStore.isShowSnackbar.isSuccess
                ? 'border-success text-white bg-success'
                : 'border-danger text-white bg-danger'
        }  rounded-md flex gap-2 justify-between align-center py-2`"
    >
        <div :class="`font-bold px-2 flex justify-start items-center w-full `">
            <Icon
                :icon="
                    mainStore.isShowSnackbar.isSuccess
                        ? 'ic:baseline-check-circle-outline'
                        : 'ic:baseline-error-outline'
                "
                :class="`w-7 h-7 font-bold mr-2`"
                mode="svg"
            />{{ mainStore.isShowSnackbar.message || _tl("something_wrong") }}
            <Icon
                v-if="!mainStore.isShowSnackbar.isSuccess"
                icon="heroicons-solid:x"
                :class="`ml-2 w-5 h-5 text-white hover:bg-danger hover:bg-opacity-70 hover:text-secondary rounded`"
                mode="svg"
                @click="
                    () => {
                        mainStore.showSnackbar.isOpen = false;
                    }
                "
            />
        </div>
    </div>
</template>
