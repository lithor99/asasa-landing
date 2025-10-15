<template>
    <div class="min-h-screen bg-gray-50 pt-4 pb-12">
        <!-- Breadcrumb -->
        <Breadcrumb :items="breadcrumbItems" />
        <!-- Hero Section with Image -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative group">
                <img
                    :src="`${CDN()}${tourPlaceStore?.tourPlace?.image}`"
                    :alt="tourPlaceStore?.tourPlace?.name?.lo"
                    class="w-full object-cover rounded-lg shadow-md"
                    :style="{ height: '70vh' }"
                />

                <!-- Overlay - no container classes -->
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"
                >
                    <!-- Content with container classes if needed -->
                    <div class="h-full flex items-end mx-6 py-4">
                        <h1 class="text-white text-4xl font-bold">
                            {{ tourPlaceStore?.tourPlace?.name?.lo }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                <!-- <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {{ tourPlaceStore?.tourPlace?.name?.lo }}
                </h2> -->
                <div class="flex items-center gap-2 text-md text-gray-500 mb-3">
                    <Icon name="gis:location-poi" class="w-6 h-6" />
                    <span>{{ tourPlaceStore?.tourPlace?.address?.lo }}</span>
                </div>
                <p class="text-gray-700 text-lg leading-relaxed">
                    {{ tourPlaceStore?.tourPlace?.detail?.lo }}
                </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Image Gallery -->
                    <div
                        v-if="
                            tourPlaceStore?.tourPlace?.images &&
                            tourPlaceStore?.tourPlace?.images.length > 0
                        "
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
                                v-for="(image, index) in tourPlaceStore
                                    ?.tourPlace?.images"
                                :key="index"
                                v-show="showAllImages || index < 6"
                                :class="getImageClass(index)"
                                class="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                @click="openGallery(index)"
                            >
                                <img
                                    :src="`${CDN()}${image}`"
                                    :alt="`Photo ${index + 1}`"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <!-- Show More Button -->
                        <div
                            v-if="tourPlaceStore?.tourPlace?.images.length > 6"
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
                                            Country
                                        </p>
                                        <p
                                            class="font-semibold text-gray-900 capitalize"
                                        >
                                            {{
                                                C_COUNTRY.find(
                                                    (c: any) =>
                                                        c.value ===
                                                        tourPlaceStore
                                                            ?.tourPlace
                                                            ?.countryCode,
                                                )?.lo || "Foreign"
                                            }}
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
                                            {{
                                                C_REGION.find(
                                                    (r: any) =>
                                                        r.value ===
                                                        tourPlaceStore
                                                            ?.tourPlace?.region,
                                                )?.lo ||
                                                tourPlaceStore?.tourPlace
                                                    ?.region
                                            }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-start gap-3">
                                    <Icon
                                        name="pajamas:eye"
                                        class="w-5 h-5 text-gray-400"
                                    />
                                    <div>
                                        <p class="text-sm text-gray-500">
                                            View
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{
                                                tourPlaceStore?.tourPlace?.views
                                            }}
                                            <span
                                                v-if="
                                                    tourPlaceStore?.tourPlace
                                                        ?.views || 0 > 1
                                                "
                                            >
                                                views</span
                                            >
                                            <span v-else> view</span>
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

        <!-- Image Gallery Dialog/Lightbox -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="isGalleryOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
                    @click="closeGallery"
                >
                    <!-- Close Button -->
                    <button
                        @click.stop="closeGallery"
                        class="absolute top-4 right-4 z-50 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close gallery"
                    >
                        <svg
                            class="w-8 h-8"
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

                    <!-- Image Counter -->
                    <div
                        class="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black/50 text-white rounded-full text-sm"
                    >
                        {{ currentImageIndex + 1 }} /
                        {{ tourPlaceStore?.tourPlace?.images?.length || 0 }}
                    </div>

                    <!-- Main Image Container -->
                    <div
                        class="relative w-full h-full flex items-center justify-center p-4 md:p-8"
                        @click.stop
                    >
                        <!-- Previous Button -->
                        <button
                            v-if="
                                tourPlaceStore?.tourPlace?.images &&
                                tourPlaceStore.tourPlace.images.length > 1
                            "
                            @click.stop="previousImage"
                            class="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                            aria-label="Previous image"
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <!-- Image -->
                        <img
                            :src="`${CDN()}${
                                tourPlaceStore?.tourPlace?.images?.[
                                    currentImageIndex
                                ] || ''
                            }`"
                            :alt="`Photo ${currentImageIndex + 1}`"
                            class="max-w-full max-h-full object-contain"
                        />

                        <!-- Next Button -->
                        <button
                            v-if="
                                tourPlaceStore?.tourPlace?.images &&
                                tourPlaceStore.tourPlace.images.length > 1
                            "
                            @click.stop="nextImage"
                            class="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                            aria-label="Next image"
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Thumbnail Strip (Optional) -->
                    <div
                        class="absolute bottom-4 left-0 right-0 z-50 px-4"
                        @click.stop
                    >
                        <div
                            class="flex gap-2 overflow-x-auto pb-2 justify-center scrollbar-hide"
                        >
                            <button
                                v-for="(image, index) in tourPlaceStore
                                    ?.tourPlace?.images"
                                :key="index"
                                @click.stop="currentImageIndex = index"
                                class="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all"
                                :class="
                                    currentImageIndex === index
                                        ? 'border-white scale-110'
                                        : 'border-transparent opacity-50 hover:opacity-100'
                                "
                            >
                                <img
                                    :src="`${CDN()}${image}`"
                                    :alt="`Thumbnail ${index + 1}`"
                                    class="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "detail",
});
const { setQueryServerSide, isQueryServerSide } = useMainStore();
const tourPlaceStore = useTourPlaceStore();
const route = useRoute();
const { id } = route.params;

const tourPlaceLoading = ref(false);
const showAllImages = ref(false);

// Gallery state
const isGalleryOpen = ref(false);
const currentImageIndex = ref(0);

/**
 *  onMounted
 */
onMounted(async () => {
    if (!isQueryServerSide) {
        tourPlaceLoading.value = true;
        await tourPlaceStore.setOne(id as string);
        tourPlaceLoading.value = false;
    }
    await setQueryServerSide(false);
});

if (import.meta.server) {
    tourPlaceLoading.value = true;
    await tourPlaceStore.setOne(id as string);
    tourPlaceLoading.value = false;
}

// Breadcrumb items
const breadcrumbItems = computed(() => {
    const items = [
        { label: "Home", to: "/" },
        // { label: "Tourist Places", to: "/tour-place" },
    ];

    // Add region from query params if available
    if (route.query.region) {
        const regionQueryValue = Array.isArray(route.query.region)
            ? route.query.region[0]
            : route.query.region;
        const regionValueStr = String(regionQueryValue);
        const regionLabel =
            C_REGION.find((r: any) => r.value === regionValueStr)?.en ||
            regionValueStr;

        items.push({
            label: "Tourist Places",
            to: `/tour-place?region=${encodeURIComponent(regionValueStr)}`,
        });

        // this route can not be clickable
        items.push({
            label: regionLabel,
            to: `/tour-place`,
        });
    }

    // Add region from store data if available
    if (!route.query.region) {
        items.push({
            label: "Tourist Places",
            to: `/tour-place`,
        });

        // this route can not be clickable
        items.push({
            label: "All Regions",
            to: `/tour-place`,
        });
    }

    // Add current place name from route params or store
    // const placeName =
    //     tourPlaceStore?.tourPlace?.name?.lo ||
    //     (Array.isArray(route.params.name)
    //         ? route.params.name[0]
    //         : route.params.name);
    // if (placeName) {
    //     items.push({
    //         label: placeName,
    //         to: `/tour-place/${id}`,
    //     });
    // }

    console.log("Breadcrumb items:", items);

    return items;
});

// Gallery functions
const openGallery = (index: number) => {
    currentImageIndex.value = index;
    isGalleryOpen.value = true;
    // Prevent body scroll when gallery is open
    document.body.style.overflow = "hidden";
};

const closeGallery = () => {
    isGalleryOpen.value = false;
    // Restore body scroll
    document.body.style.overflow = "";
};

const nextImage = () => {
    const images = tourPlaceStore?.tourPlace?.images || [];
    if (images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
    }
};

const previousImage = () => {
    const images = tourPlaceStore?.tourPlace?.images || [];
    if (images.length > 0) {
        currentImageIndex.value =
            currentImageIndex.value === 0
                ? images.length - 1
                : currentImageIndex.value - 1;
    }
};

// Keyboard navigation
const handleKeyPress = (e: KeyboardEvent) => {
    if (!isGalleryOpen.value) return;

    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
};

// Add keyboard event listener
onMounted(() => {
    window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
    // Cleanup body overflow in case component unmounts while gallery is open
    document.body.style.overflow = "";
});

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
</script>

<style scoped>
/* Hide scrollbar for thumbnail strip */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
