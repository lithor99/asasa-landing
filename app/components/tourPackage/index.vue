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
                <span
                    class="flex items-center absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-400 px-3 py-2 rounded-xl text-md font-semibold text-white hover:!scale-110"
                    style="transform: rotate(3deg)"
                >
                    <Icon
                        name="mingcute:user-3-line"
                        class="text-white w-5 h-5 mr-2"
                    />
                    {{ formatCurrency(tour?.pricePerPerson) }}
                </span>

                <span
                    class="flex items-center absolute top-16 right-4 bg-gradient-to-r from-orange-600 to-orange-400 px-3 py-2 rounded-xl text-md font-semibold text-white hover:!scale-110"
                    style="transform: rotate(-8deg)"
                >
                    <Icon
                        name="mingcute:group-3-line"
                        class="text-white w-5 h-5 mr-2"
                    />
                    {{ formatCurrency(tour?.pricePerGroup) }}
                </span>
            </div>

            <!-- Tour Content -->
            <div class="pt-4 pb-6 px-6">
                <div
                    class="flex items-center justify-between gap-2 mb-2 text-xs text-gray-500"
                >
                    <span class="flex items-center gap-1 font-semibold">
                        <Icon
                            name="hugeicons:date-time"
                            class="w-4 h-4 text-red-500"
                        />
                        {{ tour?.travelDays }}

                        <span v-if="tour?.travelDays < 1">
                            day for sightseeing
                        </span>
                        <span v-else> days for sightseeing </span>
                    </span>
                    <span
                        class="flex items-center border border-1 rounded font-semibold rounded-full px-2 py-1 border-gray-300"
                    >
                        {{
                            C_TOUR_TYPE.find(
                                (item: any) => item.value === tour?.tourType,
                            )?.en
                        }}
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

                <h3 class="text-xl font-bold text-gray-900 mb-2 mt-2">
                    {{ tour?.name?.lo }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ tour?.detail?.lo }}
                </p>

                <!-- Action Buttons -->
                <!-- <div class="flex justify-end">
                    <button
                        @click.stop="bookTour(tour)"
                        class="w-auto bg-gray-700 text-white rounded-3xl px-4 py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                        Book Now
                    </button>
                </div> -->
            </div>

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
const showBookingDialog = ref(false);
const selectedTour = ref<TourPackageModel | null>(null);
const isBooking = ref(false);

const viewTour = (tour: TourPackageModel) => {
    navigateTo(`/tour/domestic/${tour.id}`);
};

const bookTour = (tour: TourPackageModel) => {
    console.log("Book tour!");
    alert(`Booking tour... ${tour?.name?.lo}`);
    showBookingDialog.value = true;
    selectedTour.value = tour;
};

const handleBookingSubmit = (data: any) => {
    console.log("Booking data:", data);
    isBooking.value = true;
    setTimeout(() => {
        isBooking.value = false;
        showBookingDialog.value = false;
        alert("Booking successful!");
    }, 2000);
};
</script>
