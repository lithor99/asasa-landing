<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section with Image -->
        <div class="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <img
                :src="place.image"
                :alt="place.name"
                class="w-full h-full object-cover"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            ></div>

            <!-- Title & Info Overlay -->
            <div
                class="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
            >
                <div class="flex items-start justify-between flex-wrap gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            <span
                                class="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full capitalize"
                            >
                                {{ place.category }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {{ place.name }}
                </h2>
                <div class="flex items-center gap-2 text-md text-gray-500 mb-3">
                    <Icon name="gis:location-poi" class="w-6 h-6" />
                    <span>{{ place.location }}</span>
                </div>
                <p class="text-gray-700 text-lg leading-relaxed">
                    {{ place.description }}
                </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Description Section -->

                    <!-- Image Gallery (if images exist) -->
                    <div
                        v-if="place.images && place.images.length > 0"
                        class="bg-white rounded-xl shadow-md p-6 md:p-8"
                    >
                        <h2
                            class="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
                        >
                            Photo Gallery
                        </h2>

                        <!-- Masonry Grid Layout -->
                        <div
                            class="grid grid-cols-12 gap-2 transition-all duration-300"
                            :class="
                                showAllImages
                                    ? 'h-auto'
                                    : 'max-h-[500px] overflow-hidden'
                            "
                        >
                            <div
                                v-for="(image, index) in place.images"
                                :key="index"
                                v-show="showAllImages || index < 6"
                                :class="getImageClass(index)"
                                class="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                @click="openGallery(index)"
                            >
                                <img
                                    :src="image"
                                    :alt="`${place.name} - Photo ${index + 1}`"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <!-- Show More Button (if more than 6 images) -->
                        <div
                            v-if="place.images.length > 6"
                            class="mt-6 flex justify-center"
                        >
                            <div
                                @click="showAllImages = !showAllImages"
                                class="w-auto px-6 py-3 underline direction-1 hover:text-gray-800 hover:cursor-pointer hover:scale-110 text-gray-600 font-medium rounded-lg transition-colors"
                            >
                                {{ showAllImages ? "Show Less" : `Show All ` }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="lg:col-span-1">
                    <div class="sticky top-6 space-y-6">
                        <!-- Quick Info Card -->
                        <div class="bg-white rounded-xl shadow-md p-6">
                            <h3
                                class="text-xl font-bold text-gray-900 mb-4 pb-4 border-b"
                            >
                                Quick Info
                            </h3>
                            <div class="space-y-4">
                                <div class="flex items-start gap-3">
                                    <svg
                                        class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                        />
                                    </svg>
                                    <div>
                                        <p class="text-sm text-gray-500">
                                            Category
                                        </p>
                                        <p
                                            class="font-semibold text-gray-900 capitalize"
                                        >
                                            {{ place.category }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-start gap-3">
                                    <svg
                                        class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p class="text-sm text-gray-500">
                                            Region
                                        </p>
                                        <p
                                            class="font-semibold text-gray-900 capitalize"
                                        >
                                            {{ place.region }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-start gap-3">
                                    <svg
                                        class="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p class="text-sm text-gray-500">
                                            Review
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ place.review }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Share Card -->
                        <div class="bg-white rounded-xl shadow-md p-6">
                            <h3
                                class="text-xl font-bold text-gray-900 mb-4 pb-4 border-b"
                            >
                                Contact
                            </h3>
                            <div class="flex gap-3">
                                <button
                                    class="flex-1 item-center p-1 border border-0 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="Call"
                                >
                                    <Icon
                                        name="marketeq:phone"
                                        class="w-8 h-8"
                                    />
                                </button>
                                <button
                                    class="flex-1 p-1 border border-0 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="WhatSapp"
                                >
                                    <Icon
                                        name="logos:whatsapp-icon"
                                        class="w-8 h-8"
                                    />
                                </button>
                                <button
                                    class="flex-1 p-1 border border-0 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                                    title="SFacebook"
                                >
                                    <Icon
                                        name="logos:facebook"
                                        class="w-8 h-8"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Place {
    id: number;
    name: string;
    description: string;
    location: string;
    region: string;
    category: string;
    review: number;
    image: string;
    images?: string[];
    highlights: string[];
}

// Sample data - replace with API call or props
const place = ref<Place>({
    id: 8,
    name: "Tham Kong Lo Cave",
    description:
        "Massive 7km long river cave that can be explored by boat. This stunning natural wonder features impressive limestone formations, underground rivers, and breathtaking chambers. The journey through the cave is an unforgettable adventure, taking you deep into the heart of the karst landscape. Visitors can experience the unique ecosystem and geological formations that have been formed over millions of years.",
    location: "Khammouane",
    region: "central",
    category: "adventure",
    review: 2000,
    image: "https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg",
    images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    ],
    highlights: ["Cave", "Boat Tour", "Adventure", "Natural Wonder"],
});

const showAllImages = ref(false);

// Gallery function (can be implemented with a lightbox)
const openGallery = (index: number) => {
    console.log("Open gallery at index:", index);
    // Implement lightbox/modal gallery here
};

// Get dynamic image classes based on position
const getImageClass = (index: number): string => {
    const pattern = index % 8;

    switch (pattern) {
        case 0:
            return "col-span-12 md:col-span-6 h-40 md:h-48";
        case 1:
            return "col-span-12 md:col-span-6 h-40 md:h-48";
        case 2:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 3:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 4:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 5:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 6:
            return "col-span-12 md:col-span-8 h-40 md:h-48";
        case 7:
            return "col-span-12 md:col-span-4 h-40 md:h-48";
        default:
            return "col-span-6 md:col-span-4 h-32 md:h-40";
    }
};

// You can fetch data from API like this:
// const route = useRoute();
// const { data: place } = await useFetch(`/api/places/${route.params.id}`);
</script>

<style scoped>
/* Add any custom styles here */
</style>
