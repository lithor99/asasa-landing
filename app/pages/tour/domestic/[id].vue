<template>
    <div class="min-h-screen bg-gray-50 pt-4 pb-12">
        <!-- Breadcrumb -->
        <Breadcrumb :items="breadcrumbItems" />
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Image Slider -->
            <div
                class="relative bg-white rounded-lg shadow-lg overflow-hidden mb-8"
            >
                <div
                    class="relative h-96 md:h-[500px] overflow-hidden"
                    @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove"
                    @touchend="handleTouchEnd"
                >
                    <!-- Image Container with Transition -->
                    <div
                        class="flex transition-transform duration-300 ease-out h-full"
                        :style="{
                            transform: `translateX(-${
                                currentImageIndex * 100
                            }%)`,
                        }"
                    >
                        <img
                            v-for="(image, index) in sliceImages"
                            :key="index"
                            :src="`${CDN()}${image}`"
                            :alt="image?.alt || `Tour Image ${index + 1}`"
                            class="w-full h-full object-cover flex-shrink-0"
                        />
                    </div>

                    <!-- Navigation Arrows -->
                    <button
                        v-if="sliceImages.length > 1"
                        @click.stop="prevImage"
                        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
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
                        v-if="sliceImages.length > 1"
                        @click.stop="nextImage"
                        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
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
                        v-if="sliceImages.length > 1"
                        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                    >
                        <button
                            v-for="(image, index) in sliceImages"
                            :key="index"
                            @click.stop="goToImage(index)"
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
                                    class="h-5 w-5"
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
                                {{
                                    countDays(
                                        tourPackageStore?.tourPackage
                                            ?.createdAt,
                                    )
                                }}
                            </span>
                            <span>•</span>
                            <span class="flex items-center gap-1">
                                <Icon
                                    name="hugeicons:date-time"
                                    class="w-4 h-4 text-red-500"
                                />{{
                                    tourPackageStore?.tourPackage?.travelDays
                                }}
                                <span
                                    v-if="
                                        tourPackageStore?.tourPackage
                                            ?.travelDays < 1
                                    "
                                >
                                    day for sightseeing
                                </span>
                                <span v-else> days for sightseeing </span>
                            </span>
                        </div>

                        <h1
                            class="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            {{ tourPackageStore?.tourPackage?.name?.lo }}
                        </h1>

                        <p class="text-gray-600 leading-relaxed">
                            {{ tourPackageStore?.tourPackage?.detail?.lo }}
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
                                    v-for="(item, index) in included"
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
                                    v-for="(item, index) in excluded"
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
                                {{
                                    formatCurrency(
                                        tourPackageStore?.tourPackage
                                            ?.pricePerPerson || 0,
                                    )
                                }}
                            </p>
                            <p class="text-gray-500 text-xl mt-1">per person</p>
                        </div>

                        <div class="text-center mb-6 mt-3 border-t pt-3">
                            <p class="text-4xl font-bold text-orange-500">
                                {{
                                    formatCurrency(
                                        tourPackageStore?.tourPackage
                                            ?.pricePerGroup || 0,
                                    )
                                }}
                            </p>
                            <p class="text-gray-500 text-xl mt-1">per group</p>
                        </div>

                        <button
                            @click="bookTour"
                            class="w-full bg-gray-800 hover:bg-gray-600 text-white font-semibold py-4 rounded-full transition-colors mb-6"
                        >
                            Book Now
                        </button>

                        <div class="space-y-4 border-t pt-6">
                            <div
                                class="flex items-center justify-between text-md"
                            >
                                <span class="text-gray-600">Duration</span>
                                <span class="font-semibold text-gray-900">{{
                                    tourPackageStore?.tourPackage?.travelDays
                                }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between text-md"
                            >
                                <span class="text-gray-600"
                                    >People Per Group</span
                                >
                                <span class="font-semibold text-gray-900">{{
                                    tourPackageStore?.tourPackage?.personOfGroup
                                }}</span>
                            </div>
                            <div
                                class="flex items-center justify-between text-md"
                            >
                                <span class="text-gray-600">Tour Type</span>
                                <span class="font-semibold text-gray-900">
                                    {{
                                        C_TOUR_TYPE.find(
                                            (item: any) =>
                                                item.value ===
                                                tourPackageStore?.tourPackage
                                                    ?.tourType,
                                        )?.en
                                    }}
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
            :tour="tourPackageStore?.tourPackage"
            :is-processing="isBooking"
            @submit="handleBookingSubmit"
        />

        <!-- Booking Confirmation Dialog -->
        <div
            v-if="showBookingCodeDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                <div class="text-center mb-6">
                    <!-- Success Icon -->
                    <div
                        class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                    >
                        <svg
                            class="w-8 h-8 text-green-500"
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
                    </div>

                    <h3 class="text-2xl font-bold text-gray-900 mb-2">
                        Booking Successful!
                    </h3>
                    <p class="text-gray-600 mb-4">
                        Your booking has been confirmed. Please save your
                        booking code.
                    </p>
                </div>

                <!-- Booking Code Display -->
                <div
                    class="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-dashed border-gray-300"
                >
                    <p class="text-sm text-gray-600 mb-2 text-center">
                        Your Booking Code
                    </p>
                    <p
                        class="text-3xl font-bold text-center text-gray-900 tracking-wider"
                    >
                        {{ bookingCode }}
                    </p>
                </div>

                <p class="text-sm text-gray-500 text-center mb-6">
                    This code has already been sent to your email
                    <br />
                    ({{ email }})
                </p>

                <!-- Action Button -->
                <button
                    @click="proceedToPayment"
                    class="w-full bg-gray-800 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    OK, Proceed to Payment
                </button>
            </div>
        </div>

        <!-- Payment Dialog Component -->
        <PaymentDialog
            v-model="showPaymentDialog"
            :tour="tourPackageStore?.tourPackage"
            :is-processing="isPaying"
            @submit="handlePaymentSubmit"
            @back="backToBooking"
        />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "detail",
});
const { setQueryServerSide, isQueryServerSide } = useMainStore();
const mainStore = useMainStore();
const tourPackageStore = useTourPackageStore();
const tourBookStore = useTourBookStore();
const route = useRoute();
const { id } = route.params;

