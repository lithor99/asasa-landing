<template>
    <div class="min-h-screen bg-gray-50 py-12">
        <!-- Breadcrumb -->
        <Breadcrumb :items="breadcrumbItems" />
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Loading State -->
            <div
                v-if="loading"
                class="flex justify-center items-center min-h-[400px]"
            >
                <div class="text-center">
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    ></div>
                    <p class="text-gray-600">Loading booking details...</p>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="error"
                class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
            >
                <Icon
                    name="mdi:alert-circle"
                    class="w-16 h-16 text-red-500 mx-auto mb-4"
                />
                <h2 class="text-xl font-bold text-red-900 mb-2">
                    Booking Not Found
                </h2>
                <p class="text-red-700 mb-4">{{ error }}</p>
                <NuxtLink
                    to="/"
                    class="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                    Back to Home
                </NuxtLink>
            </div>

            <!-- Booking Details -->
            <div v-else-if="booking" class="space-y-6">
                <!-- Header with Status -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900 mb-2">
                                Booking Details
                            </h1>
                            <p class="text-lg text-gray-600">
                                Booking Code:
                                <span class="font-semibold text-blue-600">{{
                                    booking.bookCode
                                }}</span>
                            </p>
                        </div>
                        <div class="text-right">
                            <!-- Booking Status Badge -->
                            <span
                                class="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-2"
                                :class="getBookingStatusClass(booking.status)"
                            >
                                Booking Status:
                                {{ formatStatus(booking.status) }}
                            </span>
                            <!-- Payment Status Badge -->
                            <div>
                                <span
                                    class="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                                    :class="
                                        getPaymentStatusClass(
                                            booking.paymentStatus,
                                        )
                                    "
                                >
                                    Payment Status:
                                    {{ formatStatus(booking.paymentStatus) }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Alert -->
                    <div
                        v-if="showPaymentButton"
                        class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
                    >
                        <div class="flex items-center">
                            <Icon
                                name="mdi:alert"
                                class="w-6 h-6 text-yellow-600 mr-3"
                            />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-yellow-800">
                                    Payment
                                    {{
                                        booking.paymentStatus === "FAILED"
                                            ? "Failed"
                                            : "Pending"
                                    }}
                                </p>
                                <p class="text-sm text-yellow-700 mt-1">
                                    Please complete your payment to confirm the
                                    booking.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Date Info -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-md">
                        <div>
                            <p class="text-gray-500">Booked On</p>
                            <p class="font-semibold text-gray-900">
                                {{ formatDate(booking.createdAt) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-500">Travel Start</p>
                            <p class="font-semibold text-gray-900">
                                {{ formatDate(booking.startDate) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-500">Travel End</p>
                            <p class="font-semibold text-gray-900">
                                {{ formatDate(booking.endDate) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Tour Package Details -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        Tour Package
                    </h2>
                    <div class="flex gap-6">
                        <!-- Package Image -->
                        <img
                            :src="`${CDN()}${booking.package.image}`"
                            :alt="booking.package.name.lo"
                            class="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                        />
                        <!-- Package Info -->
                        <div class="flex-1">
                            <h3
                                class="text-lg font-semibold text-gray-900 mb-2"
                            >
                                {{ booking?.package?.name?.lo }}
                            </h3>
                            <p class="text-gray-600 text-sm mb-3">
                                {{ booking?.package?.detail?.lo }}
                            </p>
                            <div class="flex flex-wrap gap-4 text-sm">
                                <div class="flex items-center gap-2">
                                    <Icon
                                        name="mdi:clock-outline"
                                        class="w-4 h-4 text-gray-500"
                                    />
                                    <span
                                        >{{
                                            booking.package.travelDays
                                        }}
                                        days</span
                                    >
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon
                                        name="mdi:map-marker"
                                        class="w-4 h-4 text-gray-500"
                                    />
                                    <span class="capitalize">{{
                                        C_TOUR_TYPE.find(
                                            (item: any) =>
                                                item.value ===
                                                booking.package.tourType,
                                        )?.en
                                    }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon
                                        :name="
                                            booking.tourCategory === 'SINGLE'
                                                ? 'mdi:account'
                                                : 'mdi:account-group'
                                        "
                                        class="w-4 h-4 text-gray-500"
                                    />
                                    <span class="capitalize">{{
                                        C_TOUR_CATEGORY.find(
                                            (item: any) =>
                                                item.value ===
                                                booking.tourCategory,
                                        )?.en
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        Contact Information
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Full Name</p>
                            <p class="font-semibold text-gray-900">
                                {{ booking.fullName }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Email</p>
                            <p class="font-semibold text-gray-900">
                                {{ booking.email }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Phone</p>
                            <p class="font-semibold text-gray-900">
                                {{ booking.phone }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Country</p>
                            <div class="flex items-center gap-2">
                                <img
                                    :src="`${CDN()}${booking.country.flag}`"
                                    :alt="booking.country.name.lo"
                                    class="w-6 h-4 object-cover rounded"
                                />
                                <span class="font-semibold text-gray-900">{{
                                    booking.country.name.lo
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Booking Summary -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        Booking Summary
                    </h2>
                    <div class="space-y-3">
                        <div class="flex justify-between text-gray-700">
                            <span>{{
                                booking.tourCategory === "SINGLE"
                                    ? "Number of Travelers"
                                    : "Number of Groups"
                            }}</span>
                            <span class="font-semibold">{{
                                booking.travelerAmount
                            }}</span>
                        </div>
                        <div class="flex justify-between text-gray-700">
                            <span
                                >Price per
                                {{
                                    booking.tourCategory === "SINGLE"
                                        ? "Person"
                                        : "Group"
                                }}</span
                            >
                            <span class="font-semibold">{{
                                formatCurrency(booking.price)
                            }}</span>
                        </div>
                        <div
                            class="border-t pt-3 flex justify-between text-lg font-bold"
                        >
                            <span>Total Amount</span>
                            <span class="text-blue-600">
                                {{
                                    formatCurrency(
                                        Number(booking.price) *
                                            booking.travelerAmount,
                                    )
                                }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                    <!-- Payment Button (only show if payment is pending or failed) -->
                    <button
                        v-if="showPaymentButton"
                        @click="handlePayment"
                        :disabled="isProcessing"
                        class="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Icon name="ion:card" class="w-5 h-5" />
                        <span v-if="isProcessing">Processing...</span>
                        <span v-else>{{
                            booking.paymentStatus === "FAILED"
                                ? "Retry Payment"
                                : "Pay Now"
                        }}</span>
                    </button>

                    <!-- Contact Support -->
                    <button
                        @click="contactSupport"
                        class="px-6 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <Icon name="ic:round-call" class="w-5 h-5" />
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "detail",
});

const { setQueryServerSide, isQueryServerSide } = useMainStore();
const mainStore = useMainStore();
const tourBookStore = useTourBookStore();
const route = useRoute();
const { id } = route.params;

const loading = ref(false);

const error = ref("");
const isProcessing = ref(false);

/**
 *  onMounted
 */
onMounted(async () => {
    if (!isQueryServerSide) {
        loading.value = true;
        await tourBookStore.setOne(id as string);
        loading.value = false;
    }
    await setQueryServerSide(false);
});

if (import.meta.server) {
    loading.value = true;
    await tourBookStore.setOne(id as string);
    loading.value = false;
}

// Breadcrumb items
const breadcrumbItems = computed(() => {
    const items = [
        { label: "Home", to: "/" },
        { label: "Booking Detail", to: "/tour/check" },
    ];

    return items;
});

const booking = computed(() => tourBookStore?.tourBook || null);

// Show payment button if payment is pending or failed
const showPaymentButton = computed(() => {
    return (
        booking.value &&
        (booking.value.paymentStatus === "PENDING" ||
            booking.value.paymentStatus === "FAILED")
    );
});

// Status badge classes
const getBookingStatusClass = (status: string) => {
    const classes = {
        PENDING: "bg-yellow-100 text-yellow-800",
        TRAVELING: "bg-green-100 text-green-800",
        CANCELED: "bg-red-100 text-red-800",
        COMPLETED: "bg-blue-100 text-blue-800",
    };
    return (
        classes[status as keyof typeof classes] || "bg-gray-100 text-gray-800"
    );
};

const getPaymentStatusClass = (status: string) => {
    const classes = {
        PENDING: "bg-yellow-100 text-yellow-800",
        SUCCESS: "bg-green-100 text-green-800",
        FAILED: "bg-red-100 text-red-800",
        REFUNDED: "bg-gray-100 text-gray-800",
    };
    return (
        classes[status as keyof typeof classes] || "bg-gray-100 text-gray-800"
    );
};

// Format status text
const formatStatus = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
};

// Handle payment
const handlePayment = async () => {};

// Contact support
const contactSupport = () => {
    // Open support chat, email, or phone
    window.location.href = "mailto:support@example.com";
    // Or navigate to support page
    // navigateTo('/support');
};
</script>
``` ## Usage: **Access by ID in URL:** ```
/booking/b9790a11-da85-4fb3-a181-3eab31f20e0d ``` **Or by query parameter:** ```
/booking?id=b9790a11-da85-4fb3-a181-3eab31f20e0d
