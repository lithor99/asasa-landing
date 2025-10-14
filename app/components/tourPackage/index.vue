<script setup lang="ts">
import type { TourPackageModel } from "~/models/tourPackage";

interface Props {
    tours: TourPackageModel[];
}

const props = defineProps<Props>();
</script>

<template>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <!-- Tour Card -->
        <div
            v-for="tour in tours"
            :key="tour.id"
            @click="viewTour(tour)"
            class="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            :aria-label="`Open details for ${tour.name}`"
            role="button"
            tabindex="0"
        >
            <!-- Tour Image -->
            <div class="relative h-96 overflow-hidden">
                <img
                    :src="`${CDN()}${tour?.image}`"
                    :alt="tour?.name?.la"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <!-- <div
                    class="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full text-md font-semibold text-white"
                >
                    {{ formatCurrency(tour?.price) }}
                </div> -->
            </div>

            <!-- Tour Content -->
            <div class="p-6">
                <div
                    class="flex items-center justify-between gap-2 mb-2 text-xs text-gray-500"
                >
                    <span class="flex items-center gap-1 font-semibold">
                        <Icon
                            name="hugeicons:date-time"
                            class="text-orange-400 w-4 h-4"
                        />
                        {{ tour?.travelDays }}
                    </span>
                    <span
                        class="flex items-center border border-1 h-8 text-xl rounded font-semibold rounded-full px-2 py-1 h-6 border-gray-300"
                    >
                        <Icon
                            name="mingcute:user-3-line"
                            class="text-blue-500 w-4 h-4"
                        />

                        <span class="ml-2">{{
                            formatCurrency(tour?.pricePerPerson)
                        }}</span>
                    </span>
                    <!-- <span
                        class="flex items-center border border-1 h-6 rounded font-semibold rounded-full px-2 py-1 h-6 border-gray-300"
                    >
                        <Icon
                            v-if="tour?.tourCategory === E_TOUR_CATEGORY.GROUP"
                            name="mingcute:group-3-line"
                            class="text-green-500 w-5 h-5"
                        />
                        <Icon
                            v-if="tour?.tourCategory === E_TOUR_CATEGORY.SINGLE"
                            name="mingcute:user-3-line"
                            class="text-blue-500 w-4 h-4"
                        />

                        <span class="ml-2">{{
                            C_TOUR_CATEGORY.find(
                                (item: any) =>
                                    item.value === tour?.tourCategory,
                            )?.en
                        }}</span>
                    </span> -->
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    {{ tour?.name?.lo }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ tour?.detail?.lo }}
                </p>

                <!-- Action Buttons -->
                <div class="flex justify-end">
                    <button
                        @click.stop="bookTour(tour)"
                        class="w-auto bg-gray-700 text-white rounded-3xl px-4 py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                        Book Now
                    </button>
                </div>
            </div>

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
            ></div>
        </div>
    </div>
    <!-- <div class="flex justify-center">
        <Pagination
            class="my-8"
            v-model:currentPage="tours.currentPage"
            :totalPages="tours.count"
            @pageChange="onPageChange"
        />
    </div> -->
</template>

<script lang="ts">
const viewTour = (tour: TourPackageModel) => {
    console.log("View tour:", tour);
    alert(`Booking tour... ${tour?.name?.lo}`);
    navigateTo(`/tour/domestic/${tour.id}`);
};

const bookTour = (tour: TourPackageModel) => {
    console.log("Book tour clicked!");
    alert(`Booking tour... ${tour?.name?.lo}`);
};
</script>
