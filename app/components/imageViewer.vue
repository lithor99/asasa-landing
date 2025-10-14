<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { nextTick } from "vue";
const modules = [Navigation, Pagination, Autoplay];

const mainStore = useMainStore();
const dragging = ref<boolean>(false);
const resizing = ref<boolean>(false);
const dragStart = ref({ x: 0, y: 0 });
const positionX = ref<number>(0); // Initial position from top-left
const positionY = ref<number>(0);
const offsetX = ref<number>(0);
const offsetY = ref<number>(0);
const swiperRef = ref(null);
const currentIndex = ref<number>(0);

const startDrag = (e) => {
    dragging.value = true;
    dragStart.value = { x: e.clientX, y: e.clientY };
    offsetX.value = e.clientX - positionX.value;
    offsetY.value = e.clientY - positionY.value;
};

const onDrag = (e) => {
    if (dragging.value) {
        positionX.value = e.clientX - offsetX.value;
        positionY.value = e.clientY - offsetY.value;
    }
};

const endDrag = () => {
    dragging.value = false;
};
const onResize = () => {
    resizing.value = !resizing.value;
    dragStart.value = { x: 0, y: 0 };
    positionX.value = 0;
    positionY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
};
const onReset = () => {
    mainStore.setImageSrc();
    mainStore.setImageList();
    resizing.value = false;
    positionX.value = 0;
    positionY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
};

function onSwiper(swiperInstance: any) {
    swiperRef.value = swiperInstance;
}

watch(
    () => mainStore.getImageViewer?.isOpen,
    async (open) => {
        if (
            open &&
            mainStore.getImageViewer?.index != null &&
            mainStore.getImageViewer?.list
        ) {
            await nextTick(); // wait for DOM + Swiper mount
            currentIndex.value = mainStore.getImageViewer.index;
            goToSlide(mainStore.getImageViewer.index);
        }
    },
);

function goToSlide(index: number) {
    if (swiperRef.value) {
        nextTick(() => {
            swiperRef.value.slideToLoop(index);
        });
    }
}

function onSlideChange(swiper: any) {
    currentIndex.value = swiper.realIndex;
    // console.log("slide change===", swiper.activeIndex);
    // if (!swiper.activeIndex) return;
    // mainStore.setImageListIndex(swiper.activeIndex);
}
</script>

<template>
    <!-- Resize Container -->
    <div
        v-if="mainStore.getImageViewer?.isOpen"
        ref="viewer"
        class="fixed z-50 resize overflow-auto min-w-80 min-h-80 bg-black bg-opacity-90"
        :class="`${resizing ? 'w-9/12 h-5/6' : 'w-screen h-screen'}`"
        :style="{
            left: `${positionX}px`,
            top: `${positionY}px`,
        }"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
    >
        <!-- Resize Icon (for visual only) -->
        <!-- <div
            class="absolute z-10 right-14 top-1 w-10 h-10 hover:bg-secondary hover:bg-opacity-20 rounded-full p-1 cursor-pointer"
            @click="onResize"
        >
            <Icon v-if="!resizing" name="ri:subtract-line" size="30" mode="svg" />
            <Icon v-else name="ph:resize" size="30" mode="svg" />
        </div> -->

        <!-- Close Button -->
        <div
            class="absolute z-10 right-2 top-1 w-8 h-8 flex justify-center items-center active:bg-gray-800 hover:bg-opacity-50 text-white rounded-full p-1 cursor-pointer bg-black bg-opacity-50"
            @click="onReset"
        >
            <Icon name="ic:round-close" size="25" mode="svg" />
        </div>

        <div
            v-if="mainStore.getImageViewer?.list?.length > 0"
            class="absolute z-10 bottom-1 w-full flex justify-center items-center active:bg-gray-800 hover:bg-opacity-50 text-white rounded-full p-1 cursor-pointer bg-black bg-opacity-50"
        >
            <div>
                {{ currentIndex + 1 }}/{{
                    mainStore.getImageViewer?.list.length
                }}
            </div>
        </div>

        <!-- Image Display -->
        <div
            v-if="mainStore.getImageViewer?.list?.length > 0"
            class="w-full h-full flex items-center justify-center bg-black bg-opacity-80"
        >
            <Swiper
                :modules="modules"
                :slides-per-view="1"
                :loop="false"
                :effect="'creative'"
                :creative-effect="{
                    prev: {
                        shadow: false,
                        translate: ['-20%', 0, -1],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }"
                class="flex justify-center items-center h-full w-full bg-black bg-opacity-80"
                @swiper="onSwiper"
                @slide-change="onSlideChange"
            >
                <SwiperSlide
                    v-for="(slide, idx) in mainStore.getImageViewer?.list"
                    :key="idx"
                    style="background-color: transparent; position: relative"
                    :class="currentIndex == idx ? '' : 'hidden'"
                >
                    <img
                        :src="`${slide}`"
                        class="object-contain"
                        :class="currentIndex == idx ? '' : 'hidden'"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
        <div v-else class="w-full h-full flex items-center justify-center">
            <img
                v-if="mainStore.getImageViewer?.src"
                :src="`${mainStore.getImageViewer?.src}`"
                :alt="`${mainStore.getImageViewer?.src}`"
                class="object-contain w-full h-full"
            />
            <Icon
                v-else
                name="ri:loader-4-line"
                size="40"
                class="animate-spin text-primary"
                mode="svg"
            />
        </div>
    </div>
</template>
