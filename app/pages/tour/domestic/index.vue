<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700">
            <div class="absolute inset-0">
                <img
                    src="https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg"
                    alt="Domestic Tours"
                    class="w-full h-full object-cover opacity-40"
                />
            </div>
            <div
                class="relative h-full flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                        Domestic Tours
                    </h1>
                    <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                        Explore the beauty and culture of Laos with our
                        carefully curated domestic tour packages
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
            <!-- Filter Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <!-- Duration Filter -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Tour Type
                        </label>
                        <select
                            v-model="filters.tourType"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="">All type</option>
                            <option value="SOLO">Solo tour</option>
                            <option value="GROUP">Group tours</option>
                        </select>
                    </div>

                    <!-- Price Range Filter -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Price Range
                        </label>
                        <select
                            v-model="filters.priceRange"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="">All Prices</option>
                            <option value="0-200">Under $200</option>
                            <option value="200-500">$200 - $500</option>
                            <option value="500+">$500+</option>
                        </select>
                    </div>

                    <!-- Sort By -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Sort By
                        </label>
                        <select
                            v-model="sortBy"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="price-low">
                                Price: Low to High
                            </option>
                            <option value="price-high">
                                Price: High to Low
                            </option>
                            <option value="duration">Duration</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Tours Grid -->
            <div class="mb-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">
                        Available Tours ({{ filteredTours.length }})
                    </h2>
                </div>
            </div>

            <div>
                <TourPackage
                    :tours="paginatedTours"
                    @book-tour="bookTour"
                    @view-tour="viewTour"
                />
            </div>

            <!-- Pagination -->

            <Pagination
                class="my-8"
                v-model:currentPage="currentPage"
                :totalPages="totalPages"
                @pageChange="onPageChange"
            />

            <!-- Why Choose Our Domestic Tours -->
            <div class="mt-16 bg-white rounded-lg shadow-md p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Why Choose Our Domestic Tours?
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                        >
                            <svg
                                class="h-8 w-8 text-gray-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-md font-semibold text-gray-900 mb-2">
                            Expert Local Guides
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Our experienced guides know every corner of Laos and
                            share authentic local insights
                        </p>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                        >
                            <svg
                                class="h-8 w-8 text-gray-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-md font-semibold text-gray-900 mb-2">
                            Best Price Guarantee
                        </h3>
                        <p class="text-gray-600 text-sm">
                            We offer competitive prices and ensure you get the
                            best value for your money
                        </p>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                        >
                            <svg
                                class="h-8 w-8 text-gray-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-md font-semibold text-gray-900 mb-2">
                            Flexible Booking
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Easy booking process with flexible cancellation
                            policies for your peace of mind
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { TourPackage } from "#components";

definePageMeta({
    title: "Domestic Tours - ASASA Tour",
});

// Filter states
const filters = ref({
    tourType: "",
    priceRange: "",
});

const sortBy = ref("popular");
const currentPage = ref(1);
const itemsPerPage = 6;

