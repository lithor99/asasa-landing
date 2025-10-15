<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                @click.self="closeDialog"
            >
                <div
                    class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                    <!-- Dialog Header -->
                    <div
                        class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between"
                    >
                        <h2 class="text-2xl font-bold text-gray-900">
                            Booking Tour
                        </h2>
                        <button
                            @click="closeDialog"
                            class="text-gray-400 hover:text-gray-600 transition-colors"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Dialog Content -->
                    <div class="p-6">
                        <!-- Tour Summary -->
                        <h3 class="text-sm font-semibold text-gray-700 mb-1">
                            Tour Title
                        </h3>
                        <div class="bg-gray-50 rounded-lg p-4 mb-6">
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="font-semibold text-gray-900">
                                        {{ tour?.name?.lo }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Booking Form -->
                        <form @submit.prevent="handleSubmit" class="space-y-5">
                            <!-- Select Tour -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Select Tour Type
                                    <span class="text-red-500">*</span>
                                </label>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <!-- Solo Tour Option -->
                                    <button
                                        type="button"
                                        @click="selectTourType('SINGLE')"
                                        class="relative flex items-center px-4 py-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md"
                                        :class="
                                            formData.tourCategory === 'SINGLE'
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 bg-white hover:border-gray-400'
                                        "
                                    >
                                        <!-- Checked Icon -->
                                        <div
                                            class="flex-shrink-0 mr-3"
                                            :class="
                                                formData.tourCategory ===
                                                'SINGLE'
                                                    ? 'text-blue-600'
                                                    : 'text-gray-300'
                                            "
                                        >
                                            <svg
                                                v-if="
                                                    formData.tourCategory ===
                                                    'SINGLE'
                                                "
                                                class="w-6 h-6"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                                />
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke-width="2"
                                                />
                                            </svg>
                                        </div>

                                        <!-- Content -->
                                        <div class="flex-1 text-left">
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <Icon
                                                    name="mingcute:user-3-line"
                                                    class="w-5 h-5"
                                                    :class="
                                                        formData.tourCategory ===
                                                        'SINGLE'
                                                            ? 'text-blue-600'
                                                            : 'text-gray-600'
                                                    "
                                                />
                                                <span
                                                    class="font-semibold"
                                                    :class="
                                                        formData.tourCategory ===
                                                        'SINGLE'
                                                            ? 'text-blue-700'
                                                            : 'text-gray-700'
                                                    "
                                                >
                                                    Solo Tour
                                                </span>
                                            </div>
                                            <p
                                                class="text-md text-red-500 text-xl font-bold mt-1 ml-1"
                                            >
                                                {{
                                                    formatCurrency(
                                                        tour?.pricePerPerson ||
                                                            "0",
                                                    )
                                                }}
                                            </p>
                                            <p
                                                class="text-md text-gray-500 mt-0.5 ml-1"
                                            >
                                                Price per person
                                            </p>
                                        </div>
                                    </button>

                                    <!-- Group Tour Option -->
                                    <button
                                        type="button"
                                        @click="selectTourType('GROUP')"
                                        class="relative flex items-center px-4 py-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md"
                                        :class="
                                            formData.tourCategory === 'GROUP'
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-300 bg-white hover:border-gray-400'
                                        "
                                    >
                                        <!-- Checked Icon -->
                                        <div
                                            class="flex-shrink-0 mr-3"
                                            :class="
                                                formData.tourCategory ===
                                                'GROUP'
                                                    ? 'text-green-600'
                                                    : 'text-gray-300'
                                            "
                                        >
                                            <svg
                                                v-if="
                                                    formData.tourCategory ===
                                                    'GROUP'
                                                "
                                                class="w-6 h-6"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                                />
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke-width="2"
                                                />
                                            </svg>
                                        </div>

                                        <!-- Content -->
                                        <div class="flex-1 text-left">
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <Icon
                                                    name="mingcute:group-3-line"
                                                    class="w-5 h-5"
                                                    :class="
                                                        formData.tourCategory ===
                                                        'GROUP'
                                                            ? 'text-green-600'
                                                            : 'text-gray-600'
                                                    "
                                                />
                                                <span
                                                    class="font-semibold"
                                                    :class="
                                                        formData.tourCategory ===
                                                        'GROUP'
                                                            ? 'text-green-700'
                                                            : 'text-gray-700'
                                                    "
                                                >
                                                    Group Tour
                                                </span>
                                            </div>
                                            <p
                                                class="text-md text-orange-500 font-bold mt-1 ml-1 text-xl"
                                            >
                                                {{
                                                    formatCurrency(
                                                        tour?.pricePerGroup ||
                                                            "0",
                                                    )
                                                }}
                                            </p>
                                            <p
                                                class="text-md text-gray-500 mt-0.5 ml-1"
                                            >
                                                Price per group ({{
                                                    tour?.groupAmount
                                                }}
                                                people)
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <!-- Traveler Amount Input -->
                            <div>
                                <label
                                    for="travelerAmount"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {{
                                        formData.tourCategory === "SINGLE"
                                            ? "Number of Travelers"
                                            : "Number of Groups"
                                    }}
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="travelerAmount"
                                    v-model.number="formData.travelerAmount"
                                    type="number"
                                    min="1"
                                    placeholder="Enter number"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.travelerAmount,
                                    }"
                                />
                                <p
                                    v-if="errors.travelerAmount"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.travelerAmount }}
                                </p>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{
                                        formData.tourCategory === "SINGLE"
                                            ? "Enter the number of people joining the tour"
                                            : `Enter the number of groups (${tour?.groupAmount} people per group)`
                                    }}
                                </p>
                            </div>

                            <!-- Start Date -->
                            <div>
                                <label
                                    for="startDate"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Start Travel Date
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="startDate"
                                    v-model="formData.startDate"
                                    type="date"
                                    :min="minDate"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.startDate,
                                    }"
                                />
                                <p
                                    v-if="errors.startDate"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.startDate }}
                                </p>
                            </div>

                            <!-- Full Name -->
                            <div>
                                <label
                                    for="fullName"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Full Name
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="fullName"
                                    v-model="formData.fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.fullName,
                                    }"
                                />
                                <p
                                    v-if="errors.fullName"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.fullName }}
                                </p>
                            </div>

                            <!-- Email -->
                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    v-model="formData.email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.email,
                                    }"
                                />
                                <p
                                    v-if="errors.email"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.email }}
                                </p>
                            </div>

                            <!-- Phone Number -->
                            <div>
                                <label
                                    for="phone"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    v-model="formData.phone"
                                    type="tel"
                                    placeholder="+856 20 1234 5678"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.phone,
                                    }"
                                />
                            </div>

                            <!-- Note -->
                            <div>
                                <label
                                    for="note"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Note (Optional)
                                </label>
                                <textarea
                                    id="note"
                                    v-model="formData.note"
                                    rows="3"
                                    placeholder="Additional information"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                                ></textarea>
                            </div>

                            <!-- Total Price Summary -->
                            <div
                                class="bg-blue-50 border border-blue-200 rounded-lg p-4"
                            >
                                <div class="flex justify-between items-center">
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            Total Amount
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            {{ formData.travelerAmount || 0 }} ×
                                            {{
                                                formatCurrency(
                                                    formData.tourCategory ===
                                                        "SINGLE"
                                                        ? tour?.pricePerPerson ||
                                                              "0"
                                                        : tour?.pricePerGroup ||
                                                              "0",
                                                )
                                            }}
                                        </p>
                                    </div>
                                    <p class="text-2xl font-bold text-red-600">
                                        {{ formatCurrency(String(totalPrice)) }}
                                    </p>
                                </div>
                            </div>

                            <!-- Dialog Actions -->
                            <div class="flex gap-3 pt-6 border-t">
                                <button
                                    type="button"
                                    @click="closeDialog"
                                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    :disabled="isProcessing"
                                    class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                                >
                                    <span v-if="isProcessing"
                                        >Processing...</span
                                    >
                                    <span v-else>Confirm Booking</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { TourPackageModel } from "~/models/tourPackage";

