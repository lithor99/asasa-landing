<template>
    <div class="min-h-screen bg-gray-50 py-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Image Slider -->
            <div
                class="relative bg-white rounded-lg shadow-lg overflow-hidden mb-8"
            >
                <div class="relative h-96 md:h-[500px] overflow-hidden">
                    <img
                        :src="tour.images[currentImageIndex].url"
                        :alt="tour.images[currentImageIndex].alt"
                        class="w-full h-full object-cover"
                    />

                    <!-- Navigation Arrows -->
                    <button
                        v-if="tour.images.length > 1"
                        @click="prevImage"
                        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        v-if="tour.images.length > 1"
                        @click="nextImage"
                        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <!-- Image Indicators -->
                    <div
                        v-if="tour.images.length > 1"
                        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                    >
                        <button
                            v-for="(image, index) in tour.images"
                            :key="image.id"
                            @click="goToImage(index)"
                            class="w-2.5 h-2.5 rounded-full transition-all"
                            :class="
                                currentImageIndex === index
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                            "
                        />
                    </div>
                </div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Tour Header -->
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div
                            class="flex items-center gap-3 mb-3 text-sm text-gray-500"
                        >
                            <span class="flex items-center gap-1">
                                <svg
                                    class="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                {{ tour.location }}
                            </span>
                            <span>•</span>
                            <span class="flex items-center gap-1">
                                <svg
                                    class="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {{ tour.duration }}
                            </span>
                        </div>

                        <h1
                            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            {{ tour.title }}
                        </h1>

                        <p class="text-gray-600 leading-relaxed">
                            {{ tour.detailedDescription }}
                        </p>
                    </div>

                    <!-- Included/Excluded -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">
                                Included
                            </h3>
                            <ul class="space-y-2">
                                <li
                                    v-for="(item, index) in tour.included"
                                    :key="index"
                                    class="flex items-start gap-2 text-gray-600"
                                >
                                    <svg
                                        class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {{ item }}
                                </li>
                            </ul>
                        </div>

                        <div class="bg-white rounded-lg shadow-md p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">
                                Excluded
                            </h3>
                            <ul class="space-y-2">
                                <li
                                    v-for="(item, index) in tour.excluded"
                                    :key="index"
                                    class="flex items-start gap-2 text-gray-600"
                                >
                                    <svg
                                        class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
                        <div class="text-center mb-6">
                            <p class="text-4xl font-bold text-red-500">
                                ${{ tour.price }}
                            </p>
                            <p class="text-gray-500 text-sm mt-1">per person</p>
                        </div>

                        <button
                            @click="showBookingDialog = true"
                            class="w-full bg-gray-800 hover:bg-gray-600 text-white font-semibold py-4 rounded-full transition-colors mb-6"
                        >
                            Book Now
                        </button>

                        <div class="space-y-4 border-t pt-6">
                            <div
                                class="flex items-center justify-between text-sm"
                            >
                                <span class="text-gray-600">Duration</span>
                                <span class="font-semibold text-gray-900">{{
                                    tour.duration
                                }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between text-sm"
                            >
                                <span class="text-gray-600">Max People</span>
                                <span class="font-semibold text-gray-900">{{
                                    tour.maxPeople
                                }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between text-sm"
                            >
                                <span class="text-gray-600">Min Age</span>
                                <span class="font-semibold text-gray-900"
                                    >{{ tour.minAge }}+</span
                                >
                            </div>
                            <div
                                class="flex items-center justify-between text-sm"
                            >
                                <span class="text-gray-600">Tour Type</span>
                                <span class="font-semibold text-gray-900">
                                    {{ tour.tourType }}
                                </span>
                            </div>
                        </div>

                        <div class="mt-6 pt-6 border-t">
                            <p class="text-sm text-gray-500 text-center">
                                Have questions?
                                <a
                                    href="#"
                                    class="text-blue-600 hover:text-blue-700 font-medium"
                                    >Contact us</a
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Dialog Component -->
        <TourBookingDilog
            v-model="showBookingDialog"
            :tour="tour"
            :is-processing="isBooking"
            @submit="handleBookingSubmit"
        />

        <!-- Payment Dialog Component -->
        <PaymentDialog
            v-model="showPaymentDialog"
            :tour="tour"
            :is-processing="isPaying"
            @submit="handlePaymentSubmit"
            @back="backToBooking"
        />
    </div>
</template>

<script setup lang="ts">
import TourBookingDilog from "~/components/tourBookingDilog.vue";

interface TourImage {
    id: number;
    url: string;
    alt: string;
}

interface Tour {
    id: number | string;
    title: string;
    description: string;
    images: TourImage[];
    price: number;
    badge?: string;
    location: string;
    duration: string;
    rating: number;
    reviews: number;
    detailedDescription: string;
    included: string[];
    excluded: string[];
    itinerary: Array<{
        day: number;
        title: string;
        description: string;
    }>;
    maxPeople: number;
    minAge: number;
    startDate: string;
    tourType: string;
}

interface BookingFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    note: string;
}

interface PaymentFormData {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    cardType: string;
}

// Tour data
const tour = ref<Tour>({
    id: 1,
    title: "Paris City Tour",
    description: "Explore the beautiful city of lights with an expert guide",
    images: [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            alt: "Paris view 1",
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
            alt: "Paris view 2",
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1549144511-f099e773c147",
            alt: "Paris view 3",
        },
    ],
    price: 299,
    badge: "Popular",
    location: "Paris, France",
    duration: "3 days",
    rating: 4.8,
    reviews: 342,
    detailedDescription:
        "Experience the magic of Paris with our comprehensive 3-day tour. Visit iconic landmarks, enjoy authentic French cuisine, and discover hidden gems that only locals know about.",
    included: [
        "Professional tour guide",
        "Hotel accommodation (2 nights)",
        "Breakfast daily",
        "Entrance fees to monuments",
        "Transportation during tour",
    ],
    excluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Lunch and dinner",
    ],
    itinerary: [
        {
            day: 1,
            title: "Arrival & City Tour",
            description:
                "Arrive in Paris, check-in to hotel. Afternoon walking tour of the Latin Quarter and Notre-Dame.",
        },
        {
            day: 2,
            title: "Iconic Landmarks",
            description:
                "Visit the Eiffel Tower, Louvre Museum, and cruise along the Seine River.",
        },
        {
            day: 3,
            title: "Montmartre & Departure",
            description:
                "Explore Montmartre, visit Sacré-Cœur, and enjoy free time before departure.",
        },
    ],
    maxPeople: 15,
    minAge: 12,
    startDate: "2025-11-15",
    tourType: "Group Tour",
});