// Tours data
const tours = ref([
    {
        id: 1,
        title: "Luang Prabang Heritage Tour",
        description:
            "Explore UNESCO World Heritage temples, traditional villages, and the famous Kuang Si Falls",
        location: "Luang Prabang",
        duration: "3 Days",
        price: 299,
        rating: 4.8,
        reviews: 124,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Hotel", "Meals", "Guide", "Transport"],
        badge: "Popular",
    },
    {
        id: 2,
        title: "Vientiane City Discovery",
        description:
            "Discover the capital city's temples, monuments, and vibrant local markets",
        location: "Vientiane",
        duration: "2 Days",
        price: 189,
        rating: 4.6,
        reviews: 89,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Hotel", "Breakfast", "Guide"],
        badge: null,
    },
    {
        id: 3,
        title: "Vang Vieng Adventure",
        description:
            "Experience kayaking, cave exploration, and stunning limestone karst landscapes",
        location: "Vang Vieng",
        duration: "4 Days",
        price: 349,
        rating: 4.9,
        reviews: 156,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Camping", "Activities", "Guide", "Equipment"],
        badge: "Adventure",
    },
    {
        id: 4,
        title: "Pakse & 4000 Islands",
        description:
            "Cruise the Mekong River and explore the beautiful Si Phan Don archipelago",
        location: "Pakse",
        duration: "5 Days",
        price: 449,
        rating: 4.7,
        reviews: 98,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Hotel", "All Meals", "Boat", "Guide"],
        badge: null,
    },
    {
        id: 5,
        title: "Plain of Jars Mystery Tour",
        description:
            "Uncover the mysteries of ancient megalithic jars scattered across the plateau",
        location: "Xieng Khouang",
        duration: "3 Days",
        price: 279,
        rating: 4.5,
        reviews: 67,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Hotel", "Meals", "Guide", "Entrance Fees"],
        badge: null,
    },
    {
        id: 6,
        title: "Savannakhet Cultural Experience",
        description:
            "Immerse yourself in French colonial architecture and local culture",
        location: "Savannakhet",
        duration: "2 Days",
        price: 169,
        rating: 4.4,
        reviews: 54,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Hotel", "Breakfast", "Guide"],
        badge: null,
    },
    {
        id: 7,
        title: "Northern Laos Trekking",
        description:
            "Trek through remote villages and experience authentic hill tribe culture",
        location: "Phongsaly",
        duration: "6 Days",
        price: 599,
        rating: 4.9,
        reviews: 87,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Homestay", "All Meals", "Guide", "Trekking Gear"],
        badge: "Adventure",
    },
    {
        id: 8,
        title: "Bolaven Plateau Coffee Tour",
        description:
            "Visit coffee plantations, waterfalls, and ethnic minority villages",
        location: "Pakse",
        duration: "3 Days",
        price: 329,
        rating: 4.7,
        reviews: 72,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Hotel", "Meals", "Guide", "Coffee Tasting"],
        badge: null,
    },
    {
        id: 9,
        title: "Mekong River Cruise",
        description:
            "Relaxing river cruise with stops at traditional villages and temples",
        location: "Luang Prabang",
        duration: "2 Days",
        price: 389,
        rating: 4.8,
        reviews: 112,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        features: ["Cruise", "All Meals", "Guide", "Activities"],
        badge: "Luxury",
    },
]);

// Computed properties
const filteredTours = computed(() => {
    let result = tours.value;

    // Filter by destination
    // if (filters.value.destination) {
    //     result = result.filter((tour) =>
    //         tour.location
    //             .toLowerCase()
    //             .includes(filters.value.destination.toLowerCase()),
    //     );
    // }

    // Filter by packagae type
    if (filters.value.tourType) {
        result = result.filter((tour) =>
            tour.title
                .toLowerCase()
                .includes(filters.value.tourType.toLowerCase()),
        );
    }

    // Filter by price range
    if (filters.value.priceRange) {
        result = result.filter((tour) => {
            if (filters.value.priceRange === "0-200") return tour.price < 200;
            if (filters.value.priceRange === "200-500")
                return tour.price >= 200 && tour.price <= 500;
            if (filters.value.priceRange === "500+") return tour.price > 500;
            return true;
        });
    }

    // Sort
    if (sortBy.value === "price-low") {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy.value === "price-high") {
        result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy.value === "duration") {
        result = [...result].sort(
            (a, b) => parseInt(a.duration) - parseInt(b.duration),
        );
    } else if (sortBy.value === "popular") {
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
});

const totalPages = computed(() => {
    return Math.ceil(filteredTours.value.length / itemsPerPage);
});

const paginatedTours = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTours.value.slice(start, end);
});

// Methods
const viewTour = (tour) => {
    console.log("View tour:", tour);
    navigateTo(`/tour/domestic/${tour.id}`);
};

const bookTour = () => {
    console.log("Book tour:");
    alert("Book tour");
    // navigateTo(`/booking/${tour.id}`);
};

// Watch for filter changes to reset page
watch(
    [filters, sortBy],
    () => {
        currentPage.value = 1;
    },
    { deep: true },
);
</script>
