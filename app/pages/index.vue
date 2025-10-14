<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Dialog Overlay -->
        <div
            v-if="showDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            @click.self="showDialog = false"
        >
            <div class="bg-white rounded-lg max-w-md w-full p-6 relative">
                <!-- Close Button -->
                <button
                    @click="showDialog = false"
                    class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        class="h-6 w-6"
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

                <!-- Dialog Content -->
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    Follow ASASA Tour
                </h2>

                <div>
                    <!-- Profile Image Upload -->
                    <div class="mb-6 flex flex-col items-center">
                        <div class="relative">
                            <div
                                class="h-24 w-24 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300"
                            >
                                <img
                                    v-if="previewUrl"
                                    :src="previewUrl"
                                    alt="Profile preview"
                                    class="h-full w-full object-cover"
                                />
                                <div
                                    v-else
                                    class="h-full w-full flex items-center justify-center text-gray-400"
                                >
                                    <svg
                                        class="h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <label
                                class="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-2 cursor-pointer hover:bg-gray-700"
                            >
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
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="handleImageUpload"
                                    class="hidden"
                                />
                            </label>
                        </div>
                        <p class="text-sm text-gray-500 mt-2">Upload profile</p>
                    </div>

                    <!-- Full Name -->
                    <div class="mb-4">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Full Name *
                        </label>
                        <input
                            v-model="formData.fullName"
                            type="text"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <!-- Email -->
                    <div class="mb-4">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email *
                        </label>
                        <input
                            v-model="formData.email"
                            type="email"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <!-- Phone Number -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            v-model="formData.phone"
                            type="tel"
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <!-- Submit Button -->
                    <button
                        @click="handleSubmit"
                        class="w-full bg-gray-900 text-white rounded-lg px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
                    >
                        Submit & Follow
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="mx-auto px-4 sm:px-8 lg:px-12 py-12">
            <!-- Follow Section -->
            <div class="mb-8 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <button
                        @click="showDialog = true"
                        class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Follow
                    </button>
                    <div
                        v-if="followerStore.pagination.count > 0"
                        class="flex items-center gap-2"
                    >
                        <div class="flex -space-x-2">
                            <div
                                v-for="value in followerStore.pagination.rows"
                                :key="value.id"
                            >
                                <div
                                    class="h-8 w-8 rounded-full bg-gray-800 border-2 border-white rounded-full overflow-hidden"
                                >
                                    <NuxtImg
                                        :src="`${CDN()}${value.profile}`"
                                        alt="Follower"
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <span
                            v-if="followerStore.pagination.count > 5"
                            class="text-sm text-gray-600"
                        >
                            <span class="font-semibold"
                                >+{{ followerStore.pagination.count - 5 }}</span
                            >
                            <span
                                v-if="followerStore.pagination.count == 6"
                                class="ml-1"
                                >follower</span
                            >
                            <span v-else class="ml-1">followers</span>
                        </span>
                    </div>
                </div>
                <button class="text-gray-500 hover:text-gray-700">
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                    </svg>
                </button>
            </div>

            <!-- Curated By -->
            <div class="mb-10 flex items-center justify-center gap-3">
                <span class="text-md text-gray-600">Power by</span>
                <div class="flex items-center gap-2">
                    <div
                        class="flex items-center justify-center w-8 h-8 rounded-full border border-gray-500 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                        <NuxtImg
                            src="/logo_circle.png"
                            alt="ASASA"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <span class="text-xl font-semibold text-gray-900">
                        Asasa Tour co.,ltd
                    </span>
                </div>
            </div>

            <!-- Hero Title -->
            <div class="text-center mb-6">
                <h1
                    class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight"
                >
                    WELCOME TO<br />ASASA TOUR SERVICE
                </h1>
            </div>

            <!-- check tour -->
            <div class="flex justify-center w-full mt-8">
                <div class="relative w-full max-w-xl mx-8">
                    <div class="py-2 text-xl">Check Tour</div>
                    <div class="relative w-full">
                        <input
                            type="text"
                            placeholder="Input Tour ID"
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-1 py-4 pl-5 pr-10 text-xl focus:border-gray-400 focus:outline-none focus:ring-0"
                        />
                        <div @click="checkTour">
                            <Icon
                                name="carbon:next-filled"
                                class="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-600 hover:cursor-pointer hover:text-gray-800"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tour Package Section -->
            <div class="mt-16 max-w-6xl mx-auto">
                <div class="flex justify-between items-center">
                    <h2
                        class="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        Tour Packages
                    </h2>
                    <NuxtLink
                        to="/tour/domestic"
                        class="underline decoration-1 text-gray-600 hover:text-gray-900 hover:scale-110"
                    >
                        See more
                    </NuxtLink>
                </div>
                <div>
                    <div v-if="tourPackageLoading">
                        <LoadingCard :item="tourPackageItemsPerPage" />
                    </div>
                    <div
                        v-if="
                            !tourPackageLoading &&
                            tourPackageStore?.pagination?.count < 1
                        "
                    >
                        <EmptyCard @refresh="handleTourPackageRefresh" />
                    </div>
                    <div
                        v-if="
                            !tourPackageLoading &&
                            tourPackageStore?.pagination?.count > 0
                        "
                    >
                        <TourPackage
                            :tours="tourPackageStore?.pagination?.rows"
                        />
                    </div>
                </div>
                <!-- Tour Pagination -->

                <Pagination
                    class="my-8"
                    v-model:currentPage="tourPackageCurrentPage"
                    :totalPages="tourPackageTotalPages"
                    @pageChange="handleTourPageChange"
                />
            </div>

            <!-- Tour Places Section -->
            <div class="mt-24 max-w-6xl mx-auto">
                <div class="flex justify-between items-center">
                    <h2
                        class="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        Popular Tour Places
                    </h2>
                    <NuxtLink
                        to="/tourist-places"
                        class="underline decoration-1 text-gray-600 hover:text-gray-900 hover:scale-110"
                    >
                        See more
                    </NuxtLink>
                </div>
                <div>
                    <div v-if="tourPlaceLoading">
                        <LoadingCard :item="tourPlaceItemsPerPage" />
                    </div>
                    <div
                        v-if="
                            !tourPlaceLoading &&
                            tourPlaceStore?.pagination?.count < 1
                        "
                    >
                        <EmptyCard @refresh="handleTourPlaceRefresh" />
                    </div>
                    <div
                        v-if="
                            !tourPlaceLoading &&
                            tourPlaceStore?.pagination?.count > 0
                        "
                    >
                        <TourPlace :places="tourPlaceStore?.pagination?.rows" />
                    </div>
                </div>

                <!-- Places Pagination -->

                <Pagination
                    class="my-8"
                    v-model:currentPage="placeCurrentPage"
                    :totalPages="tourPlaceTotalPages"
                    @pageChange="handlePlacePageChange"
                />
            </div>

            <!-- News Section -->
            <div class="mt-24 max-w-6xl mx-auto mb-16">
                <div class="flex justify-between">
                    <h2
                        class="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        Latest News & Updates
                    </h2>
                    <NuxtLink
                        to="/news"
                        class="underline decoration-1 text-gray-600 hover:text-gray-900 hover:scale-110"
                    >
                        See more
                    </NuxtLink>
                </div>

                <div>
                    <News :articles="paginatedNews" @read-article="readNews" />
                </div>

                <!-- Pagination -->
                <Pagination
                    class="my-8"
                    v-model:currentPage="newsCurrentPage"
                    :totalPages="newsTotalPages"
                    @pageChange="onPageChange"
                />

                <!-- Contact Section -->

                <div class="w-full border-t border-gray-300 mt-10"></div>

                <div class="mt-8 max-w-6xl mx-auto mb-8">
                    <h3
                        class="text-xl font-bold text-center text-gray-900 mb-6"
                    >
                        Need More Information?
                    </h3>

                    <div
                        class="flex flex-wrap justify-center gap-4 text-gray-500 text-md"
                    >
                        <NuxtLink
                            to="/privacy-policy"
                            class="underline decoration-1 mx-4 hover:text-gray-800 hover:scale-110 transition-transform duration-300 inline-block"
                        >
                            Privacy Policy
                        </NuxtLink>
                        <NuxtLink
                            to="/about"
                            class="underline decoration-1 mx-4 hover:text-gray-800 hover:scale-110 transition-transform duration-300 inline-block"
                        >
                            About Us
                        </NuxtLink>

                        <NuxtLink
                            to="/contact"
                            class="underline decoration-1 mx-4 hover:text-gray-800 hover:scale-110 transition-transform duration-300 inline-block"
                        >
                            Contact Us
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { TourPackage } from "#components";
import {
    type TourPackageModel,
    type TourPackagePaginationModel,
} from "~/models/tourPackage";
import { useTourPlaceStore } from "~/stores/tourPlace";

