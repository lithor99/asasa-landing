<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-80 bg-gradient-to-r from-gray-900 to-gray-700">
            <div class="absolute inset-0">
                <img
                    src="https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg"
                    alt="News & Updates"
                    class="w-full h-full object-cover opacity-30"
                />
            </div>
            <div
                class="relative h-full flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                        Travel News & Updates
                    </h1>
                    <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                        Stay informed with the latest tourism news, travel tips,
                        and destination updates
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
            <!-- Filter Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <!-- Search -->
                    <div class="md:col-span-2">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search news..."
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

                    <!-- Sort By -->
                    <div>
                        <select
                            v-model="sortBy"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="latest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Category Tabs -->
            <div class="mb-8">
                <div class="flex flex-wrap gap-3">
                    <button
                        @click="selectedCategory = ''"
                        :class="[
                            'px-5 py-2 rounded-full font-medium transition-colors',
                            selectedCategory === ''
                                ? 'bg-white text-gray-900 border border-2 border-gray-600'
                                : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-600 hover:text-gray-800',
                        ]"
                    >
                        All News
                    </button>
                    <button
                        v-for="cat in categories"
                        :key="cat.value"
                        @click="selectedCategory = cat.value"
                        :class="[
                            'px-5 py-2 rounded-full font-medium transition-colors',
                            selectedCategory === cat.value
                                ? 'bg-white text-gray-900 border border-2 border-gray-600'
                                : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-600 hover:text-gray-800',
                        ]"
                    >
                        {{ cat.label }}
                    </button>
                </div>
            </div>

            <!-- Results Count -->
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900">
                    {{ filteredNews.length }} Articles Found
                </h2>
            </div>

            <!-- News Grid -->

            <div>
                <News :articles="paginatedNews" @read-article="readNews" />
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
import { News } from "#components";

definePageMeta({
    title: "News & Updates - ASASA Tour",
});

// State
const searchQuery = ref("");
const selectedCategory = ref("");
const sortBy = ref("latest");
const currentPage = ref(1);
const itemsPerPage = 6;

// Categories
const categories = [
    { label: "Tourism", value: "tourism" },
    { label: "Culture", value: "culture" },
    { label: "Adventure", value: "adventure" },
    { label: "Hotels", value: "hotels" },
    { label: "Travel Tips", value: "travel-tips" },
    { label: "Events", value: "events" },
];

