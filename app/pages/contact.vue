<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <section
            class="relative overflow-hidden bg-white border-b border-gray-200 pt-4"
        >
            <!-- Breadcrumb -->
            <Breadcrumb :items="breadcrumbItems" />
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div class="text-center">
                    <h1 class="text-5xl font-bold mb-6 text-gray-900">
                        Get In Touch
                    </h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're here to help you plan your perfect journey. Reach
                        out to us through any of these channels.
                    </p>
                </div>
            </div>
        </section>

        <!-- Contact Methods -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Phone Contact -->
                <a
                    :href="`tel:${contacts.phone}`"
                    class="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                >
                    <div
                        class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            class="w-8 h-8 text-gray-700 group-hover:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                    <p class="text-gray-600 mb-4">Call us directly</p>
                    <p
                        class="text-gray-900 font-semibold group-hover:text-gray-700"
                    >
                        {{ contacts.phone }}
                    </p>
                    <div
                        class="mt-4 flex items-center text-gray-500 group-hover:text-gray-900"
                    >
                        <span class="text-sm">Tap to call</span>
                        <svg
                            class="w-4 h-4 ml-2"
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
                    </div>
                </a>

                <!-- WhatsApp Contact -->
                <a
                    :href="`https://wa.me/${contacts.whatsapp}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                >
                    <div
                        class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            class="w-8 h-8 text-gray-700 group-hover:text-white transition-colors"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        WhatsApp
                    </h3>
                    <p class="text-gray-600 mb-4">Message us instantly</p>
                    <p
                        class="text-gray-900 font-semibold group-hover:text-gray-700"
                    >
                        {{ contacts.whatsapp }}
                    </p>
                    <div
                        class="mt-4 flex items-center text-gray-500 group-hover:text-gray-900"
                    >
                        <span class="text-sm">Start chat</span>
                        <svg
                            class="w-4 h-4 ml-2"
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
                    </div>
                </a>

                <!-- Email Contact -->
                <a
                    :href="`mailto:${contacts.email}`"
                    class="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                >
                    <div
                        class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            class="w-8 h-8 text-gray-700 group-hover:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Email</h3>
                    <p class="text-gray-600 mb-4">Send us an email</p>
                    <p
                        class="text-gray-900 font-semibold group-hover:text-gray-700 break-all"
                    >
                        {{ contacts.email }}
                    </p>
                    <div
                        class="mt-4 flex items-center text-gray-500 group-hover:text-gray-900"
                    >
                        <span class="text-sm">Compose email</span>
                        <svg
                            class="w-4 h-4 ml-2"
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
                    </div>
                </a>

                <!-- Facebook Contact -->
                <a
                    :href="contacts.facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                >
                    <div
                        class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            class="w-8 h-8 text-gray-700 group-hover:text-white transition-colors"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        Facebook
                    </h3>
                    <p class="text-gray-600 mb-4">Follow & message us</p>
                    <p
                        class="text-gray-900 font-semibold group-hover:text-gray-700"
                    >
                        @asasatour
                    </p>
                    <div
                        class="mt-4 flex items-center text-gray-500 group-hover:text-gray-900"
                    >
                        <span class="text-sm">Visit page</span>
                        <svg
                            class="w-4 h-4 ml-2"
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
                    </div>
                </a>
            </div>
        </section>

        <!-- Additional Info Section -->
        <section class="bg-white py-20 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        We're Here to Help
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our team is available to answer your questions and help
                        you plan the perfect trip. Don't hesitate to reach out!
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div
                            class="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Quick Response
                        </h3>
                        <p class="text-gray-600">
                            We typically respond within 24 hours
                        </p>
                    </div>

                    <div class="text-center">
                        <div
                            class="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
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
                                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Expert Advice
                        </h3>
                        <p class="text-gray-600">
                            Professional travel consultants ready to help
                        </p>
                    </div>

                    <div class="text-center">
                        <div
                            class="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
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
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            Trusted Service
                        </h3>
                        <p class="text-gray-600">
                            Years of experience in tour services
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Define page metadata
definePageMeta({
    layout: "detail",
    title: "Contact - Asasa Tour Service",
    description:
        "Get in touch with Asasa Tour Service through phone, WhatsApp, email, or Facebook. We're here to help plan your perfect journey.",
});

// Use SEO meta tags
useSeoMeta({
    title: "Contact - Asasa Tour Service",
    description:
        "Get in touch with Asasa Tour Service through phone, WhatsApp, email, or Facebook. We're here to help plan your perfect journey.",
    ogTitle: "Contact - Asasa Tour Service",
    ogDescription:
        "Reach out to us for your tour bookings and travel inquiries.",
    ogType: "website",
});

// Contact information - Update these with your actual contact details
const contacts = ref({
    phone: "+1234567890",
    whatsapp: "1234567890", // Include country code without + or spaces
    email: "info@asasatour.com",
    facebook: "https://www.facebook.com/profile.php?id=61573013957178",
});

// Breadcrumb items
const breadcrumbItems = computed(() => {
    const items = [
        { label: "Home", to: "/" },
        { label: "Contact", to: "/contact" },
    ];

    return items;
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