const { setQueryServerSide, isQueryServerSide } = useMainStore();
const tourPackageStore = useTourPackageStore();
const tourPlaceStore = useTourPlaceStore();
const newsStore = useNewsStore();
const followerStore = useFollowerStore();

const tourPackageLoading = ref(false);
const tourPlaceLoading = ref(false);
const newsLoading = ref(false);

const showDialog = ref(false);
const previewUrl = ref(null);

const tourPackageCurrentPage = ref(1);
const tourPackageItemsPerPage = ref(3);

const tourPlaceCurrentPage = ref(1);
const tourPlaceItemsPerPage = ref(3);

const newsCurrentPage = ref(1);
const newsItemsPerPage = ref(3);

// Detect screen size and set items per page
const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 806) {
        // sm - Mobile (Tailwind sm breakpoint)
        tourPackageItemsPerPage.value = 1;
        tourPlaceItemsPerPage.value = 1;
        newsItemsPerPage.value = 1;
    } else if (width >= 806 && width < 1024) {
        // md - Tablet (Tailwind md breakpoint)
        tourPackageItemsPerPage.value = 2;
        tourPlaceItemsPerPage.value = 2;
        newsItemsPerPage.value = 2;
    } else {
        // lg and above - Desktop
        tourPackageItemsPerPage.value = 3;
        tourPlaceItemsPerPage.value = 3;
        newsItemsPerPage.value = 3;
    }

    // Update filters with new items per page
    tourPackageFilters.value.limit = tourPackageItemsPerPage.value;
    tourPlaceFilters.value.limit = tourPlaceItemsPerPage.value;
    newsFilters.value.limit = newsItemsPerPage.value;
};

