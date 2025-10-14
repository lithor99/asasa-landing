<template>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="place in places"
            :key="place.id"
            @click="viewTourPlace(place)"
            class="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            :aria-label="`Open details for ${place?.name?.lo}`"
            role="button"
            tabindex="0"
        >
            <!-- Place Image -->
            <div class="h-64 overflow-hidden">
                <img
                    :src="`${CDN()}${place?.image}`"
                    :alt="place?.name?.lo"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <!-- Category Badge -->
                <div
                    class="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase z-10"
                >
                    {{ place?.region }}
                </div>
            </div>

            <!-- Place Content -->
            <div class="pt-6 pb-2 px-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    {{ place?.name?.lo }}
                </h3>

                <!-- Location -->
                <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Icon name="gis:location-poi" class="w-5 h-5" />
                    <span>{{ place?.address?.lo }}</span>
                </div>

                <p class="text-gray-600 text-sm mb-3 line-clamp-3">
                    {{ place?.detail?.lo }}
                </p>
            </div>

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TourPlaceModel } from "~/models/tourPlace";

interface Props {
    places: TourPlaceModel[];
}

const props = defineProps<Props>();

const viewTourPlace = (place: TourPlaceModel) => {
    alert(`Booking tour... ${place?.name?.lo}`);
    navigateTo(`/tour-place/${place.id}`);
};
</script>
