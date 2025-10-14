<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <section
            class="relative overflow-hidden bg-white border-b border-gray-200"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div class="text-center">
                    <h1 class="text-5xl font-bold mb-6 text-gray-900">
                        About Asasa Tour Service
                    </h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your trusted partner in creating unforgettable travel
                        experiences around the world
                    </p>
                </div>
            </div>
        </section>

        <!-- Our Story Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-4xl font-bold text-gray-900 mb-6">
                        Our Story
                    </h2>
                    <p class="text-lg text-gray-700 mb-4">
                        Founded with a passion for exploration and cultural
                        exchange, Asasa Tour Service has been connecting
                        travelers with extraordinary destinations for years.
                    </p>
                    <p class="text-lg text-gray-700 mb-4">
                        We believe that travel is more than just visiting new
                        places—it's about creating meaningful connections,
                        understanding diverse cultures, and building memories
                        that last a lifetime.
                    </p>
                    <p class="text-lg text-gray-700">
                        Our team of experienced travel professionals is
                        dedicated to crafting personalized journeys that exceed
                        expectations and inspire wanderlust.
                    </p>
                </div>
                <div class="relative">
                    <div
                        class="absolute inset-0 bg-gray-200 rounded-2xl transform rotate-3"
                    ></div>
                    <div
                        class="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                    >
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div
                                    class="flex-shrink-0 bg-gray-100 rounded-lg p-3"
                                >
                                    <svg
                                        class="w-6 h-6 text-gray-700"
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
                                </div>
                                <div class="ml-4">
                                    <h3
                                        class="text-lg font-semibold text-gray-900"
                                    >
                                        Global Reach
                                    </h3>
                                    <p class="text-gray-600">
                                        Destinations across 50+ countries
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div
                                    class="flex-shrink-0 bg-gray-100 rounded-lg p-3"
                                >
                                    <svg
                                        class="w-6 h-6 text-gray-700"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3
                                        class="text-lg font-semibold text-gray-900"
                                    >
                                        Expert Team
                                    </h3>
                                    <p class="text-gray-600">
                                        Professional travel consultants
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div
                                    class="flex-shrink-0 bg-gray-100 rounded-lg p-3"
                                >
                                    <svg
                                        class="w-6 h-6 text-gray-700"
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
                                <div class="ml-4">
                                    <h3
                                        class="text-lg font-semibold text-gray-900"
                                    >
                                        Customer Satisfaction
                                    </h3>
                                    <p class="text-gray-600">
                                        98% positive reviews
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="bg-white py-20 border-y border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">
                        Our Core Values
                    </h2>
                    <p class="text-xl text-gray-600">
                        The principles that guide everything we do
                    </p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div
                        v-for="(value, index) in coreValues"
                        :key="index"
                        class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-200"
                    >
                        <div
                            class="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-6"
                        >
                            <component
                                :is="value.icon"
                                class="w-8 h-8 text-white"
                            />
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">
                            {{ value.title }}
                        </h3>
                        <p class="text-gray-700">{{ value.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <div class="px-8 py-16 text-center text-white">
                    <h2 class="text-4xl font-bold mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p class="text-xl mb-8 text-gray-300">
                        Let us help you create memories that will last a
                        lifetime
                    </p>
                    <button
                        @click="handleContact"
                        class="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Contact Us Today
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Define page metadata
definePageMeta({
    title: "About Us - Asasa Tour Service",
    description:
        "Learn about Asasa Tour Service, your trusted partner in creating unforgettable travel experiences around the world.",
});

// Use SEO meta tags
useSeoMeta({
    title: "About Us - Asasa Tour Service",
    description:
        "Learn about Asasa Tour Service, your trusted partner in creating unforgettable travel experiences around the world.",
    ogTitle: "About Us - Asasa Tour Service",
    ogDescription:
        "Your trusted partner in creating unforgettable travel experiences around the world.",
    ogType: "website",
});

// Icon components
const HeartIcon = {
    template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  `,
};

const UsersIcon = {
    template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  `,
};

const LightningIcon = {
    template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  `,
};

// Core values data
const coreValues = ref([
    {
        icon: HeartIcon,
        title: "Passion",
        description:
            "We love what we do and it shows in every journey we create. Our enthusiasm for travel inspires unforgettable experiences.",
    },
    {
        icon: UsersIcon,
        title: "Trust",
        description:
            "Building lasting relationships through transparency, reliability, and dedication to our travelers' safety and satisfaction.",
    },
    {
        icon: LightningIcon,
        title: "Innovation",
        description:
            "Constantly evolving and embracing new technologies to provide seamless, modern travel experiences.",
    },
]);

// Handle contact button click
const handleContact = () => {
    // Navigate to contact page or open contact modal
    navigateTo("/contact");
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
