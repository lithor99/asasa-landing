<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section with Image -->
        <div class="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <img
                :src="news.image"
                :alt="news.title"
                class="w-full h-full object-cover"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            ></div>

            <!-- Title & Info Overlay -->
            <div
                class="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
            ></div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {{ news.title }}
                </h1>
                <div class="flex items-center gap-4 text-md text-gray-500 mb-6">
                    <div class="flex items-center gap-2">
                        <Icon name="mdi:calendar" class="w-5 h-5" />
                        <span>{{ formatDate(news.publishedDate) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="mdi:account-circle" class="w-5 h-5" />
                        <span>{{ news.author }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="mdi:eye" class="w-5 h-5" />
                        <span>{{ news.views }} views</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Content Section -->
                    <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
                        <div
                            class="prose prose-lg max-w-none"
                            v-html="news.content"
                        ></div>
                    </div>

                    <!-- Image Gallery -->
                    <div
                        v-if="news.images && news.images.length > 0"
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
                                v-for="(image, index) in news.images"
                                :key="index"
                                v-show="showAllImages || index < 6"
                                :class="getImageClass(index)"
                                class="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                @click="openGallery(index)"
                            >
                                <img
                                    :src="image"
                                    :alt="`${news.title} - Photo ${index + 1}`"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <!-- Show More Button -->
                        <div
                            v-if="news.images.length > 6"
                            class="mt-6 flex justify-center"
                        >
                            <div
                                @click="showAllImages = !showAllImages"
                                class="w-auto px-6 py-3 underline hover:text-gray-800 hover:cursor-pointer hover:scale-110 text-gray-600 font-medium rounded-lg transition-colors"
                            >
                                {{ showAllImages ? "Show Less" : `Show All` }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="lg:col-span-1">
                    <div class="sticky top-6 space-y-6">
                        <!-- Related News -->
                        <div class="bg-white rounded-xl shadow-md p-6">
                            <h3
                                class="text-xl font-bold text-gray-900 mb-4 pb-4 border-b"
                            >
                                Related Articles
                            </h3>
                            <div class="space-y-4">
                                <a
                                    v-for="(
                                        relatedNews, index
                                    ) in news.relatedNews"
                                    :key="index"
                                    href="#"
                                    class="block group"
                                >
                                    <div class="flex gap-3">
                                        <img
                                            :src="relatedNews.image"
                                            :alt="relatedNews.title"
                                            class="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div class="flex-1">
                                            <h4
                                                class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm"
                                            >
                                                {{ relatedNews.title }}
                                            </h4>
                                            <p
                                                class="text-xs text-gray-500 mt-1"
                                            >
                                                {{
                                                    formatDate(
                                                        relatedNews.publishedDate,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface News {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    publishedDate: string;
    views: number;
    image: string;
    images?: string[];
    tags?: string[];
    relatedNews?: Array<{
        title: string;
        image: string;
        publishedDate: string;
    }>;
}

// Sample data - replace with API call or props
const news = ref<News>({
    id: 1,
    title: "Laos Tourism Industry Shows Strong Recovery in 2024",
    excerpt:
        "The tourism sector in Laos has demonstrated remarkable resilience, with visitor numbers reaching pre-pandemic levels. This growth is attributed to enhanced marketing efforts, improved infrastructure, and the country's unique cultural offerings that continue to attract international travelers.",
    content: `
        <p class="mb-4">The tourism industry in Laos has shown impressive growth throughout 2024, marking a significant milestone in the country's economic recovery. According to recent statistics from the Ministry of Information, Culture and Tourism, international arrivals have increased by 45% compared to the previous year.</p>
        
        <h3 class="text-2xl font-bold mt-6 mb-3">Key Factors Driving Growth</h3>
        <p class="mb-4">Several factors have contributed to this positive trend. The government's strategic initiatives to promote sustainable tourism, coupled with investments in infrastructure development, have made Laos more accessible to international visitors. Popular destinations such as Luang Prabang, Vang Vieng, and the 4000 Islands continue to draw tourists seeking authentic cultural experiences.</p>
        
        <h3 class="text-2xl font-bold mt-6 mb-3">Economic Impact</h3>
        <p class="mb-4">The tourism boom has created thousands of jobs across the country, benefiting local communities and supporting small businesses. Hotels, restaurants, and tour operators have reported increased bookings, contributing significantly to the national economy.</p>
        
        <h3 class="text-2xl font-bold mt-6 mb-3">Future Outlook</h3>
        <p class="mb-4">Industry experts remain optimistic about the future, projecting continued growth as Laos positions itself as a must-visit destination in Southeast Asia. Ongoing efforts to preserve cultural heritage while modernizing facilities are expected to attract even more visitors in the coming years.</p>
    `,
    category: "tourism",
    author: "Somsak Phommavong",
    publishedDate: "2024-10-15",
    views: 2847,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
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
    tags: ["tourism", "economy", "travel", "laos", "southeast-asia"],
    relatedNews: [
        {
            title: "New UNESCO Heritage Sites Announced in Laos",
            image: "https://images.unsplash.com/photo-1528127269322-539801943592",
            publishedDate: "2024-10-10",
        },
        {
            title: "Sustainable Tourism Practices Gain Momentum",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
            publishedDate: "2024-10-08",
        },
        {
            title: "Vientiane International Airport Expansion Complete",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
            publishedDate: "2024-10-05",
        },
    ],
});

const showAllImages = ref(false);

// Format date
const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
};

// Gallery function
const openGallery = (index: number) => {
    console.log("Open gallery at index:", index);
    // Implement lightbox/modal gallery here
};

// Get dynamic image classes
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
// const { data: news } = await useFetch(`/api/news/${route.params.id}`);
</script>

<style scoped>
/* Prose styling for content */
:deep(.prose) {
    color: #374151;
    line-height: 1.8;
}

:deep(.prose h3) {
    color: #1f2937;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

:deep(.prose p) {
    margin-bottom: 1rem;
}
</style>