interface BookingFormData {
    packageId: number;
    tourCategory: "SINGLE" | "GROUP";
    travelerAmount: number;
    fullName: string;
    email: string;
    phone: string;
    startDate: string;
    countryCode: string;
    note?: string;
}

interface Props {
    modelValue: boolean;
    tour: TourPackageModel;
    isProcessing?: boolean;
}

interface Emits {
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", data: BookingFormData): void;
}

const props = withDefaults(defineProps<Props>(), {
    isProcessing: false,
});

const emit = defineEmits<Emits>();

// Get today's date in YYYY-MM-DD format for min date
const minDate = computed(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
});

// Form data
const formData = ref<BookingFormData>({
    packageId: 0,
    tourCategory: "SINGLE",
    travelerAmount: 1, // Default value is 1
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    countryCode: "LA",
    note: "",
});

// Initialize form data when tour changes
watch(
    () => props.tour,
    (newTour) => {
        if (newTour) {
            formData.value.packageId = newTour.id;
            const tc = newTour.tourCategory;
            formData.value.tourCategory = tc === "GROUP" ? "GROUP" : "SINGLE";
        }
    },
    { immediate: true },
);

// Function to select tour type
const selectTourType = (type: "SINGLE" | "GROUP") => {
    formData.value.tourCategory = type;
    // Reset traveler amount to 1 when switching types
    formData.value.travelerAmount = 1;
};

