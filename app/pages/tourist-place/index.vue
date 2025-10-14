<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700">
            <div class="absolute inset-0">
                <img
                    src="https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg"
                    alt="Tourist Places"
                    class="w-full h-full object-cover opacity-30"
                />
            </div>
            <div
                class="relative h-full flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                        Discover Amazing Places
                    </h1>
                    <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                        Explore breathtaking destinations across Laos - from
                        ancient temples to stunning natural wonders
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
            <!-- Region Tabs -->
            <div class="mb-8">
                <div class="border-b border-gray-200">
                    <nav class="flex justify-center gap-8">
                        <button
                            @click="selectedRegion = 'all'"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === 'all'
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            All Places
                        </button>
                        <button
                            @click="selectedRegion = 'north'"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === 'north'
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Northern Laos
                        </button>
                        <button
                            @click="selectedRegion = 'central'"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === 'central'
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Central Laos
                        </button>
                        <button
                            @click="selectedRegion = 'south'"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === 'south'
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Southern Laos
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Filter & Search Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Search -->
                    <div class="md:col-span-2">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search places..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
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

                    <!-- Category Filter -->
                    <div>
                        <select
                            v-model="selectedCategory"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="">All Categories</option>
                            <option value="temple">Temples</option>
                            <option value="nature">Nature</option>
                            <option value="waterfall">Waterfalls</option>
                            <option value="cultural">Cultural Sites</option>
                            <option value="adventure">Adventure</option>
                        </select>
                    </div>

                    <!-- Sort By -->
                    <div>
                        <select
                            v-model="sortBy"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Results Count -->
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900">
                    {{ filteredPlaces.length }} Places Found
                </h2>
            </div>

            <!-- Places Grid -->

            <div>
                <TouristPlace
                    :places="paginatedPlaces"
                    @view-place-details="viewPlaceDetails"
                />
            </div>

            <!-- Pagination -->
            <Pagination
                class="my-8"
                v-model:currentPage="currentPage"
                :totalPages="totalPages"
                @pageChange="onPageChange"
            />
        </main>
    </div>
</template>

<script setup>
import { TouristPlace } from "#components";

definePageMeta({
    title: "Tourist Places - ASASA Tour",
});

// State
const selectedRegion = ref("all");
const searchQuery = ref("");
const selectedCategory = ref("");
const sortBy = ref("rating");
const currentPage = ref(1);
const itemsPerPage = 6;

// Places data
const places = ref([
    {
        id: 1,
        name: "Kuang Si Waterfalls",
        description:
            "Stunning turquoise cascading waterfalls surrounded by lush jungle, perfect for swimming and photography",
        location: "Luang Prabang",
        region: "north",
        category: "waterfall",
        rating: 4.9,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Swimming", "Hiking", "Photography"],
    },
    {
        id: 2,
        name: "Wat Xieng Thong",
        description:
            "Ancient Buddhist temple with exquisite architecture and historical significance",
        location: "Luang Prabang",
        region: "north",
        category: "temple",
        rating: 4.8,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["UNESCO Site", "Architecture", "History"],
    },
    {
        id: 3,
        name: "Pha That Luang",
        description:
            "Golden stupa and national symbol of Laos, a must-visit landmark in Vientiane",
        location: "Vientiane",
        region: "central",
        category: "cultural",
        rating: 4.7,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Iconic", "Religious", "Photography"],
    },
    {
        id: 4,
        name: "Blue Lagoon",
        description:
            "Crystal clear natural pool perfect for swimming and cliff jumping in stunning surroundings",
        location: "Vang Vieng",
        region: "central",
        category: "nature",
        rating: 4.6,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Swimming", "Adventure", "Nature"],
    },
    {
        id: 5,
        name: "Bolaven Plateau",
        description:
            "Highland region known for coffee plantations, waterfalls, and cool climate",
        location: "Pakse",
        region: "south",
        category: "nature",
        rating: 4.8,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Coffee", "Waterfalls", "Trekking"],
    },
    {
        id: 6,
        name: "Si Phan Don (4000 Islands)",
        description:
            "Peaceful river archipelago with laid-back atmosphere and rare Irrawaddy dolphins",
        location: "Champasak",
        region: "south",
        category: "nature",
        rating: 4.9,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Dolphins", "Islands", "Relaxation"],
    },
    {
        id: 7,
        name: "Plain of Jars",
        description:
            "Mysterious ancient megalithic stone jars scattered across the landscape",
        location: "Xieng Khouang",
        region: "north",
        category: "cultural",
        rating: 4.7,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["UNESCO Site", "Mystery", "History"],
    },
    {
        id: 8,
        name: "Tham Kong Lo Cave",
        description: "Massive 7km long river cave that can be explored by boat",
        location: "Khammouane",
        region: "central",
        category: "adventure",
        rating: 4.8,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Cave", "Boat Tour", "Adventure"],
    },
    {
        id: 9,
        name: "Mount Phousi",
        description:
            "Sacred hill offering panoramic views of Luang Prabang and surrounding mountains",
        location: "Luang Prabang",
        region: "north",
        category: "nature",
        rating: 4.6,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Sunset", "Views", "Temple"],
    },
    {
        id: 10,
        name: "Patuxai Monument",
        description:
            "Victory monument resembling the Arc de Triomphe with observation deck",
        location: "Vientiane",
        region: "central",
        category: "cultural",
        rating: 4.5,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Monument", "Views", "Architecture"],
    },
    {
        id: 11,
        name: "Tad Fane Waterfall",
        description: "Twin waterfalls plunging dramatically into a deep gorge",
        location: "Champasak",
        region: "south",
        category: "waterfall",
        rating: 4.7,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Waterfall", "Viewpoint", "Nature"],
    },
    {
        id: 12,
        name: "Buddha Park (Xieng Khuan)",
        description:
            "Sculpture park featuring over 200 Hindu and Buddhist statues",
        location: "Vientiane",
        region: "central",
        category: "cultural",
        rating: 4.6,
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        highlights: ["Sculptures", "Unique", "Photography"],
    },
]);

// Computed properties
const filteredPlaces = computed(() => {
    let result = places.value;

    // Filter by region
    if (selectedRegion.value !== "all") {
        result = result.filter(
            (place) => place.region === selectedRegion.value,
        );
    }

    // Filter by category
    if (selectedCategory.value) {
        result = result.filter(
            (place) => place.category === selectedCategory.value,
        );
    }

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (place) =>
                place.name.toLowerCase().includes(query) ||
                place.description.toLowerCase().includes(query) ||
                place.location.toLowerCase().includes(query),
        );
    }

    // Sort
    if (sortBy.value === "rating") {
        result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy.value === "name") {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy.value === "popular") {
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
});

const totalPages = computed(() => {
    return Math.ceil(filteredPlaces.value.length / itemsPerPage);
});

const paginatedPlaces = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredPlaces.value.slice(start, end);
});

// Methods
const viewPlaceDetails = (place) => {
    navigateTo(`/tourist-place/${place.id}`);
};

// Watch for filter changes to reset page
watch([selectedRegion, searchQuery, selectedCategory, sortBy], () => {
    currentPage.value = 1;
});
</script>