const tourPackageLoading = ref(false);

// Dialog states
const showBookingDialog = ref(false);
const showBookingCodeDialog = ref(false);
const showPaymentDialog = ref(false);
const isBooking = ref(false);
const isPaying = ref(false);

// Booking code
const bookingCode = ref("");
const email = ref("");

// Image slider
const currentImageIndex = ref(0);

// Touch/Swipe handling
const touchStartX = ref(0);
const touchEndX = ref(0);
const isSwiping = ref(false);

// Image slider
// const currentImageIndex = ref(0);
const included = [
    "Professional tour guide",
    "Hotel accommodation (2 nights)",
    "Breakfast daily",
    "Entrance fees to monuments",
    "Transportation during tour",
];

const excluded = [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Lunch and dinner",
];

/**
 *  onMounted
 */
onMounted(async () => {
    if (!isQueryServerSide) {
        tourPackageLoading.value = true;
        await tourPackageStore.setOne(id as string);
        tourPackageLoading.value = false;
    }
    await setQueryServerSide(false);
});

if (import.meta.server) {
    tourPackageLoading.value = true;
    await tourPackageStore.setOne(id as string);
    tourPackageLoading.value = false;
}

// Breadcrumb items
const breadcrumbItems = computed(() => {
    const items = [
        { label: "Home", to: "/" },
        { label: "Domestic Tour", to: "/tour-domestic" },
    ];

    return items;
});

const sliceImages = computed(() => {
    const images = tourPackageStore?.tourPackage?.images || [];
    const image = tourPackageStore?.tourPackage?.image as string;

    console.log("Main Image:", image);
    console.log("Additional Images:", images);
    console.log("All Images:", [image, ...images]);
    return [image, ...images];
});

// Fixed nextImage
const nextImage = () => {
    if (sliceImages.value && sliceImages.value.length > 0) {
        currentImageIndex.value =
            (currentImageIndex.value + 1) % sliceImages.value.length;
    }
};

// Fixed prevImage
const prevImage = () => {
    if (sliceImages.value && sliceImages.value.length > 0) {
        currentImageIndex.value =
            currentImageIndex.value === 0
                ? sliceImages.value.length - 1
                : currentImageIndex.value - 1;
    }
};

const goToImage = (index: number) => {
    currentImageIndex.value = index;
};

// Store booking data temporarily
const bookingData = ref<any | null>(null);

const bookTour = () => {
    showBookingDialog.value = true;
    console.log("Booking Data:", bookingData.value);
};

// Handle booking submission
const handleBookingSubmit = async (bookForm: any) => {
    isBooking.value = true;

    try {
        console.log("Booking Form Data:", bookForm);

        const data = (await tourBookStore.create(bookForm)) as any;

        console.log("Booking response:", data);

        if (data && data?.success) {
            // Store the booking code from API response
            bookingCode.value = data.data.bookCode;
            email.value = data.data.email;

            // Close booking dialog
            showBookingDialog.value = false;

            // Show booking code dialog
            showBookingCodeDialog.value = true;

            mainStore.setShowSnackbar({
                isOpen: true,
                isSuccess: true,
                message: _tl("Booking successful!"),
                timeout: 2000,
            });
        } else {
            mainStore.setShowSnackbar({
                isOpen: true,
                isSuccess: false,
                message: _tl(
                    data?.message || "Booking failed. Please try again.",
                ),
                timeout: 2000,
            });
        }
    } catch (error) {
        console.error("Booking failed:", error);
        mainStore.setShowSnackbar({
            isOpen: true,
            isSuccess: false,
            message: _tl("Booking failed. Please try again."),
            timeout: 2000,
        });
    } finally {
        isBooking.value = false;
    }
};

// Proceed to payment after viewing booking code
const proceedToPayment = () => {
    showBookingCodeDialog.value = false;
    showPaymentDialog.value = true;
};

// Handle payment submission
const handlePaymentSubmit = async (paymentData: any) => {
    isPaying.value = true;

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Handle successful payment
        console.log("Booking completed:", {
            tourId: 1,
            bookingCode: bookingCode.value,
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
        bookingCode.value = "";
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
};

// Touch events (mobile)
const handleTouchStart = (e: TouchEvent) => {
    // Check if touch started on a button
    const target = e.target as HTMLElement;
    if (target.closest("button")) {
        return; // Don't start swipe if touching a button
    }

    touchStartX.value = e.touches[0].clientX;
    isSwiping.value = true;
};

const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping.value) return;
    touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
    if (!isSwiping.value) return;
    handleSwipe();
    isSwiping.value = false;
};

// Handle swipe logic
const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum swipe distance
    const difference = touchStartX.value - touchEndX.value;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swiped left - go to next image
            nextImage();
        } else {
            // Swiped right - go to previous image
            prevImage();
        }
    }

    // Reset values
    touchStartX.value = 0;
    touchEndX.value = 0;
};
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
