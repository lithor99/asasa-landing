<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const modules = [Navigation, Pagination, Autoplay];

const mainStore = useMainStore();

const currentIndex = ref<number>(0);

const props = defineProps({
    imageList: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    maxHeight: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["onClick"]);

function onClick() {
    emit("onClick");
}

function onViewImage(val: any, index: number) {
    // Handle image view event
    mainStore.setImageList(val, index);
}

function onSlideChange(swiper: any) {
    currentIndex.value = swiper.realIndex;
    // console.log("slide change===", swiper.activeIndex);
    // if (!swiper.activeIndex) return;
    // mainStore.setImageListIndex(swiper.activeIndex);
}
</script>

<template>
    <div>
        <Swiper
            :height="200"
            :modules="modules"
            :pagination="true"
            :slides-per-view="1"
            :loop="true"
            :effect="'creative'"
            :autoplay="{
                delay: 5000,
                disableOnInteraction: true,
            }"
            :creative-effect="{
                prev: {
                    shadow: false,
                    translate: ['-20%', 0, -1],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            }"
            class="flex justify-center items-center w-full"
            @slide-change="onSlideChange"
        >
            <SwiperSlide
                v-for="(slide, idx) in imageList"
                :key="idx"
                style="background-color: white; position: relative"
                :class="currentIndex == idx ? '' : 'hidden'"
            >
                <img
                    :src="`${imageList[idx]}`"
                    class="max-h-full w-full object-contain"
                    :class="`${maxHeight ? maxHeight : ''} ${
                        currentIndex == idx ? '' : 'hidden'
                    }`"
                    @click="onViewImage(imageList, idx)"
                />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style>
.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100%;
    font-size: 4rem;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
}
</style>
