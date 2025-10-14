// import { useDegreeStore } from '~/stores/degree'
export default defineNuxtPlugin(async (_) => {
    try {
        const languageStore = useLanguageStore();
        await languageStore.setAll();
        const header = useRequestHeaders();
        const cookie = header.cookie;
        const ck = cookie
            ?.split(";")
            ?.find((c) => c.trim().startsWith("locale="))
            ?.trim();
        const langs = languageStore.getAll;
        const lagCode = ck?.slice(7, ck.length);
        const mainlang =
            langs?.find((itm) => itm.code == lagCode) ||
            langs?.find((itm) => itm.isMain) ||
            langs?.[0];
        if (mainlang) {
            const mainStore = useMainStore();
            mainStore.setLanguage({
                code: mainlang.code || "",
                name: mainlang.name || "",
                flag: mainlang.flag || "",
            });
        }
    } catch (error) {
        console.log("Error ", error);
    }
});
