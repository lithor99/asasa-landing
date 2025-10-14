<script setup lang="ts">
import imageCompression from "browser-image-compression";

/**
 *  Import
 */
import { Cropper, type CropperResult } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
/**
 *  Props
 */
defineProps({
    stencilProps: {
        type: Object,
        default: () => ({
            aspectRatio: 1 / 1,
        }),
    },
    existingImage: {
        type: String,
        default: "",
    },
});
const emit = defineEmits(["cropped"]);

/**
 *  reference
 */
const isCropper = ref<boolean>(false);
const fileRef = ref<HTMLInputElement | null>(null);
const cropperRef = ref<InstanceType<typeof Cropper>>();
const imageSource = ref("");

/**
 *  Watch
 */

/**
 *  methods
 */
const handleFileSelect = async (event: Event) => {
    const { files } = event.target as HTMLInputElement;
    if (files && files[0]) {
        let file = files[0];
        if (file.size > 300 * 1024) {
            const options = {
                maxSizeMB: 0.3,
                maxWidthOrHeight: undefined,
                useWebWorker: true,
            };
            try {
                file = await imageCompression(file, options);
                if (file.size > 300 * 1024) {
                    file = await imageCompression(file, options);
                }
            } catch (err) {
                console.log(err);
            }
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                imageSource.value = e.target.result as string;
                isCropper.value = true;
            }
        };
        reader.readAsDataURL(file);
    }
    const frmBrowse: any = document?.getElementById("frmBrowse");
    frmBrowse?.reset();
};
const cropImage = () => {
    if (!cropperRef.value) return;

    const result = cropperRef.value.getResult() as CropperResult;
    if (!result?.canvas) return;

    result.canvas.toBlob((blob) => {
        if (!blob) return;

        const file = new File([blob], "cropped-image.png", {
            type: "image/png",
        });
        const url = URL.createObjectURL(blob);

        emit("cropped", {
            file,
            url,
        });

        isCropper.value = false;
    }, "image/png");
};
const openFileDialog = () => {
    if (!fileRef.value) {
        console.log("File input element not found");
        return;
    }
    fileRef.value.click();
};
defineExpose({
    openFileDialog,
});
</script>

<template>
    <div>
        <form id="frmBrowse">
            <input
                ref="fileRef"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                style="display: none"
                @change="handleFileSelect"
            />
        </form>
        <div v-if="isCropper" class="fixed inset-0 z-50 w-full h-full">
            <div class="relative w-full h-full">
                <div class="h-full w-full bg-light">
                    <cropper
                        ref="cropperRef"
                        class="cropper bg-light"
                        :src="imageSource"
                        :stencil-props="stencilProps"
                    />
                </div>
                <div
                    class="absolute bottom-0 left-0 right-0 flex justify-end items-center p-4"
                >
                    <button
                        type="button"
                        class="bg-danger text-white p-2 px-4 rounded"
                        @click="isCropper = false"
                    >
                        {{ _tl("cancel") }}
                    </button>
                    <button
                        type="button"
                        class="bg-primary text-white p-2 px-4 rounded ml-2"
                        @click="cropImage()"
                    >
                        {{ _tl("crop") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cropper,
.vue-advanced-cropper__foreground {
    background: #2d3748 !important;
}
</style>