// Image slider
const currentImageIndex = ref(0);

const nextImage = () => {
    if (tour.value.images.length > 0) {
        currentImageIndex.value =
            (currentImageIndex.value + 1) % tour.value.images.length;
    }
};

const prevImage = () => {
    if (tour.value.images.length > 0) {
        currentImageIndex.value =
            currentImageIndex.value === 0
                ? tour.value.images.length - 1
                : currentImageIndex.value - 1;
    }
};

const goToImage = (index: number) => {
    currentImageIndex.value = index;
};

// Dialog states
const showBookingDialog = ref(false);
const showPaymentDialog = ref(false);
const isBooking = ref(false);
const isPaying = ref(false);

// Store booking data temporarily
const bookingData = ref<BookingFormData | null>(null);

// Handle booking submission
const handleBookingSubmit = async () => {
    isBooking.value = true;

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Show success message
        alert("Booking successful! Your booking is confirmed.");

        showBookingDialog.value = false;
        showPaymentDialog.value = true;
    } catch (error) {
        console.error("Booking failed:", error);
        alert("Failed to process booking. Please try again.");
    } finally {
        isBooking.value = false;
    }
};

// Handle payment submission
const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    isPaying.value = true;

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Handle successful payment
        console.log("Booking completed:", {
            tourId: tour.value.id,
            booking: bookingData.value,
            payment: {
                cardType: paymentData.cardType,
                cardHolder: paymentData.cardHolder,
                lastFourDigits: paymentData.cardNumber.slice(-4),
            },
        });

        // Show success message
        alert("Payment successful! Your booking is confirmed.");

        // Close dialog and clear data
        showPaymentDialog.value = false;
        bookingData.value = null;
    } catch (error) {
        console.error("Payment failed:", error);
        alert("Failed to process payment. Please try again.");
    } finally {
        isPaying.value = false;
    }
};

// Back to booking from payment
const backToBooking = () => {
    showPaymentDialog.value = false;
    showBookingDialog.value = true;
};
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
