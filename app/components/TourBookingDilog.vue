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
                            Book Your Tour
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
                        <h3 class="text-sm font-semibold text-gray-700 mb-3">
                            Tour Detail
                        </h3>
                        <div class="bg-gray-50 rounded-lg p-4 mb-6">
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600"
                                        >Tour Title</span
                                    >
                                    <span class="font-semibold text-gray-900">{{
                                        tour.title
                                    }}</span>
                                </div>
                                <div
                                    class="flex justify-between text-sm pt-2 border-t"
                                >
                                    <span class="text-gray-600"
                                        >Total Price</span
                                    >
                                    <span class="font-bold text-lg text-red-500"
                                        >${{ tour.price }}</span
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Booking Form -->
                        <div class="space-y-5">
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
                                    for="phoneNumber"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Phone Number
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="phoneNumber"
                                    v-model="formData.phoneNumber"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.phoneNumber,
                                    }"
                                />
                                <p
                                    v-if="errors.phoneNumber"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.phoneNumber }}
                                </p>
                            </div>

                            <!-- Note -->
                            <div>
                                <label
                                    for="note"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    id="note"
                                    v-model="formData.note"
                                    rows="3"
                                    placeholder="Any special requests or questions?"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <!-- Dialog Actions -->
                        <div class="flex gap-3 mt-6 pt-6 border-t">
                            <button
                                type="button"
                                @click="closeDialog"
                                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                :disabled="isProcessing"
                                @click="handleSubmit"
                                class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                            >
                                <span v-if="isProcessing">Processing...</span>
                                <span v-else>Confirm</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
interface Tour {
    title: string;
    price: number;
    [key: string]: any;
}

interface BookingFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    note: string;
}

interface Props {
    modelValue: boolean;
    tour: Tour;
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

// Form data
const formData = ref<BookingFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    note: "",
});

// Form errors
const errors = ref<Partial<Record<keyof BookingFormData, string>>>({});

// Validate form
const validateForm = (): boolean => {
    errors.value = {};

    if (!formData.value.fullName.trim()) {
        errors.value.fullName = "Full name is required";
    }

    if (!formData.value.email.trim()) {
        errors.value.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = "Please enter a valid email";
    }

    if (!formData.value.phoneNumber.trim()) {
        errors.value.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.value.phoneNumber)) {
        errors.value.phoneNumber = "Please enter a valid phone number";
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
                    fullName: "",
                    email: "",
                    phoneNumber: "",
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
</style>
