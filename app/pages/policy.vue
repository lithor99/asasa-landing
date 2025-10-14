<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-700 py-16">
            <div class="max-w-4xl mx-auto px-4 sm:px-8 text-center">
                <div
                    class="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6"
                >
                    <svg
                        class="h-10 w-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
                    Privacy Policy
                </h1>
                <p class="text-xl text-gray-300 mb-6">
                    Your privacy is important to us
                </p>
                <div class="text-gray-400 text-sm">
                    Last updated: October 10, 2025
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
            <!-- Quick Navigation -->
            <div
                class="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-4 z-10"
            >
                <h2 class="text-lg font-semibold text-gray-900 mb-4">
                    Quick Navigation
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <a
                        v-for="section in sections"
                        :key="section.id"
                        :href="`#${section.id}`"
                        class="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                    >
                        {{ section.title }}
                    </a>
                </div>
            </div>

            <!-- Introduction -->
            <div class="bg-white rounded-lg shadow-md p-8 mb-6">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Introduction
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        Welcome to ASASA Tour co., ltd ("we," "our," or "us").
                        We are committed to protecting your personal information
                        and your right to privacy. This Privacy Policy explains
                        how we collect, use, disclose, and safeguard your
                        information when you visit our website and use our
                        services.
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Please read this privacy policy carefully. If you do not
                        agree with the terms of this privacy policy, please do
                        not access the site or use our services.
                    </p>
                </div>
            </div>

            <!-- Information We Collect -->
            <div
                id="information-collect"
                class="bg-white rounded-lg shadow-md p-8 mb-6"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Information We Collect
                    </h2>

                    <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        Personal Information
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        We collect personal information that you voluntarily
                        provide to us when you:
                    </p>
                    <ul
                        class="list-disc list-inside text-gray-600 space-y-2 mb-4 ml-4"
                    >
                        <li>Register for an account</li>
                        <li>Make a booking or reservation</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Contact us for support</li>
                        <li>Participate in surveys or promotions</li>
                    </ul>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        This information may include:
                    </p>
                    <ul
                        class="list-disc list-inside text-gray-600 space-y-2 ml-4"
                    >
                        <li>
                            Full name and contact details (email, phone number,
                            address)
                        </li>
                        <li>
                            Payment information (credit card details, billing
                            address)
                        </li>
                        <li>Travel preferences and booking history</li>
                        <li>Passport and visa information (when required)</li>
                        <li>Emergency contact information</li>
                    </ul>

                    <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        Automatically Collected Information
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        When you visit our website, we automatically collect
                        certain information about your device and usage
                        patterns:
                    </p>
                    <ul
                        class="list-disc list-inside text-gray-600 space-y-2 ml-4"
                    >
                        <li>IP address and browser type</li>
                        <li>Device information and operating system</li>
                        <li>Pages visited and time spent on site</li>
                        <li>Referring website and search terms</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </div>
            </div>

            <!-- How We Use Your Information -->
            <div id="how-we-use" class="bg-white rounded-lg shadow-md p-8 mb-6">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        How We Use Your Information
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        We use the information we collect for various purposes,
                        including:
                    </p>
                    <div class="space-y-4">
                        <div class="flex gap-3">
                            <div
                                class="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm"
                            >
                                1
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Service Delivery
                                </h4>
                                <p class="text-gray-600 text-sm">
                                    Processing bookings, managing reservations,
                                    and providing customer support
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <div
                                class="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm"
                            >
                                2
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Communication
                                </h4>
                                <p class="text-gray-600 text-sm">
                                    Sending booking confirmations, updates, and
                                    marketing communications (with your consent)
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <div
                                class="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm"
                            >
                                3
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Personalization
                                </h4>
                                <p class="text-gray-600 text-sm">
                                    Customizing your experience and providing
                                    relevant recommendations
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <div
                                class="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm"
                            >
                                4
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Security & Fraud Prevention
                                </h4>
                                <p class="text-gray-600 text-sm">
                                    Protecting against fraudulent transactions
                                    and ensuring platform security
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <div
                                class="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm"
                            >
                                5
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">
                                    Analytics & Improvement
                                </h4>
                                <p class="text-gray-600 text-sm">
                                    Analyzing usage patterns to improve our
                                    services and user experience
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Information Sharing -->
            <div
                id="information-sharing"
                class="bg-white rounded-lg shadow-md p-8 mb-6"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Information Sharing and Disclosure
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        We may share your information in the following
                        circumstances:
                    </p>
                    <ul
                        class="list-disc list-inside text-gray-600 space-y-2 ml-4"
                    >
                        <li>
                            <strong>Service Providers:</strong> Third-party
                            vendors who help us operate our business (payment
                            processors, email services, etc.)
                        </li>
                        <li>
                            <strong>Travel Partners:</strong> Hotels, tour
                            operators, and transportation providers necessary to
                            fulfill your bookings
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> When required
                            by law or to protect our rights and safety
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> In connection
                            with mergers, acquisitions, or sale of assets
                        </li>
                        <li>
                            <strong>With Your Consent:</strong> When you
                            explicitly agree to share information with third
                            parties
                        </li>
                    </ul>
                    <div
                        class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded"
                    >
                        <p class="text-sm text-gray-700">
                            <strong>Note:</strong> We never sell your personal
                            information to third parties for their marketing
                            purposes.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Data Security -->
            <div
                id="data-security"
                class="bg-white rounded-lg shadow-md p-8 mb-6"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Data Security
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        We implement appropriate technical and organizational
                        measures to protect your personal information:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center gap-3 mb-2">
                                <svg
                                    class="h-6 w-6 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <h4 class="font-semibold text-gray-900">
                                    SSL Encryption
                                </h4>
                            </div>
                            <p class="text-sm text-gray-600">
                                All data transmissions are encrypted using
                                industry-standard SSL technology
                            </p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center gap-3 mb-2">
                                <svg
                                    class="h-6 w-6 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                                <h4 class="font-semibold text-gray-900">
                                    Secure Storage
                                </h4>
                            </div>
                            <p class="text-sm text-gray-600">
                                Personal data is stored on secure servers with
                                restricted access
                            </p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center gap-3 mb-2">
                                <svg
                                    class="h-6 w-6 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <h4 class="font-semibold text-gray-900">
                                    Regular Audits
                                </h4>
                            </div>
                            <p class="text-sm text-gray-600">
                                We conduct regular security assessments and
                                vulnerability testing
                            </p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center gap-3 mb-2">
                                <svg
                                    class="h-6 w-6 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <h4 class="font-semibold text-gray-900">
                                    Access Control
                                </h4>
                            </div>
                            <p class="text-sm text-gray-600">
                                Strict employee access controls and
                                confidentiality agreements
                            </p>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm italic">
                        While we strive to protect your personal information, no
                        method of transmission over the Internet is 100% secure.
                        We cannot guarantee absolute security.
                    </p>
                </div>
            </div>

            <!-- Your Rights -->
            <div
                id="your-rights"
                class="bg-white rounded-lg shadow-md p-8 mb-6"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Your Privacy Rights
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        You have the following rights regarding your personal
                        information:
                    </p>
                    <div class="space-y-3">
                        <div class="flex items-start gap-3">
                            <svg
                                class="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0"
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
                            <div>
                                <strong class="text-gray-900">Access:</strong>
                                <span class="text-gray-600">
                                    Request a copy of the personal information
                                    we hold about you</span
                                >
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg
                                class="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0"
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
                            <div>
                                <strong class="text-gray-900"
                                    >Correction:</strong
                                >
                                <span class="text-gray-600">
                                    Request correction of inaccurate or
                                    incomplete information</span
                                >
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg
                                class="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0"
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
                            <div>
                                <strong class="text-gray-900">Deletion:</strong>
                                <span class="text-gray-600">
                                    Request deletion of your personal
                                    information (subject to legal
                                    requirements)</span
                                >
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg
                                class="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0"
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
                            <div>
                                <strong class="text-gray-900">Opt-out:</strong>
                                <span class="text-gray-600">
                                    Unsubscribe from marketing communications at
                                    any time</span
                                >
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg
                                class="h-5 w-5 text-gray-900 mt-0.5 flex-shrink-0"
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
                            <div>
                                <strong class="text-gray-900"
                                    >Portability:</strong
                                >
                                <span class="text-gray-600">
                                    Request transfer of your data to another
                                    service provider</span
                                >
                            </div>
                        </div>
                    </div>
                    <div
                        class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded"
                    >
                        <p class="text-sm text-gray-700">
                            To exercise any of these rights, please contact us
                            at
                            <a
                                href="mailto:privacy@asasatour.com"
                                class="text-blue-600 hover:underline"
                                >privacy@asasatour.com</a
                            >
                        </p>
                    </div>
                </div>
            </div>

            <!-- Cookies -->
            <div id="cookies" class="bg-white rounded-lg shadow-md p-8 mb-6">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Cookies and Tracking
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        We use cookies and similar tracking technologies to
                        enhance your browsing experience:
                    </p>
                    <ul
                        class="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4"
                    >
                        <li>
                            <strong>Essential Cookies:</strong> Required for
                            website functionality and security
                        </li>
                        <li>
                            <strong>Analytics Cookies:</strong> Help us
                            understand how visitors use our site
                        </li>
                        <li>
                            <strong>Marketing Cookies:</strong> Used to deliver
                            relevant advertisements
                        </li>
                        <li>
                            <strong>Preference Cookies:</strong> Remember your
                            settings and preferences
                        </li>
                    </ul>
                    <p class="text-gray-600 leading-relaxed">
                        You can control cookies through your browser settings.
                        However, disabling certain cookies may limit website
                        functionality.
                    </p>
                </div>
            </div>

            <!-- Children's Privacy -->
            <div
                id="children-privacy"
                class="bg-white rounded-lg shadow-md p-8 mb-6"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Children's Privacy
                    </h2>
                    <p class="text-gray-600 leading-relaxed">
                        Our services are not directed to children under the age
                        of 13. We do not knowingly collect personal information
                        from children. If you believe we have collected
                        information from a child, please contact us immediately,
                        and we will take steps to delete such information.
                    </p>
                </div>
            </div>

            <!-- Changes to Policy -->
            <div
                id="policy-changes"
                class="bg-white rounded-lg shadow-md p-8 mb-6"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">
                        Changes to This Policy
                    </h2>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        We may update this Privacy Policy from time to time. We
                        will notify you of any changes by:
                    </p>
                    <ul
                        class="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4"
                    >
                        <li>Posting the new Privacy Policy on this page</li>
                        <li>Updating the "Last Updated" date at the top</li>
                        <li>
                            Sending you an email notification (for material
                            changes)
                        </li>
                    </ul>
                    <p class="text-gray-600 leading-relaxed">
                        We encourage you to review this Privacy Policy
                        periodically for any changes.
                    </p>
                </div>
            </div>

            <!-- Contact Us -->
            <div
                id="contact"
                class="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-md p-8 text-white"
            >
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold text-white mb-4">
                        Contact Us
                    </h2>
                    <p class="text-gray-200 leading-relaxed mb-6">
                        If you have any questions, concerns, or requests
                        regarding this Privacy Policy or our data practices,
                        please contact us:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 class="font-semibold text-white mb-2">Email</h4>
                            <a
                                href="mailto:privacy@asasatour.com"
                                class="text-gray-300 hover:text-white transition-colors"
                            >
                                privacy@asasatour.com
                            </a>
                        </div>
                        <div>
                            <h4 class="font-semibold text-white mb-2">Phone</h4>
                            <a
                                href="tel:+8562012345678"
                                class="text-gray-300 hover:text-white transition-colors"
                            >
                                +856 20 1234 5678
                            </a>
                        </div>
                        <div>
                            <h4 class="font-semibold text-white mb-2">
                                Address
                            </h4>
                            <p class="text-gray-300">
                                123 Tourism Street<br />
                                Vientiane, Laos
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Back to Top -->
            <div class="mt-8 text-center">
                <button
                    @click="scrollToTop"
                    class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                    Back to Top
                </button>
            </div>
        </main>
    </div>
</template>

<script setup>
definePageMeta({
    title: "Privacy Policy - ASASA Tour",
});

// Sections for quick navigation
const sections = ref([
    { id: "information-collect", title: "Information Collection" },
    { id: "how-we-use", title: "How We Use Data" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-security", title: "Data Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "cookies", title: "Cookies" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "policy-changes", title: "Policy Changes" },
]);

// Scroll to top method
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
</script>