// Calculate total price
const totalPrice = computed(() => {
    const amount = formData.value.travelerAmount || 0;
    const price =
        formData.value.tourCategory === "SINGLE"
            ? Number(props.tour?.pricePerPerson || 0)
            : Number(props.tour?.pricePerGroup || 0);
    return amount * price;
});

// Form errors
const errors = ref<Partial<Record<keyof BookingFormData, string>>>({});

// Validate form
const validateForm = (): boolean => {
    errors.value = {};

    if (!formData.value.travelerAmount || formData.value.travelerAmount < 1) {
        errors.value.travelerAmount =
            formData.value.tourCategory === "SINGLE"
                ? "Number of travelers is required and must be at least 1"
                : "Number of groups is required and must be at least 1";
    }

    if (!formData.value.startDate) {
        errors.value.startDate = "Start travel date is required";
    } else {
        const selectedDate = new Date(formData.value.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.value.startDate = "Start date cannot be in the past";
        }
    }

    if (!formData.value.fullName.trim()) {
        errors.value.fullName = "Full name is required";
    }

    if (!formData.value.email.trim()) {
        errors.value.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = "Please enter a valid email";
    }

    return Object.keys(errors.value).length === 0;
};

// Handle form submission
const handleSubmit = () => {
    if (!validateForm()) {
        return;
    }

    emit("submit", { ...formData.value });
};

// Close dialog
const closeDialog = () => {
    emit("update:modelValue", false);
};

// Reset form when dialog closes
watch(
    () => props.modelValue,
    (newValue) => {
        if (!newValue) {
            setTimeout(() => {
                formData.value = {
                    packageId: props.tour?.id || 0,
                    tourCategory:
                        props.tour?.tourCategory === "GROUP"
                            ? "GROUP"
                            : "SINGLE",
                    travelerAmount: 1, // Reset to default 1
                    fullName: "",
                    email: "",
                    phone: "",
                    startDate: "",
                    countryCode: "LA",
                    note: "",
                };
                errors.value = {};
            }, 300);
        }
    },
);
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
    transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}

.dialog-enter-active > div,
.dialog-leave-active > div {
    transition: transform 0.3s ease;
}

.dialog-enter-from > div,
.dialog-leave-to > div {
    transform: scale(0.95);
}

/* Hide date input calendar icon on some browsers */
input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
}
</style>