// News data
const newsArticles = ref([
    {
        id: 1,
        title: "New Heritage Trail Opens in Luang Prabang",
        excerpt:
            "A newly designed walking trail connects major UNESCO heritage sites, offering visitors an immersive cultural experience through the ancient city.",
        date: "Oct 8, 2025",
        readTime: 5,
        category: "tourism",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Michael Chen",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
        views: 1234,
        isNew: true,
    },
    {
        id: 2,
        title: "Traditional Baci Ceremony: A Complete Guide",
        excerpt:
            "Learn about the spiritual significance and proper etiquette of Laos' most important traditional ceremony for welcoming guests and blessing journeys.",
        date: "Oct 7, 2025",
        readTime: 6,
        category: "culture",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Lisa Wong",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
        views: 890,
        isNew: true,
    },
    {
        id: 3,
        title: "Rock Climbing Paradise: Vang Vieng's New Routes",
        excerpt:
            "Adventure seekers rejoice as Vang Vieng unveils 20 new climbing routes on its stunning limestone cliffs, ranging from beginner to advanced levels.",
        date: "Oct 6, 2025",
        readTime: 7,
        category: "adventure",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "David Miller",
            avatar: "https://i.pravatar.cc/150?img=4",
        },
        views: 1567,
        isNew: false,
    },
    {
        id: 4,
        title: "Luxury Resort Opens on Mekong Riverfront",
        excerpt:
            "A new five-star eco-resort combines luxury amenities with sustainable practices, offering breathtaking river views and authentic local experiences.",
        date: "Oct 5, 2025",
        readTime: 5,
        category: "hotels",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Emma Davis",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
        views: 2103,
        isNew: false,
    },
    {
        id: 5,
        title: "10 Essential Phrases for Traveling in Laos",
        excerpt:
            "Master these basic Lao phrases to connect with locals, navigate markets, and enhance your travel experience in this friendly Southeast Asian nation.",
        date: "Oct 4, 2025",
        readTime: 4,
        category: "travel-tips",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "James Wilson",
            avatar: "https://i.pravatar.cc/150?img=6",
        },
        views: 3421,
        isNew: false,
    },
    {
        id: 6,
        title: "Boun That Luang Festival Returns in November",
        excerpt:
            "The country's most important Buddhist festival will feature traditional ceremonies, parades, and cultural performances at the iconic golden stupa.",
        date: "Oct 3, 2025",
        readTime: 6,
        category: "events",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Sophia Lee",
            avatar: "https://i.pravatar.cc/150?img=7",
        },
        views: 1789,
        isNew: false,
    },
    {
        id: 7,
        title: "Exploring Bolaven Plateau's Coffee Culture",
        excerpt:
            "Discover how this highland region produces some of Southeast Asia's finest coffee and learn about the sustainable farming practices of local communities.",
        date: "Oct 2, 2025",
        readTime: 8,
        category: "culture",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Robert Brown",
            avatar: "https://i.pravatar.cc/150?img=8",
        },
        views: 1456,
        isNew: false,
    },
    {
        id: 8,
        title: "Kayaking the Nam Ou River: Adventure Guide",
        excerpt:
            "Navigate one of Laos' most scenic rivers through remote villages, caves, and dramatic limestone karst landscapes on this multi-day adventure.",
        date: "Oct 1, 2025",
        readTime: 7,
        category: "adventure",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Jennifer Taylor",
            avatar: "https://i.pravatar.cc/150?img=9",
        },
        views: 2234,
        isNew: false,
    },
    {
        id: 9,
        title: "Budget Backpacker's Guide to Laos",
        excerpt:
            "Travel Laos on a shoestring budget with these insider tips on affordable accommodation, cheap eats, and free or low-cost activities.",
        date: "Sep 30, 2025",
        readTime: 9,
        category: "travel-tips",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Alex Martinez",
            avatar: "https://i.pravatar.cc/150?img=10",
        },
        views: 4567,
        isNew: false,
    },
    {
        id: 10,
        title: "New Flights Connect Bangkok to Pakse",
        excerpt:
            "Increased air connectivity makes southern Laos more accessible with three new weekly direct flights launching next month.",
        date: "Sep 29, 2025",
        readTime: 4,
        category: "tourism",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Rachel Green",
            avatar: "https://i.pravatar.cc/150?img=11",
        },
        views: 1890,
        isNew: false,
    },
    {
        id: 11,
        title: "Boutique Hotels Leading Sustainable Tourism",
        excerpt:
            "Small-scale accommodations across Laos are setting new standards for eco-friendly practices and community-based tourism development.",
        date: "Sep 28, 2025",
        readTime: 6,
        category: "hotels",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Kevin Anderson",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        views: 1234,
        isNew: false,
    },
    {
        id: 12,
        title: "Elephant Conservation: Ethical Tourism Guide",
        excerpt:
            "Learn how to visit elephants responsibly in Laos and support sanctuaries that prioritize animal welfare and conservation over entertainment.",
        date: "Sep 27, 2025",
        readTime: 7,
        category: "tourism",
        image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
        author: {
            name: "Maria Garcia",
            avatar: "https://i.pravatar.cc/150?img=13",
        },
        views: 2876,
        isNew: false,
    },
]);

// Computed properties
const filteredNews = computed(() => {
    let result = newsArticles.value;

    // Filter by category
    if (selectedCategory.value) {
        result = result.filter(
            (article) => article.category === selectedCategory.value,
        );
    }

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (article) =>
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query),
        );
    }

    // Sort
    if (sortBy.value === "latest") {
        result = [...result].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
        );
    } else if (sortBy.value === "oldest") {
        result = [...result].sort(
            (a, b) => new Date(a.date) - new Date(b.date),
        );
    } else if (sortBy.value === "popular") {
        result = [...result].sort((a, b) => b.views - a.views);
    }

    return result;
});

const totalPages = computed(() => {
    return Math.ceil(filteredNews.value.length / itemsPerPage);
});

const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredNews.value.slice(start, end);
});

// Methods
const readNews = (article) => {
    navigateTo(`/news/${article.id}`);
};

// Watch for filter changes to reset page
watch([searchQuery, selectedCategory, sortBy], () => {
    currentPage.value = 1;
});
</script>
