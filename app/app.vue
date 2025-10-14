<script setup lang="ts">
const mainStore = useMainStore();
useSeoMeta({
    title: "ASASA TOUR",
    ogTitle: "ASASA TOUR",
    description: "ASASA is a tour service in Laos and abroad",
    ogDescription: "ASASA is a tour service in Laos and abroad",
    ogImage: "https://mobile.ycgo.org/profile/profile1.webp",
});
useHead({
    link: [
        {
            rel: "stylesheet",
            href: "https://lib.ycgo.org/richtexteditor/runtime/rte_theme_default.css",
        },
        {
            rel: "stylesheet",
            href: "https://lib.ycgo.org/richtexteditor/runtime/richtexteditor-content.css",
        },
    ],
    script: [
        { src: "https://lib.ycgo.org/richtexteditor/js/rte.js" },
        { src: "https://lib.ycgo.org/richtexteditor/js/all_plugins.js" },
    ],
});

if (import.meta.client) {
    const wd: any = window;
    // recieve lat lng from native
    wd.setNativeLocation = (lat: number, lng: number) => {
        const pos = {
            lat: lat || mainStore.latlng.lat,
            lng: lng || mainStore.latlng.lng,
        };
        mainStore.setLatLng(pos);
        mainStore.setCurrentLatLng(pos);
    };

    wd.setFcmDeviceToken = (
        fcmToken: string,
        deviceId: string,
        platform: string,
    ) => {
        mainStore.fcm = fcmToken;
        wd.fcm = fcmToken;
        wd.dvice = deviceId;
    };
}
</script>

<template>
    <NuxtLayout>
        <!-- <NuxtLoadingIndicator /> -->
        <NuxtPage />
    </NuxtLayout>
</template>

<style lang="css">
.hidden-map .gm-fullscreen-control,
.hidden-map .gm-svpc,
.hidden-map .gmnoprint,
.hidden-map button.gm-ui-hover-effect,
.hidden-close-infowindow button.gm-ui-hover-effect {
    display: none !important;
}
.ycgo-map .gm-fullscreen-control,
.ycgo-map .gm-svpc /*,
.ycgo-map .gmnoprint*/ {
    display: none !important;
}
.custom-map .gm-style-mtc-bbw {
    display: absolute !important;
}

.tiptap {
    border: 0px solid gray;
    min-height: 150px;
    padding-left: 20px;
    padding-right: 10px;
    outline: none;
}
.tiptap h1 {
    font-size: 1.5em !important;
}
.tiptap h2 {
    font-size: 1.25em !important;
}
.tiptap h3 {
    font-size: 1.125em !important;
}
.tiptap h4 {
    font-size: 1em !important;
}
.tiptap h5 {
    font-size: 0.875em !important;
}
.tiptap h6 {
    font-size: 0.75em !important;
}

.tiptap ul li {
    list-style-type: disc !important;
}

.tiptap ol li {
    list-style-type: decimal !important;
}

/* Hide scrollbar but keep scrolling */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
    scrollbar-width: none; /* Hide scrollbar for Firefox */
}

/* #2AA5AC */
.bg-gradient-horizontal {
    background: #023062;
    background: -moz-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(42, 165, 172, 1) 87%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(42, 165, 172, 1) 87%
    );
    background: linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(42, 165, 172, 1) 87%
    );
}
.bg-gradient-vertical {
    background: #023062;
    background: -moz-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(42, 165, 172, 1) 87%
    );
    background: -webkit-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(42, 165, 172, 1) 87%
    );
    background: linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(42, 165, 172, 1) 87%
    );
}

.bg-gradient-horizontal-silver {
    background: #023062;
    background: -moz-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(192, 192, 192, 1) 87%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(192, 192, 192, 1) 87%
    );
    background: linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(192, 192, 192, 1) 87%
    );
}
.bg-gradient-vertical-silver {
    background: #023062;
    background: -moz-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(192, 192, 192, 1) 87%
    );
    background: -webkit-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(192, 192, 192, 1) 87%
    );
    background: linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(192, 192, 192, 1) 87%
    );
}

.bg-gradient-horizontal-gold {
    background: #023062;
    background: -moz-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(241, 194, 125, 1) 87%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(241, 194, 125, 1) 87%
    );
    background: linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(241, 194, 125, 1) 87%
    );
}
.bg-gradient-vertical-gold {
    background: #023062;
    background: -moz-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(241, 194, 125, 1) 87%
    );
    background: -webkit-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(241, 194, 125, 1) 87%
    );
    background: linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(241, 194, 125, 1) 87%
    );
}

.bg-gradient-horizontal-diamond {
    background: #023062;
    background: -moz-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(168, 155, 225, 1) 87%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(168, 155, 225, 1) 87%
    );
    background: linear-gradient(
        90deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(168, 155, 225, 1) 87%
    );
}
.bg-gradient-vertical-diamond {
    background: #023062;
    background: -moz-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(168, 155, 225, 1) 87%
    );
    background: -webkit-linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(168, 155, 225, 1) 87%
    );
    background: linear-gradient(
        0deg,
        rgba(2, 48, 98, 1) 0%,
        rgba(168, 155, 225, 1) 87%
    );
}
</style>