const formData = ref({
    fullName: "",
    email: "",
    phone: "",
    profileImage: null,
});

const tourPackageFilters: any = ref({
    page: tourPackageCurrentPage.value,
    limit: tourPackageItemsPerPage.value,
    sortBy: "createdAt",
    order: "DESC",
});

const tourPlaceFilters: any = ref({
    page: tourPlaceCurrentPage.value,
    limit: tourPlaceItemsPerPage.value,
    sortBy: "createdAt",
    order: "DESC",
});

const newsFilters: any = ref({
    page: newsCurrentPage.value,
    limit: newsItemsPerPage.value,
    sortBy: "createdAt",
    order: "DESC",
});

const followerFillters: any = ref();

/**
 *  onMounted
 */
onMounted(async () => {
    // Set items per page based on screen size
    updateItemsPerPage();

    // Add resize listener
    window.addEventListener("resize", updateItemsPerPage);

    if (!isQueryServerSide) {
        tourPackageLoading.value = true;
        tourPlaceLoading.value = true;
        newsLoading.value = true;

        await tourPackageStore.setPagination(tourPackageFilters.value);
        await tourPlaceStore.setPagination(tourPlaceFilters.value);
        await newsStore.setPagination(newsFilters.value);
        await followerStore.setPagination({
            ...followerFillters.value,
            page: 1,
            limit: 5,
        });

        tourPackageLoading.value = false;
        tourPlaceLoading.value = false;
        newsLoading.value = false;
    }
    await setQueryServerSide(false);
});

// Cleanup resize listener
onUnmounted(() => {
    window.removeEventListener("resize", updateItemsPerPage);
});

