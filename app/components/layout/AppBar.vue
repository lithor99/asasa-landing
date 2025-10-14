<template>
    <nav class="border-b border-gray-200 bg-white">
        <div class="mx-auto px-4 sm:px-8 lg:px-12">
            <div class="flex h-16 items-center justify-between">
                <!-- Left side -->
                <div class="flex items-center gap-8">
                    <NuxtLink to="/">
                        <NuxtImg
                            src="/logo.png"
                            alt="ASASA"
                            class="w-auto h-8 object-cover"
                        />
                    </NuxtLink>

                    <div class="hidden md:flex items-center gap-6">
                        <NuxtLink
                            to="/"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path === '/'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Home
                        </NuxtLink>

                        <NuxtLink
                            to="/tour/domestic"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/tour/domestic')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Domestic Tour
                        </NuxtLink>

                        <NuxtLink
                            to="/tour/international"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/tour/international')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            International Tour
                        </NuxtLink>

                        <NuxtLink
                            to="/hotel"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/hotel')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Hotel Booking
                        </NuxtLink>

                        <NuxtLink
                            to="/bus"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/bus')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Bus Booking
                        </NuxtLink>

                        <div class="relative">
                            <button
                                @click="toggleDropdown"
                                class="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                                :class="
                                    route.path.startsWith('/tourist-place')
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent'
                                "
                            >
                                Tourist Places
                                <svg
                                    class="h-4 w-4 transition-transform"
                                    :class="{ 'rotate-180': isDropdownOpen }"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div
                                v-if="isDropdownOpen"
                                class="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-2 z-50"
                            >
                                <NuxtLink
                                    to="/tourist-place"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="
                                        route.path === '/tourist-place'
                                            ? 'bg-gray-100 font-semibold'
                                            : ''
                                    "
                                    @click="closeDropdown"
                                >
                                    North
                                </NuxtLink>

                                <NuxtLink
                                    to="/tourist-place"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="
                                        route.path === '/tourist-place'
                                            ? 'bg-gray-100 font-semibold'
                                            : ''
                                    "
                                    @click="closeDropdown"
                                >
                                    Central
                                </NuxtLink>

                                <NuxtLink
                                    to="/tourist-place"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="
                                        route.path === '/tourist-place'
                                            ? 'bg-gray-100 font-semibold'
                                            : ''
                                    "
                                    @click="closeDropdown"
                                >
                                    South
                                </NuxtLink>
                            </div>
                        </div>

                        <NuxtLink
                            to="/news"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/news')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            News
                        </NuxtLink>
                    </div>
                </div>

                <!-- Search -->
                <div class="hidden md:flex flex-1 max-w-md mx-8">
                    <div class="relative w-full">
                        <input
                            type="text"
                            placeholder="Search"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm focus:border-gray-400 focus:outline-none focus:ring-0"
                        />
                        <svg
                            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                <!-- Language Selector -->
                <div class="relative">
                    <div
                        @click="toggleLanguageDropdown"
                        class="hover:cursor-pointer"
                    >
                        <Icon
                            :name="
                                currentLanguage === 'en'
                                    ? 'emojione:flag-for-united-kingdom'
                                    : 'emojione:flag-for-laos'
                            "
                            class="w-8 h-8"
                        />
                    </div>

                    <!-- Language Dropdown -->
                    <div
                        v-if="isLanguageDropdownOpen"
                        class="absolute top-full right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border border-gray-200 py-2 z-50"
                    >
                        <button
                            @click="changeLanguage('en')"
                            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            :class="{ 'bg-gray-100': currentLanguage === 'en' }"
                        >
                            <Icon
                                name="emojione:flag-for-united-kingdom"
                                class="w-6 h-6"
                            />
                            <span>English</span>
                        </button>

                        <button
                            @click="changeLanguage('lo')"
                            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            :class="{ 'bg-gray-100': currentLanguage === 'lo' }"
                        >
                            <Icon
                                name="emojione:flag-for-laos"
                                class="w-6 h-6"
                            />
                            <span>ລາວ (Lao)</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";

// Get current route
const route = useRoute();

// Dropdown state
const isDropdownOpen = ref(false);
const isLanguageDropdownOpen = ref(false);
const currentLanguage = ref("lo");

// Toggle dropdown
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown
const closeDropdown = () => {
    isDropdownOpen.value = false;
};

// Toggle language dropdown
const toggleLanguageDropdown = () => {
    isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

// Change language
const changeLanguage = (lang) => {
    currentLanguage.value = lang;
    isLanguageDropdownOpen.value = false;
    console.log("Language changed to:", lang);
};

// Close dropdowns when clicking outside
if (process.client) {
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".relative")) {
            isLanguageDropdownOpen.value = false;
            isDropdownOpen.value = false;
        }
    });
}
</script>
