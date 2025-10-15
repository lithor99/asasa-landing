<template>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="place in places"
            :key="place.id"
            @click="viewPlaceDetail(place)"
            @keypress="handleKeyPress($event, place)"
            class="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            :aria-label="`Open details for ${place.name}`"
            role="button"
            tabindex="0"
        >
            <!-- Place Image -->
            <div class="h-64 overflow-hidden">
                <img
                    :src="`${CDN()}${place?.image}`"
                    :alt="place.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <!-- Category Badge -->
                <div
                    v-if="place.region"
                    :class="[`absolute top-4 left-4 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase z-10`, C_REGION.find((r: any) => r.value === place.region)?.color]"
                >
                    {{
                        C_REGION.find((r: any) => r.value === place.region)
                            ?.en || place.region
                    }}
                </div>
            </div>

            <!-- Place Content -->
            <div class="pt-6 pb-2 px-6">
                <!-- Location -->
                <div class="flex items-center justify-between">
                    <div
                        class="flex items-center gap-2 text-sm text-gray-500 mb-3"
                    >
                        <Icon name="gis:location-poi" class="w-4 h-4" />
                        <span>{{ place?.address?.lo }}</span>
                    </div>
                    <div
                        class="flex items-center gap-2 text-sm text-gray-500 mb-3"
                    >
                        <Icon name="pajamas:eye" class="w-4 h-4" />
                        <span v-if="place?.views > 1"
                            >{{ formatNumber(place?.views) }} views</span
                        >
                        <span v-else-if="place?.views <= 1"
                            >{{ formatNumber(place?.views) }} view</span
                        >
                    </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    {{ place?.name?.lo }}
                </h3>

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
    region: string | "";
}

const props = defineProps<Props>();

const viewPlaceDetail = (place: TourPlaceModel) => {
    const url = `/tour-place/${place.id}`;

    if (props.region) {
        navigateTo(`${url}?region=${props.region}`);
    } else {
        navigateTo(url);
    }
};

const handleKeyPress = (event: KeyboardEvent, place: TourPlaceModel) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        viewPlaceDetail(place);
    }
};
</script>