if (import.meta.server) {
    tourPackageLoading.value = true;
    tourPlaceLoading.value = true;
    newsLoading.value = true;

    tourPackageStore.setPagination(tourPackageFilters.value);
    tourPlaceStore.setPagination(tourPlaceFilters.value);
    newsStore.setPagination(newsFilters.value);
    followerStore.setPagination({
        ...followerFillters.value,
        page: 1,
        limit: 5,
    });

    tourPackageLoading.value = false;
    tourPlaceLoading.value = false;
    newsLoading.value = false;
}

const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
        formData.value.profileImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const handleSubmit = () => {
    if (
        !formData.value.fullName ||
        !formData.value.email ||
        !formData.value.phone
    ) {
        alert("Please fill in all required fields");
        return;
    }

    console.log("Form submitted:", formData.value);
    alert("Successfully followed!");

    showDialog.value = false;
    formData.value = {
        fullName: "",
        email: "",
        phone: "",
        profileImage: null,
    };
    previewUrl.value = null;
};

// Tour Places Data
const tourPlaces = ref([
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

// News Data
const newsList = ref([
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

/*
 * Computed properties for pagination
 */

// Tour Packages Total Pages
const tourPackageTotalPages = computed(() => {
    return Math.ceil(
        tourPackageStore.pagination.count / tourPackageItemsPerPage.value,
    );
});

// Tour Places Total Pages
const tourPlaceTotalPages = computed(() => {
    return Math.ceil(
        tourPlaceStore.pagination.count / tourPlaceItemsPerPage.value,
    );
});

// News Total Pages
const newsTotalPages = computed(() => {
    return Math.ceil(newsStore.pagination.count / newsItemsPerPage.value);
});

/*
 * Pagination handlers
 */

// Tour Packages Pagination Handler
const handleTourPageChange = async (page: number) => {
    tourPackageLoading.value = true;
    tourPackageCurrentPage.value = page;
    tourPackageFilters.value.page = page;
    setTimeout(async () => {
        await tourPackageStore.setPagination(tourPackageFilters.value);
        tourPackageLoading.value = false;
    }, 5000);
};

// Tour Places Pagination Handler
const handlePlacePageChange = async (page: number) => {
    tourPlaceLoading.value = true;
    tourPlaceCurrentPage.value = page;
    tourPlaceFilters.value.page = page;
    setTimeout(async () => {
        await tourPlaceStore.setPagination(tourPlaceFilters.value);
        tourPlaceLoading.value = false;
    }, 5000);
};

// News Pagination Handler
const handleNewsPageChange = async (page: number) => {
    newsLoading.value = true;
    newsCurrentPage.value = page;
    newsFilters.value.page = page;
    setTimeout(async () => {
        await newsStore.setPagination(newsFilters.value);
        newsLoading.value = false;
    }, 5000);
};

/*
 * Pagination handlers
 */

// Tour package refresh handler
const handleTourPackageRefresh = async () => {
    tourPackageLoading.value = true;
    tourPackageCurrentPage.value = 1;
    tourPackageFilters.value.page = 1;
    await tourPackageStore.setPagination(tourPackageFilters.value);
    tourPackageLoading.value = false;
};

// Tour place refresh handler
const handleTourPlaceRefresh = async () => {
    tourPlaceLoading.value = true;
    tourPlaceCurrentPage.value = 1;
    tourPlaceFilters.value.page = 1;
    await tourPlaceStore.setPagination(tourPlaceFilters.value);
    tourPlaceLoading.value = false;
};

// News refresh handler
const handleNewsRefresh = async () => {
    newsLoading.value = true;
    newsCurrentPage.value = 1;
    newsFilters.value.page = 1;
    await newsStore.setPagination(newsFilters.value);
    newsLoading.value = false;
};

const checkTour = (article) => {
    console.log("Check tour:");
    alert("Check tour");
    // navigateTo(`/news/${article.id}`);
};

const viewTour = (tour) => {
    console.log("View tour:", tour);
    navigateTo(`/tour/domestic/${tour.id}`);
};

const bookTour = () => {
    console.log("Book tour clicked!");
    alert("Booking tour...");
};

const viewPlaceDetails = (place) => {
    navigateTo(`/tourist-place/${place.id}`);
};

const readNews = (article) => {
    navigateTo(`/news/${article.id}`);
};
</script>
