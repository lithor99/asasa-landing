<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                @click.self="closeDialog"
            >
                <div class="bg-white rounded-lg shadow-2xl max-w-md w-full">
                    <!-- Payment Header -->
                    <div
                        class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-lg"
                    >
                        <h2 class="text-2xl font-bold text-white">Payment</h2>
                        <button
                            @click="closeDialog"
                            class="text-white hover:text-gray-200 transition-colors"
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

                    <!-- Payment Content -->
                    <div class="p-6">
                        <!-- Total Amount -->
                        <div class="bg-gray-50 rounded-lg p-4 mb-6">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Total Amount</span>
                                <span class="text-2xl font-bold text-red-500"
                                    >${{ tour.price }}</span
                                >
                            </div>
                        </div>

                        <!-- Card Type Selection -->
                        <div class="flex gap-4 mb-6">
                            <div
                                :class="[
                                    'flex-1 border-2 rounded-lg p-4 cursor-pointer transition-all',
                                    formData.cardType === 'visa'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200',
                                ]"
                            >
                                <div class="text-center">
                                    <div
                                        class="text-3xl font-bold text-blue-600"
                                    >
                                        VISA
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        Visa Card
                                    </div>
                                </div>
                            </div>
                            <div
                                :class="[
                                    'flex-1 border-2 rounded-lg p-4 cursor-pointer transition-all',
                                    formData.cardType === 'mastercard'
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200',
                                ]"
                            >
                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <div
                                            class="w-8 h-8 rounded-full bg-red-500 opacity-80"
                                        ></div>
                                        <div
                                            class="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4"
                                        ></div>
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        Mastercard
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Form -->
                        <div class="space-y-4">
                            <!-- Card Number -->
                            <div>
                                <label
                                    for="cardNumber"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Card Number
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="cardNumber"
                                    v-model="formData.cardNumber"
                                    @input="handleCardNumberInput"
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    maxlength="19"
                                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.cardNumber,
                                        'border-gray-300': !errors.cardNumber,
                                    }"
                                />
                                <p
                                    v-if="errors.cardNumber"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.cardNumber }}
                                </p>
                            </div>

                            <!-- Cardholder Name -->
                            <div>
                                <label
                                    for="cardHolder"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Cardholder Name
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="cardHolder"
                                    v-model="formData.cardHolder"
                                    type="text"
                                    placeholder="JOHN DOE"
                                    class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    :class="{
                                        'border-red-500 focus:ring-red-500 focus:border-red-500':
                                            errors.cardHolder,
                                        'border-gray-300': !errors.cardHolder,
                                    }"
                                />
                                <p
                                    v-if="errors.cardHolder"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ errors.cardHolder }}
                                </p>
                            </div>

                            <!-- Expiry Date and CVV -->
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        for="expiryDate"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Expiry Date
                                        <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="expiryDate"
                                        v-model="formData.expiryDate"
                                        @input="handleExpiryInput"
                                        type="text"
                                        placeholder="MM/YY"
                                        maxlength="5"
                                        class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        :class="{
                                            'border-red-500 focus:ring-red-500 focus:border-red-500':
                                                errors.expiryDate,
                                            'border-gray-300':
                                                !errors.expiryDate,
                                        }"
                                    />
                                    <p
                                        v-if="errors.expiryDate"
                                        class="mt-1 text-sm text-red-600"
                                    >
                                        {{ errors.expiryDate }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="cvv"
                                        class="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        CVV
                                        <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="cvv"
                                        v-model="formData.cvv"
                                        @input="handleCvvInput"
                                        type="text"
                                        placeholder="123"
                                        maxlength="4"
                                        class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        :class="{
                                            'border-red-500 focus:ring-red-500 focus:border-red-500':
                                                errors.cvv,
                                            'border-gray-300': !errors.cvv,
                                        }"
                                    />
                                    <p
                                        v-if="errors.cvv"
                                        class="mt-1 text-sm text-red-600"
                                    >
                                        {{ errors.cvv }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Actions -->
                        <div class="flex gap-3 mt-6">
                            <button
                                type="button"
                                @click="handleBack"
                                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                @click="handleSubmit"
                                :disabled="isProcessing"
                                class="flex-1 px-4 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                            >
                                <span v-if="isProcessing">Processing...</span>
                                <span v-else>Pay Now</span>
                            </button>
                        </div>

                        <!-- Security Notice -->
                        <div
                            class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <span>Secure payment with SSL encryption</span>
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

interface PaymentFormData {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    cardType: string;
}

interface Props {
    modelValue: boolean;
    tour: Tour;
    isProcessing?: boolean;
}

interface Emits {
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", data: PaymentFormData): void;
    (e: "back"): void;
}

const props = withDefaults(defineProps<Props>(), {
    isProcessing: false,
});

const emit = defineEmits<Emits>();

// Form data
const formData = ref<PaymentFormData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
});

// Form errors
const errors = ref<Partial<Record<keyof PaymentFormData, string>>>({});

// Detect card type
const detectCardType = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, "");
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    return "";
};

// Format card number
const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
};

// Format expiry date
const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
        return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
};

// Handle card number input
const handleCardNumberInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, "").slice(0, 19);
    formData.value.cardNumber = formatCardNumber(value);
    formData.value.cardType = detectCardType(value);
};

// Handle expiry input
const handleExpiryInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, "").slice(0, 4);
    formData.value.expiryDate = formatExpiryDate(value);
};

// Handle CVV input
const handleCvvInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    formData.value.cvv = target.value.replace(/\D/g, "").slice(0, 4);
};

// Validate form
const validateForm = (): boolean => {
    errors.value = {};

    if (!formData.value.cardHolder.trim()) {
        errors.value.cardHolder = "Cardholder name is required";
    }

    const cleanCardNumber = formData.value.cardNumber.replace(/\s/g, "");
    if (!cleanCardNumber) {
        errors.value.cardNumber = "Card number is required";
    } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        errors.value.cardNumber = "Please enter a valid card number";
    }

    if (!formData.value.expiryDate) {
        errors.value.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.value.expiryDate)) {
        errors.value.expiryDate = "Invalid format (MM/YY)";
    }

    if (!formData.value.cvv) {
        errors.value.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.value.cvv)) {
        errors.value.cvv = "Invalid CVV";
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

// Handle back button
const handleBack = () => {
    emit("back");
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
                    cardNumber: "",
                    cardHolder: "",
                    expiryDate: "",
                    cvv: "",
                    cardType: "",
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
