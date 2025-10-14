<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const mainStore = useMainStore();
const languageStore = useLanguageStore();
const isLangSwitcher = ref<boolean>(false);

defineProps({
    position: {
        type: String,
        default: "absolute top-3",
    },
});

const onLanguageSwitcher = async (lng: {
    code: string;
    name: string;
    flag: string;
}) => {
    const lang = {
        code: lng?.code,
        name: lng?.name,
        flag: lng?.flag,
    };
    mainStore.setLanguage(lang);
    isLangSwitcher.value = false;
};
</script>
<template>
    <!-- <div class="right-1 z-50" :class="`${position}`">
        <div class="relative">
            <button
                class="text-secondary bg-secondary bg-opacity-0 hover:bg-opacity-20 rounded-full border border-secondary border-opacity-10 pl-2 cursor-pointer flex items-center gap-2 py-2 px-1"
                @click="isLangSwitcher = !isLangSwitcher"
            >
                <div
                    class="w-6 h-6 bg-sub text-secondary rounded-full border border-secondary border-opacity-50 flex justify-center items-center"
                >
                    <img
                        v-if="mainStore.getLanguage.flag"
                        :src="`${CDN()}${mainStore.getLanguage.flag}`"
                        alt="lang"
                        :srcset="`${CDN()}${mainStore.getLanguage.flag}`"
                        class="w-6 h-6 rounded-full"
                    />
                    <strong v-else>{{
                        mainStore.getLanguage?.code?.toUpperCase()
                    }}</strong>
                </div>
                <span>{{ mainStore.getLanguage?.name }}</span>
                <Icon
                    name="lsicon:down-filled"
                    size="20"
                    :class="{ '-rotate-90': isLangSwitcher }"
                    mode="svg"
                />
            </button>
            <div
                v-if="isLangSwitcher"
                v-click-outside="
                    () => {
                        isLangSwitcher = false;
                    }
                "
                class="absolute top-12 right-0 w-40 bg-secondary rounded flex justify-center items-center"
            >
                <div class="w-full h-full bg-main bg-opacity-50">
                    <div
                        v-for="(lng, index) in languageStore.languages"
                        :key="index"
                        class="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-main hover:bg-opacity-15 hover:font-bold"
                        :class="
                            lng?.code == mainStore.locale ? 'bg-gray-600' : ''
                        "
                        @click="
                            onLanguageSwitcher({
                                code: lng?.code as string,
                                name: lng?.name as string,
                                flag: lng?.flag as string,
                            })
                        "
                    >
                        <div class="flex justify-center items-center">
                            <div
                                class="w-10 h-10 bg-sub text-secondary rounded-full border border-secondary border-opacity-50 flex justify-center items-center"
                            >
                                <img
                                    v-if="lng.flag"
                                    :src="`${CDN()}${lng.flag}`"
                                    alt="lang"
                                    :srcset="`${CDN()}${lng.flag}`"
                                    class="w-10 h-10 rounded-full"
                                />
                                <strong v-else>{{
                                    lng?.code?.toUpperCase()
                                }}</strong>
                            </div>
                        </div>
                        <div>{{ lng?.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>
